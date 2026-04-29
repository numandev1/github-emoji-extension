import { initReactAppIntoMarkdownForm } from './common';
// for issues
export const issueLoader = () => {
  const markdownTagElement = Array.from(
    document.querySelectorAll(
      '.js-previewable-comment-form, textarea[name="pull_request_review[body]"], textarea[aria-label="Markdown value"]'
    )
  );
  markdownTagElement.forEach((item: Element) => {
    initReactAppIntoMarkdownForm(item);
  });
};
