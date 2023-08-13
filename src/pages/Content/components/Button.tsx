import { Emoji } from '@entities/emojiTypo';
import React from 'react';

type Props = {
  onClicEmoji: () => void;
  recentsEmojis: Emoji[];
};

const Button = ({ onClicEmoji, recentsEmojis }: Props) => {
  return (
    <span id="emoji-button" onClick={onClicEmoji}>
      {recentsEmojis?.length > 0 ? recentsEmojis[0].value : '😋'}
    </span>
  );
};

export default Button;
