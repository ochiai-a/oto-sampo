import requests
import time
import json
import logging
from requests.cookies import RequestsCookieJar
from user_agents import parse
import boto3

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

DEFAULT_MODEL = "chirp-v3-5"
SQS_QUEUE_URL = "https://sqs.ap-northeast-1.amazonaws.com/654654257411/AudioinfoToS3Lambda"  # SQSキューのURLを指定

class SunoApi:
    BASE_URL = 'https://studio-api.suno.ai'
    CLERK_BASE_URL = 'https://clerk.suno.com'

    def __init__(self, cookie: str):
        self.session = requests.Session()
        self.session.cookies = RequestsCookieJar()
        self.session.headers.update({
            'User-Agent': str(parse('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3')),
            'Cookie': cookie,
        })
        self.sid = None
        self.current_token = None

    def init(self):
        self.get_auth_token()
        self.keep_alive()

    def get_auth_token(self):
        get_session_url = f'{self.CLERK_BASE_URL}/v1/client?_clerk_js_version=4.73.4'
        session_response = self.session.get(get_session_url)
        session_response.raise_for_status()
        self.sid = session_response.json().get('response', {}).get('last_active_session_id')
        if not self.sid:
            raise ValueError("Failed to get session id, you may need to update the SUNO_COOKIE")

    def keep_alive(self, is_wait=False):
        if not self.sid:
            raise ValueError("Session ID is not set. Cannot renew token.")
        renew_url = f'{self.CLERK_BASE_URL}/v1/client/sessions/{self.sid}/tokens?_clerk_js_version=4.73.4'
        renew_response = self.session.post(renew_url)
        renew_response.raise_for_status()
        self.current_token = renew_response.json().get('jwt')
        self.session.headers.update({'Authorization': f'Bearer {self.current_token}'})
        if is_wait:
            time.sleep(2)

    def generate_songs(self, prompt, is_custom, tags=None, title=None, make_instrumental=False, model=None, wait_audio=False):
        self.keep_alive(False)
        payload = {
            "make_instrumental": make_instrumental,
            "mv": model or DEFAULT_MODEL,
            "prompt": prompt if is_custom else "",
            "gpt_description_prompt": prompt if not is_custom else ""
        }
        if is_custom:
            payload.update({"tags": tags, "title": title})

        logger.info(f"generateSongs payload:\n{json.dumps(payload, indent=2)}")
        response = self.session.post(f'{self.BASE_URL}/api/generate/v2/', json=payload)
        response.raise_for_status()
        song_ids = [audio['id'] for audio in response.json()['clips']]

        if wait_audio:
            start_time = time.time()
            last_response = []
            time.sleep(5)
            while time.time() - start_time < 100:
                response = self.get(song_ids)
                if all(audio['status'] == 'streaming' or audio['status'] == 'complete' for audio in response):
                    return response
                if all(audio['status'] == 'error' for audio in response):
                    break
                last_response = response
                time.sleep(6)
                self.keep_alive(True)
            return last_response
        else:
            return response.json()['clips']

    def get(self, song_ids=None):
        self.keep_alive(False)
        url = f'{self.BASE_URL}/api/feed/'
        if song_ids:
            url += f'?ids={",".join(song_ids)}'
        logger.info(f"Get audio status: {url}")
        response = self.session.get(url)
        response.raise_for_status()
        audios = response.json()
        return audios

# Lambda handler
def lambda_handler(event, context):
    # SQS メッセージを取得
    if 'Records' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps({'error_message': 'No SQS records found'})
        }

    record = event['Records'][0]
    message_body = json.loads(record['body'])
    peak_frequency = message_body.get('peak_frequency')

    if not peak_frequency:
        return {
            'statusCode': 400,
            'body': json.dumps({'error_message': 'peak_frequency not found in SQS message'})
        }

    suno_cookie = "__stripe_mid=48068251-b51d-405a-8f2d-f3dddb57b47303d139; ajs_anonymous_id=3026fbc2-b518-4312-b6b7-1f6ded129e02; __client=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsaWVudF8ybEpKVjZjSkxQSW1pb2tXM0wwWXZ5NHg3UVAiLCJyb3RhdGluZ190b2tlbiI6ImJjdGwydWEzaHUzMXdxcWZnMG5wMW41dzh5eGRmNHM2ZmQwMnJocDIifQ.YV1nVwR_CJl7ODPHWHoMT-ug54vLSHlV2SjIA4FP_vUQXq9vV_b0jIIof1D54_kH88gicPItkFtekNJ5BZX70l59s5zL5l5rXXbqEYf9pl6akuA_IIsxw1cwMe_IVeUbYtOVoe4k6HRUgSecf2WrwsUOWzlUKFOjy7Z2L9HcP7nqWgBybA1aJlUINst3lhM_7mKR5_C9-02K6aGZOrtbrVfEM-d3XCQulf3FYmpksH88J45EcIgg8Tr4HjfgfSpQrS-yRToQ3nNH3Mn86P6HBpaBsBVEoAnOVAPmermVWuAC1VCprTcIFvBlIDkrocmuaFMn04ah51NLvud-Z2T0IA; __client_uat=1724892279; _cfuvid=rMOROOg_yM6PnwdN.9zcBI6b5pPpFAgk4gnJZRVleSw-1724900213267-0.0.1.1-604800000; mp_26ced217328f4737497bd6ba6641ca1c_mixpanel=%7B%22distinct_id%22%3A%20%223fd02510-456b-4ef2-8483-a896be6f0ef1%22%2C%22%24device_id%22%3A%20%221917d6771627a3-0c43a3047c4e3f-26001e51-1fa400-1917d6771627a3%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%223fd02510-456b-4ef2-8483-a896be6f0ef1%22%7D; __cf_bm=cdTqV6NDUKNX1CsFHOWN0M_yNSk7VTjnQrZVmiPWTWU-1724911392-1.0.1.1-8FlwYNPTYU8sI9eQlxVRgUqfUT7XntVyYS95XI9yscDpL1H2w2grR4881jJLh.Ra3_ZPVD34hrcOSWX1ZkbB4A"  # クッキーを指定
    suno_api = SunoApi(suno_cookie)
    suno_api.init()

    # peak_frequency を含めた prompt を生成
    prompt = f"Use {peak_frequency} and chill. Sounds that match the rain"
    print(peak_frequency)
    
    # 音楽を生成する
    data = suno_api.generate_songs(
        prompt=prompt,
        is_custom=False,
        make_instrumental=True,
        wait_audio=True
    )

    if "error_message" in data:
        return {
            'statusCode': 500,
            'body': json.dumps(data)
        }

    # SQSに音楽のURLを送信
    sqs = boto3.client('sqs')
    for audio in data:
        audio_url = audio.get("audio_url")
        if audio_url:
            sqs.send_message(
                QueueUrl=SQS_QUEUE_URL,
                MessageBody=json.dumps({"audio_url": audio_url})
            )

    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }