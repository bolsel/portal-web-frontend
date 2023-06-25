import {
  ComponentProps,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

export type LibBaseLightGalleryInlineProps = {
  children: ({ onInit, container }) => ReactElement;
} & Omit<ComponentProps<'div'>, 'children'>;

export default function LibBaseLightGalleryInline({
  children,
  ...props
}: LibBaseLightGalleryInlineProps) {
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
