'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UIModal, UIModalType } from './modal';
import { usePathname } from 'next/navigation';
interface ModalContextProps {
  show: (
    content: ReactNode,
    customizes?: UIModalType['customizesProps']
  ) => void;
  hide: () => void;
}

const UIModalContext = createContext<ModalContextProps | undefined>(undefined);

export function UIModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalCustomize, setModalCustomize] = useState<
    UIModalType['customizesProps'] | undefined
  >(undefined);
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    hide();
  }, [pathname]);
  const _show: ModalContextProps['show'] = (content, customize) => {
    setModalContent(content);
    setModalCustomize(customize);
    setShow(true);
  };

  const hide = () => {
    setShow(false);
    setTimeout(() => {
      setModalCustomize(undefined);
      setModalContent(null);
    }, 300); // Adjust this timeout as per your transition duration
  };

  return (
    <UIModalContext.Provider value={{ show: _show, hide }}>
      {children}
      <UIModal show={show} setShow={setShow} customizes={modalCustomize}>
        {modalContent}
      </UIModal>
    </UIModalContext.Provider>
  );
}

export function useUIModal() {
  return useContext(UIModalContext);
}
