import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';

const EMOJI_SPAN_CLASS = 'github_emoji';
const buttonSpan = document.createElement('span');
buttonSpan.className = EMOJI_SPAN_CLASS;

const loadContent = () => {
  const tabDivs = Array.from(
    document.querySelectorAll('div.tabnav-tabs[role="tablist"]')
  );

  tabDivs.forEach((item: Element, index) => {
    const editorTab = item as HTMLElement;
    // document.querySelectorAll('button.btn-link.add-line-comment');

    // //@ts-ignore
    // if ([...editorTab.getElementsByClassName(EMOJI_SPAN_CLASS)].length > 0) {
    //   return;
    // }
    const emojiSpan = buttonSpan.cloneNode(true) as HTMLSpanElement;
    editorTab.appendChild(emojiSpan);

    const reactRoot = ReactDOM.createRoot(
      editorTab.querySelector(`.${EMOJI_SPAN_CLASS}` as any) // Use the cloned span within the tab
    );

    reactRoot.render(
      <React.StrictMode>
        <Button index={index} />
      </React.StrictMode>
    );
  });
};
loadContent();

window.addEventListener('transitionend', (event) => {
  // console.log(event, 'event', event?.target?.getAttribute('propertyName'));
  if (
    event.type === 'transitionend' &&
    //@ts-ignore
    event?.target?.getAttribute('class') === 'turbo-progress-bar' &&
    event?.propertyName === 'opacity'
  ) {
    console.log('ssssssss');
    loadContent();
  }
});

const observer = new MutationObserver(function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    console.log(mutation, 'mutation');

    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Custom logic here
      console.log('appendChild event detected:', mutation.addedNodes);
    }
  }
});

const config = { childList: true, subtree: true };
const jss = document.getElementsByClassName(
  'js-diff-progressive-container'
)?.[0];
if (jss) observer.observe(jss, config);

// js-diff-progressive-container
// placeholder: 'Leave a comment';
// box-shadow
// Leave a comment
// ariaLabel
// :
// "Comment body"
