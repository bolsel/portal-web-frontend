'use client';

import { useEffect, RefObject } from 'react';

export const useScript = (url: string, ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
    }

    return () => {
      if (ref.current) ref.current.removeChild(script);
    };
  }, [url, ref]);
};
