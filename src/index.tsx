import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ConfigProvider, App as AntApp } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <AntApp>
        <App/>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);
