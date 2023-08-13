import { useEffect } from 'react';
type Params = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: (value: boolean) => void;
  textArea: HTMLTextAreaElement;
};

const useKeyboardHandler = ({
  isPopoverOpen,
  setIsPopoverOpen,
  textArea,
}: Params) => {
  useEffect(() => {
    const handleUserKeyPress = (e: KeyboardEvent) => {
      //@ts-ignore
      const evtobj: KeyboardEvent = window.event ? window.event : e;
      //@ts-ignore
      if ((evtobj.ctrlKey || evtobj.metaKey) && evtobj.keyCode === 222) {
        if (isPopoverOpen) {
          setTimeout(() => {
            textArea?.focus();
          }, 0);
        }
        setIsPopoverOpen(!isPopoverOpen);
      } else if (
        evtobj.key === 'Escape' ||
        evtobj.key === 'Enter' ||
        evtobj.keyCode === 13
      ) {
        if (isPopoverOpen) {
          setTimeout(() => {
            textArea?.focus();
          }, 0);
        }
        setIsPopoverOpen(false);
      }
    };

    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [isPopoverOpen]);
};
export default useKeyboardHandler;
