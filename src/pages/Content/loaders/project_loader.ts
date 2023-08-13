import RecentEmojis from '../utils/storage';
import { initReactAppIntoMarkdownHeader } from './common';

//for github project page
// known issue, we have to bypass focus-trap: https://github.com/primer/behaviors in github project page, where search input is not getting focus
//@ts-ignore
document.arrive(
  'div[data-testid="markdown-editor"]',
  function (newElem: Element) {
    console.log('markdow editor have come into dom');
    RecentEmojis.init();
    const tabHeader = newElem.querySelector('header :first-child');
    const textArea: HTMLTextAreaElement | null = newElem.querySelector(
      'textarea[aria-label="Markdown value"]'
    );
    if (tabHeader && textArea) {
      initReactAppIntoMarkdownHeader(tabHeader, textArea);
    }
  }
);
