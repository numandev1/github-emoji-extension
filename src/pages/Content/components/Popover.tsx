import React from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';

type Props = {
  content: () => React.ReactElement;
  button: () => React.ReactElement;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (value: boolean) => void;
  textArea: HTMLTextAreaElement;
};

const PopoverCom = ({
  content,
  button,
  isPopoverOpen,
  setIsPopoverOpen,
  textArea,
}: Props) => {
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'left']} //
      containerClassName="popover-container"
      padding={10}
      reposition={false}
      onClickOutside={(e: MouseEvent) => {
        setIsPopoverOpen(false);
        //@ts-ignore
        if (e.target?.localName !== 'textarea') textArea?.focus();
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
      <div>{button()}</div>
    </Popover>
  );
};

export default PopoverCom;
