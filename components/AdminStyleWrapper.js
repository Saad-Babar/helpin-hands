// components/AdminStyleWrapper.js
import { useEffect } from 'react';

export default function AdminStyleWrapper({ children }) {
  useEffect(() => {
    // Load compiled CSS
    const link = document.createElement('link');
    link.href = '/admin-assets/css/theme.css';
    link.rel = 'stylesheet';
    link.id = 'admin-styles';
    document.head.appendChild(link);

    // Add scope class to body to prevent style leakage
    document.body.classList.add('admin-page-active');

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.classList.remove('admin-page-active');
    };
  }, []);

  return (
    <div className="admin-scope">
      {children}
    </div>
  );
}