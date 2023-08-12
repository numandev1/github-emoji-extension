import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';
import RecentEmojis from './storage/index';

import 'arrive';
RecentEmojis.init();

const EMOJI_SPAN_CLASS = 'github_emoji';
const buttonSpan = document.createElement('span');
buttonSpan.className = EMOJI_SPAN_CLASS;
const addEmojiButtonIntoElement = (element: Element, textArea: Element) => {
  const editorTab = element as HTMLElement;
  const emojiSpan = buttonSpan.cloneNode(true) as HTMLSpanElement;
  editorTab.appendChild(emojiSpan);

  const reactRoot = ReactDOM.createRoot(
    editorTab.querySelector(`.${EMOJI_SPAN_CLASS}` as any) // Use the cloned span within the tab
  );

  reactRoot.render(
    <React.StrictMode>
      <Button textArea={textArea} />
    </React.StrictMode>
  );
};

// for issues
const loadContent = () => {
  const markdownTagElement = Array.from(
    document.querySelectorAll('tab-container.js-previewable-comment-form')
  );

  markdownTagElement.forEach((item: Element) => {
    const tabHeader = item.querySelector('div.tabnav-tabs[role="tablist"]');
    const textArea = item.querySelector('textarea[name="comment[body]"]');
    if (tabHeader && textArea) {
      addEmojiButtonIntoElement(tabHeader, textArea);
    }
  });
};
loadContent();

// for PR reviews
//@ts-ignore
document.arrive(
  'tab-container.js-previewable-comment-form',
  function (newElem: Element) {
    RecentEmojis.init();
    const tabHeader = newElem.querySelector('div.tabnav-tabs[role="tablist"]');
    const textArea = newElem.querySelector('textarea[name="comment[body]"]');
    if (tabHeader && textArea) {
      addEmojiButtonIntoElement(tabHeader, textArea);
    }
  }
);

//for github project page
//@ts-ignore
document.arrive(
  'div[data-testid="markdown-editor"]',
  function (newElem: Element) {
    console.log('new arrive', window.location, 'ss');
    RecentEmojis.init();
    const tabHeader = newElem.querySelector('header :first-child');
    const textArea = newElem.querySelector(
      'textarea[aria-label="Markdown value"]'
    );
    console.log(tabHeader, 'tabHeader', textArea);
    if (tabHeader && textArea) {
      addEmojiButtonIntoElement(tabHeader, textArea);
    }
  }
);
