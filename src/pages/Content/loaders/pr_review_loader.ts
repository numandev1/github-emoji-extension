import RecentEmojis from '@utils/storage';
import { initReactAppIntoMarkdownHeader } from './common';

// for PR reviews
//@ts-ignore
document.arrive(
  'tab-container.js-previewable-comment-form',
  function (newElem: Element) {
    console.log('markdow editor have come into dom');
    RecentEmojis.init();
    const tabHeader = newElem.querySelector('div.tabnav-tabs[role="tablist"]');
    const textArea: HTMLTextAreaElement | null = newElem.querySelector(
      'textarea[name="comment[body]"]'
    );
    if (tabHeader && textArea) {
      initReactAppIntoMarkdownHeader(tabHeader, textArea);
    }
  }
);
