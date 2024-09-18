import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import StatusBarArea from './src/fixed/StatusBarArea';
import GestureBarArea from './src/fixed/GestureBarArea';
import './css/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatusBarArea />
    <App />
    <GestureBarArea />
  </StrictMode>
);
