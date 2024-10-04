import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset'; // expo-assetのインポート

const App = () => {
  const [userId] = useState('test00q'); // userIdを固定
  const [fileName, setFileName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [stepFunctionResponse, setStepFunctionResponse] = useState<{ user_id: string; file_name: string } | null>(null); // ステップファンクションのレスポンス用

  // 1. Presigned URLを取得する関数
  const getPresignedURL = async () => {
    try {
      const response = await fetch('https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/getSoundUploadPresignedURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId, // 固定されたuserIdを使用
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFileName(data.file_name);
        setUploadUrl(data.upload_url);
        selectFile(); // ファイルを選択
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };

  // 2. 音楽ファイルを選択する関数
  const selectFile = async () => {
    try {
      const asset = Asset.fromModule(require('../../assets/music/NoisyStreet.mp3'));
      await asset.downloadAsync(); // アセットをダウンロード
      const localFilePath = asset.localUri || ''; // ローカルURIを取得

      const fileInfo = await FileSystem.getInfoAsync(localFilePath);
      if (fileInfo.exists) {
        setFileUri(localFilePath);
        uploadFile(); // ファイルをアップロードする
      } else {
        Alert.alert("エラー", "指定されたファイルが見つかりません");
      }
    } catch (error) {
      Alert.alert("エラー", "ファイルの選択中にエラーが発生しました");
    }
  };

  // 3. 音楽ファイルをPresigned URLに送信する関数
  const uploadFile = async () => {
    if (!fileUri || !uploadUrl) {
      Alert.alert("エラー", "アップロードするファイルまたはURLを選択してください");
      return;
    }

    try {
      const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
        headers: {
          'Content-Type': 'audio/mpeg',
        },
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      if (response.status === 200) {
        Alert.alert("アップロード成功", "音声ファイルがアップロードされました");
        callStepFunction(); // アップロード後にStepFunctionを呼び出す
      } else {
        Alert.alert("アップロード失敗", `ステータスコード: ${response.status}`);
      }
    } catch (error: any) {
      Alert.alert("アップロードエラー", error.message);
    }
  };

  // 4. StepFunctionのAPIを呼び出す関数
  const callStepFunction = async () => {
    try {
      const response = await fetch('https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/generateMusic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId, // 固定されたuserIdを使用
          file_name: fileName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Step Function 実行", "Step Functionが正常に開始されました");
        setStepFunctionResponse({ user_id: userId, file_name: fileName }); // レスポンスを保存
      } else {
        Alert.alert('Error', data.message || 'Step Functionの実行中にエラーが発生しました');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };

  // 初期レンダリング時にPresigned URLを取得
  useEffect(() => {
    getPresignedURL();
  }, []); // 空の依存配列でコンポーネントのマウント時にのみ実行

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get Presigned URL & Upload File" onPress={getPresignedURL} />

      {/* レスポンスを表示 */}
      {fileName !== '' && (
        <View style={{ marginTop: 20 }}>
          <Text>File Name: {fileName}</Text>
          <Text>Upload URL: {uploadUrl}</Text>
        </View>
      )}

      {/* ステップファンクションのレスポンスを表示 */}
      {stepFunctionResponse && (
        <View style={{ marginTop: 20 }}>
          <Text>User ID: {stepFunctionResponse.user_id}</Text>
          <Text>File Name: {stepFunctionResponse.file_name}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
