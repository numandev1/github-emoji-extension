import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';
import 'arrive';

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

window.addEventListener('transitionend', (event) => {
  if (
    event.type === 'transitionend' &&
    //@ts-ignore
    event?.target?.getAttribute('class') === 'turbo-progress-bar' &&
    event?.propertyName === 'opacity'
  ) {
    loadContent();
  }
});

//@ts-ignore
document.arrive(
  'tab-container.js-previewable-comment-form',
  function (newElem: Element) {
    const tabHeader = newElem.querySelector('div.tabnav-tabs[role="tablist"]');
    const textArea = newElem.querySelector('textarea[name="comment[body]"]');
    if (tabHeader && textArea) {
      addEmojiButtonIntoElement(tabHeader, textArea);
    }
  }
);
