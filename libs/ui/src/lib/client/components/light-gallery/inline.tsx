'use client';

import {
  ComponentProps,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

export type UILightGalleryInlineProps = {
  children: ({ onInit, container }) => ReactElement;
} & Omit<ComponentProps<'div'>, 'children'>;

export function UILightGalleryInline({
  children,
  ...props
}: UILightGalleryInlineProps) {
  const lightGallery = useRef<any>(null);

  const [container, setContainer] = useState(null);
  const onInit = useCallback((detail: any) => {
    if (detail) {
      lightGallery.current = detail.instance;
      lightGallery.current.openGallery();
    }
  }, []);

  const setContainerRef = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  const getLgComponent = () => {
    if (container !== null) {
      return children({ onInit, container });
    }
    return null;
  };

  return (
    <>
      <div {...props} ref={setContainerRef}></div>
      {getLgComponent()}
    </>
  );
}
