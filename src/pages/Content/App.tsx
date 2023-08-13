import React, { useState } from 'react';
import Button from '@components/Button';
import Popover from '@components/Popover';
import EmojiContainer from '@components/EmojiContainer';
import RecentEmojis, { recents_emojis_key } from '@utils/storage';
import { Emoji } from '@entities/emojiTypo';
import useSyncEmojisFromStorage from '@hooks/useSyncEmojisFromStorage';
import useKeyboardHandler from '@hooks/useKeyboardHandler';
function App({ textArea }: { textArea: HTMLTextAreaElement }) {
  const [recentsEmojis, setRecentsEmojis] = useState<Emoji[]>(
    RecentEmojis.recentEmojis[recents_emojis_key]
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const onClicEmoji = () => {
    isPopoverOpen && textArea?.focus();
    setIsPopoverOpen(!isPopoverOpen);
  };

  const button = () => (
    <Button recentsEmojis={recentsEmojis} onClicEmoji={onClicEmoji} />
  );

  useSyncEmojisFromStorage(setRecentsEmojis);
  useKeyboardHandler({ isPopoverOpen, setIsPopoverOpen, textArea });

  const content = () => (
    <EmojiContainer
      isPopoverOpen
      recentsEmojis={recentsEmojis}
      textArea={textArea}
    />
  );

  return (
    <Popover
      isPopoverOpen={isPopoverOpen}
      setIsPopoverOpen={setIsPopoverOpen}
      content={content}
      button={button}
      textArea={textArea}
    />
  );
}

export default App;
