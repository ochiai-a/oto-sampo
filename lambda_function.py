import requests
import json
import logging
import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime, timezone, timedelta
import uuid

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

DYNAMODB_TABLE_NAME = "music_table"  # DynamoDBテーブル名を指定
SQS_QUEUE_URL = "https://sqs.ap-northeast-1.amazonaws.com/654654257411/AudioinfoToS3Lambda"  # SQSキューのURLを指定

def get_current_time_jst():
    jst = timezone(timedelta(hours=9))
    jst_now = datetime.now(tz=jst)
    return jst_now.isoformat()

def save_to_dynamodb(audio_url, execution_time, audio_id):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    try:
        table.put_item(
            Item={
                'music_id': audio_id,
                'mp3_url': audio_url,
                'made_date': execution_time
            }
        )
        logger.info(f"Data for {audio_id} saved successfully to DynamoDB")
    except NoCredentialsError:
        logger.error("AWS credentials not available")

def lambda_handler(event, context):
    sqs = boto3.client('sqs')
    
    for record in event['Records']:
        message_body = json.loads(record['body'])
        audio_url = message_body.get("audio_url")
        
        if audio_url:
            audio_id = str(uuid.uuid4())  # UUIDで一意のIDを生成
            execution_time = get_current_time_jst()
            
            # Save metadata to DynamoDB
            save_to_dynamodb(audio_url, execution_time, audio_id)
        else:
            logger.error("Missing audio_url in message")

    return {
        'statusCode': 200,
        'body': json.dumps('Processing complete')
    }