const key = 'recents_emojis';

interface EmojiObjectType {
  value: string;
  terms: string;
}

//@ts-ignore
let callbackRegister = null;

export const setRecentEmojis = async (emoji: EmojiObjectType) => {
  const allRecentEmojis: EmojiObjectType[] = (await getRecentsEmojis()) as any;
  const index = allRecentEmojis.findIndex((item) => item.value === emoji.value);
  if (index > -1) {
    allRecentEmojis.splice(index, 1);
    allRecentEmojis.unshift(emoji);
  } else {
    if (allRecentEmojis.length >= 12) {
      allRecentEmojis.pop();
      allRecentEmojis.unshift(emoji);
    } else {
      allRecentEmojis.unshift(emoji);
    }
  }
  await chrome.storage.sync.set({ [key]: allRecentEmojis });
  //@ts-ignore
  callbackRegister && callbackRegister(allRecentEmojis);
};

export const getRecentsEmojis = async () => {
  const results = await chrome.storage.sync.get(key);
  return results[key] || [];
};

export const getRecentsEmojisLisner = async (callback: () => void) => {
  callbackRegister = callback;
};
