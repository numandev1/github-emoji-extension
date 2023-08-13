export interface EmojiDirectory {
  title: string;
  link: string;
  emojis: Emoji[];
}

export interface Emoji {
  value: string;
  terms: string;
}
