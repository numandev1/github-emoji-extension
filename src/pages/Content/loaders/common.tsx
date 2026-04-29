import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { buttonSpan, EMOJI_SPAN_CLASS } from '@utils/helper';

const MARKDOWN_TEXTAREA_SELECTORS = [
  'textarea[name="comment[body]"]',
  'textarea[id="pull_request_body"]',
  'textarea[name="pull_request[body]"]',
  'textarea[name="pull_request_review[body]"]',
  'textarea[name="issue_comment[body]"]',
  'textarea[name="issue[body]"]',
  'textarea[aria-label="Markdown value"]',
  'textarea.js-comment-field',
].join(',');

const MARKDOWN_CONTAINER_SELECTORS = [
  'form',
  'fieldset',
  '.js-previewable-comment-form',
  '[data-marker-navigation-new-thread="true"]',
].join(',');

const MARKDOWN_HEADER_SELECTORS = [
  '.tabnav-tabs[role="tablist"]',
  '.tabnav-tabs',
  '.prc-TabNav-TabNavTabList-Ave63[role="tablist"]',
  '[aria-label="View mode"] [role="tablist"]',
  '.MarkdownEditor-module__header__h_RoA [role="tablist"]',
  '[role="toolbar"][aria-label="Formatting tools"]',
  '[data-component="ActionBar"] [role="toolbar"]',
  '[role="toolbar"]',
  'markdown-toolbar',
].join(',');

const isVisibleElement = (element: Element) => {
  const htmlElement = element as HTMLElement;
  const styles = window.getComputedStyle(htmlElement);

  return (
    styles.display !== 'none' &&
    styles.visibility !== 'hidden' &&
    htmlElement.offsetParent !== null
  );
};

const getMarkdownHeader = (element: Element, textArea: HTMLTextAreaElement) => {
  const container = textArea.closest(MARKDOWN_CONTAINER_SELECTORS) || element;
  const headers = Array.from(
    container.querySelectorAll(MARKDOWN_HEADER_SELECTORS)
  );

  return headers.find(isVisibleElement) || headers[0] || null;
};

export const initReactAppIntoMarkdownHeader = (
  element: Element,
  textArea: HTMLTextAreaElement
) => {
  if (textArea.dataset.githubEmojiAttached === 'true') {
    return;
  }

  const editorTab = element as HTMLElement;
  if (editorTab.querySelector(`.${EMOJI_SPAN_CLASS}`)) {
    textArea.dataset.githubEmojiAttached = 'true';
    return;
  }

  const emojiSpan = buttonSpan.cloneNode(true) as HTMLSpanElement;
  editorTab.appendChild(emojiSpan);
  textArea.dataset.githubEmojiAttached = 'true';

  const reactRoot = ReactDOM.createRoot(
    editorTab.querySelector(`.${EMOJI_SPAN_CLASS}` as any)
  );

  reactRoot.render(
    <React.StrictMode>
      <App textArea={textArea} />
    </React.StrictMode>
  );
};

export const initReactAppIntoMarkdownForm = (element: Element) => {
  const textArea =
    element.matches(MARKDOWN_TEXTAREA_SELECTORS)
      ? (element as HTMLTextAreaElement)
      : element.querySelector<HTMLTextAreaElement>(MARKDOWN_TEXTAREA_SELECTORS);

  if (!textArea) {
    return;
  }

  const tabHeader = getMarkdownHeader(element, textArea);

  if (tabHeader) {
    initReactAppIntoMarkdownHeader(tabHeader, textArea);
  }
};
