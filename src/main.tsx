import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

const root = document.getElementById('root')!;

const renderBootstrapError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : '';
  root.innerHTML = `
    <div style="min-height:100vh;background:#050505;color:#fff;padding:32px;font-family:ui-monospace,monospace">
      <div style="max-width:1100px;margin:0 auto">
        <div style="display:inline-block;padding:6px 10px;border:1px solid #3a3a3a;border-radius:8px;color:#D9FF3F;font-size:11px;font-weight:700;letter-spacing:.08em">BENSOP RUNTIME DIAGNOSTIC</div>
        <h1 style="font-size:28px;margin:18px 0 10px">Ứng dụng chưa thể khởi động</h1>
        <p style="color:#aaa;line-height:1.6">Đây là lỗi JavaScript lúc tải module, không phải lỗi dữ liệu của Dashboard. Thông tin dưới đây giúp truy đúng file nguồn.</p>
        <pre style="white-space:pre-wrap;word-break:break-word;background:#0d0d0d;border:1px solid #222;border-radius:12px;padding:18px;color:#ff8f8f;line-height:1.55">${message}\n\n${stack || ''}</pre>
      </div>
    </div>`;
};

import('./App.tsx')
  .then(({default: App}) => {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch(renderBootstrapError);
