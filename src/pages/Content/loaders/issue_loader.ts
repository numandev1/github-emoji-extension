import { initReactAppIntoMarkdownHeader } from './common';
// for issues
export const issueLoader = () => {
  const markdownTagElement = Array.from(
    document.querySelectorAll('tab-container.js-previewable-comment-form')
  );

  markdownTagElement.forEach((item: Element) => {
    const tabHeader = item.querySelector('div.tabnav-tabs[role="tablist"]');
    const textArea: HTMLTextAreaElement | null = item.querySelector(
      'textarea[name="comment[body]"]'
    );
    if (tabHeader && textArea) {
      initReactAppIntoMarkdownHeader(tabHeader, textArea);
    }
  });
};
