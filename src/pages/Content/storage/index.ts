export const recents_emojis_key = 'recents_emojis';

interface EmojiObjectType {
  value: string;
  terms: string;
}

class RecentEmojis {
  public recentEmojis: { [recents_emojis_key: string]: EmojiObjectType[] } = {
    [recents_emojis_key]: [],
  };
  private initCallback: any = undefined;

  init = () => {
    this.getRecentsEmojis()
      .then((result: EmojiObjectType[]) => {
        this.recentEmojis = { [recents_emojis_key]: result };
        this.initCallback && this.initCallback();
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  initEmojiListener = (callback: () => void | null) => {
    this.initCallback = callback;
  };

  setRecentEmojis = async (emoji: EmojiObjectType) => {
    const allRecentEmojis: EmojiObjectType[] =
      (await this.getRecentsEmojis()) as any;
    const index = allRecentEmojis.findIndex(
      (item) => item.value === emoji.value
    );
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
    await chrome.storage.sync.set({ [recents_emojis_key]: allRecentEmojis });
  };

  getRecentsEmojis = async () => {
    const results = await chrome.storage.sync.get(recents_emojis_key);
    return results[recents_emojis_key] || [];
  };
}

export default new RecentEmojis();
