'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastLoggedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid re-logging exact same path immediately
    if (lastLoggedPath.current === pathname) return;
    lastLoggedPath.current = pathname;

    // Get or create session ID
    let sessionId = '';
    try {
      sessionId = localStorage.getItem('pka_visitor_session_id') || '';
      if (!sessionId) {
        sessionId = 'vs_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem('pka_visitor_session_id', sessionId);
      }
    } catch {
      sessionId = 'vs_tmp_' + Date.now();
    }

    const reportVisit = async () => {
      try {
        await fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            path: pathname || '/',
            pageTitle: typeof document !== 'undefined' ? document.title : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
          }),
        });
      } catch {
        // Silent catch for background tracking
      }
    };

    reportVisit();
  }, [pathname]);

  return null;
}
