import React, { useEffect, useRef } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';

type Props = {
  content: () => React.ReactElement;
  button: () => React.ReactElement;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (value: boolean) => void;
};

const PopoverCom = ({
  content,
  button,
  isPopoverOpen,
  setIsPopoverOpen,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPopoverOpen) {
      return;
    }

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const popoverContainer = document.querySelector('.popover-container');

      if (
        wrapperRef.current?.contains(target) ||
        popoverContainer?.contains(target)
      ) {
        return;
      }

      setIsPopoverOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointerDown, true);

    return () => {
      document.removeEventListener(
        'pointerdown',
        closeOnOutsidePointerDown,
        true
      );
    };
  }, [isPopoverOpen, setIsPopoverOpen]);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'left']} //
      containerClassName="popover-container"
      padding={10}
      reposition={false}
      onClickOutside={(e: MouseEvent) => {
        setIsPopoverOpen(false);
      }}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'#DDD'}
          arrowSize={10}
          arrowStyle={{ opacity: 0.7 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          {content()}
        </ArrowContainer>
      )}
    >
      <div ref={wrapperRef}>{button()}</div>
    </Popover>
  );
};

export default PopoverCom;
