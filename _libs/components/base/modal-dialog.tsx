import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { UIDevice } from '@portal-web/shared-ui';

export default function LibBaseModalDialog({
  show = false,
  setShow = null,
  button = null,
  fullscreen = false,
  header = null,
  footer = null,
  children,
}: {
  show?: boolean;
  setShow?: any;
  button?: any;
  fullscreen?: boolean;
  header?: any;
  footer?: any;
  children?: any;
}) {
  const [isOpen, setIsOpen] = useState(show);
  const [isFullScreen, setIsFullScreen] = useState(fullscreen);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(500);
  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  function closeModal() {
    setIsFullScreen(fullscreen);
    setIsBeingDragged(false);
    setBottomSheetHeight(0);
    setIsOpen(false);
    if (setShow) setShow(false);
  }

  function openModal() {
    setIsOpen(true);
    if (setShow) setShow(true);
  }

  const onDragY = throttle(
    function (e) {
      setBottomSheetHeight(
        window.innerHeight - parseInt(e.changedTouches[0].clientY)
      );
    },
    1000 / 60,
    { leading: true, trailing: true }
  );
  const calculateBotomSheetPosition = () => {
    setIsBeingDragged(false);

    if (bottomSheetHeight > (75 * window.innerHeight) / 100) {
      setIsFullScreen(true);
    } else if (
      bottomSheetHeight > (40 * window.innerHeight) / 100 &&
      bottomSheetHeight < (75 * window.innerHeight) / 100
    ) {
      setIsFullScreen(false);
    } else {
      closeModal();
    }
  };
  const defaultFooter = (
    <div className="bg-gray-50 flex w-full items-center justify-center py-4 z-[100] mt-auto md:mt-0 px-6">
      <button
        className="btn btn-primary btn-sm w-full !justify-center"
        onClick={closeModal}
      >
        Tutup
      </button>
    </div>
  );
  const mobileView = (
    <section
      className={clsx(
        'absolute bottom-0 flex flex-col max-w-full min-w-full bg-white rounded-t-xl h-full transition-all ease-brand duration-300',
        isFullScreen ? 'min-h-full max-h-full' : 'min-h-[75%] max-h-[75%]'
      )}
      style={
        isBeingDragged
          ? {
              bottom: 0,
              minHeight: `${bottomSheetHeight}px`,
              maxHeight: `${bottomSheetHeight}px`,
              transition: 'none',
            }
          : {}
      }
    >
      <div className="absolute w-full flex justify-end px-4 -top-14">
        <button
          className="h-10 w-10 bg-primary flex items-center justify-center rounded-full"
          onClick={closeModal}
        >
          <Icon icon="mdi:close" className="text-white font-bold w-5 h-5" />
        </button>
      </div>
      <div
        className="p-3"
        onTouchEnd={calculateBotomSheetPosition}
        onTouchMove={onDragY}
        onTouchMoveCapture={() => setIsBeingDragged(true)}
      >
        <div className="w-16 h-[4px] rounded-full bg-gray-300 mx-auto" />
      </div>
      {header && header}
      {/*<slot name="header"/>*/}
      <div className="overflow-y-auto">{children}</div>
      {footer ? footer : defaultFooter}
    </section>
  );

  const desktopView = (
    <section className="modal__body flex flex-col bg-white rounded-lg overflow-hidden max-h-[90%] max-w-[800px]">
      {header && header}
      {children}

      {footer ? footer : defaultFooter}
    </section>
  );

  return (
    <>
      {button && <span onClick={openModal}>{button}</span>}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            enter="transition-opacity ease-in-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="transition ease duration-300 transform"
              enterFrom="opacity-0 translate-y-[200px]"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease duration-300 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-[100%]"
            >
              <div
                id="modal"
                className="fixed w-full h-full inset-0 flex justify-center items-center overflow-hidden"
              >
                <UIDevice>
                  {({ isMobile }) => {
                    if (isMobile) return mobileView;
                    return desktopView;
                  }}
                </UIDevice>
              </div>
              {/*<div*/}
              {/*  className="flex min-h-full items-center justify-center p-4 text-center backdrop-filter backdrop-blur-sm*/}

              {/*  ">*/}

              {/*<Dialog.Panel*/}
              {/*  className="tra w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">*/}
              {/*  <Dialog.Title*/}
              {/*    as="h3"*/}
              {/*    className="text-lg font-medium leading-6 text-gray-900"*/}
              {/*  >*/}
              {/*    Payment successful*/}
              {/*  </Dialog.Title>*/}
              {/*  <div className="mt-2 min-h-[500px]">*/}
              {/*    <p className="text-sm text-gray-500">*/}
              {/*      Your payment has been successfully submitted. We’ve sent*/}
              {/*      you an email with all of the details of your order.*/}
              {/*    </p>*/}
              {/*  </div>*/}

              {/*  <div className="mt-4">*/}
              {/*    <button*/}
              {/*      type="button"*/}
              {/*      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"*/}
              {/*      onClick={closeModal}*/}
              {/*    >*/}
              {/*      Got it, thanks!*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*</Dialog.Panel>*/}
              {/*</div>*/}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
