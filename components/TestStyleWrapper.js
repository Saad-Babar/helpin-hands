// components/TestStyleWrapper.js
import { useEffect } from 'react';

export default function TestStyleWrapper({ children }) {
  useEffect(() => {
    // Method 1: Inline styles (immediate feedback)
    const style = document.createElement('style');
    style.textContent = `
      .admin-scope-test {
        background: lime !important;
        border: 5px solid red !important;
        padding: 20px;
      }
    `;
    document.head.appendChild(style);

    // Method 2: Dynamic CSS file loading
    const link = document.createElement('link');
    link.href = '../admin-assets/css/theme.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="admin-scope-test">
      <div className="admin-scope">
        {children}
      </div>
    </div>
  );
}