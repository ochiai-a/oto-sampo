import React, { useState } from 'react';
import './css/app.css';
import SplashScreen from './src/splashscreen';
import Library from './src/library';

function App() {
  const [screen, setScreen] = useState('splash'); // 初期画面

  const handleClick = () => {
    setScreen('other'); // 他の画面に切り替え
  };

  return (
    <div onClick={handleClick}>
      {' '}
      {/* ヘッダーの下に配置するためにパディングを設定 */}
      {screen === 'splash' && <SplashScreen />}
      {screen === 'other' && <Library />}
    </div>
  );
}

export default App;
