import { Emoji } from '@entities/emojiTypo';
import React from 'react';

type Props = {
  onClicEmoji: () => void;
  recentsEmojis: Emoji[];
};

const Button = ({ onClicEmoji, recentsEmojis }: Props) => {
  const onClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClicEmoji();
  };

  return (
    <span id="emoji-button" onClick={onClickHandler}>
      {recentsEmojis?.length > 0 ? recentsEmojis[0].value : '😋'}
    </span>
  );
};

export default Button;
