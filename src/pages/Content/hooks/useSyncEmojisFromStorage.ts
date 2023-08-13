import { useEffect } from 'react';
import RecentEmojis, { recents_emojis_key } from '@utils/storage';
import { Emoji } from '@entities/emojiTypo';

const useSyncEmojisFromStorage = (
  setRecentsEmojis: (value: Emoji[]) => void
) => {
  useEffect(() => {
    RecentEmojis.initEmojiListener(() => {
      setTimeout(() => {
        setRecentsEmojis(RecentEmojis.recentEmojis[recents_emojis_key]);
      }, 0);
    });
    RecentEmojis.listener(() => {
      RecentEmojis.getRecentsEmojis()
        .then((result: any[]) => {
          if (result.length > 0) {
            setRecentsEmojis(result);
          }
        })
        .catch((error) => {
          console.log('error=>', error);
        });
    });
  }, []);
};
export default useSyncEmojisFromStorage;
