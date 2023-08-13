import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { buttonSpan, EMOJI_SPAN_CLASS } from '@utils/helper';

export const initReactAppIntoMarkdownHeader = (
  element: Element,
  textArea: HTMLTextAreaElement
) => {
  const editorTab = element as HTMLElement;
  const emojiSpan = buttonSpan.cloneNode(true) as HTMLSpanElement;
  editorTab.appendChild(emojiSpan);

  const reactRoot = ReactDOM.createRoot(
    editorTab.querySelector(`.${EMOJI_SPAN_CLASS}` as any)
  );

  reactRoot.render(
    <React.StrictMode>
      <App textArea={textArea} />
    </React.StrictMode>
  );
};
