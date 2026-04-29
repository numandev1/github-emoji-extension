import RecentEmojis from '@utils/storage';
import { initReactAppIntoMarkdownForm } from './common';

const loadEmojiPicker = (newElem: Element) => {
  console.log('markdow editor have come into dom');
  RecentEmojis.init();
  initReactAppIntoMarkdownForm(newElem);
};

// for PR reviews
//@ts-ignore
document.arrive('.js-previewable-comment-form', loadEmojiPicker);

// for the review submission form opened from the PR "Files changed" tab
//@ts-ignore
document.arrive('textarea[name="pull_request_review[body]"]', loadEmojiPicker);

// for GitHub's newer inline diff comment editor
//@ts-ignore
document.arrive('textarea[aria-label="Markdown value"]', loadEmojiPicker);
