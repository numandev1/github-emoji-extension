import { initReactAppIntoMarkdownHeader } from './common';
// for issues
export const issueLoader = () => {
  const markdownTagElement = Array.from(
    document.querySelectorAll('.js-previewable-comment-form')
  );
  markdownTagElement.forEach((item: Element) => {
    const tabHeader = item.querySelector('.tabnav-tabs[role="tablist"]');
    const textArea: HTMLTextAreaElement | null = item.querySelector(
      'textarea[name="comment[body]"]'
    );

    if (tabHeader && textArea) {
      initReactAppIntoMarkdownHeader(tabHeader, textArea);
    } else {
      const textArea1: HTMLTextAreaElement | null = item.querySelector(
        'textarea[id="pull_request_body"]'
      );
      if (tabHeader && textArea1) {
        initReactAppIntoMarkdownHeader(tabHeader, textArea1);
      } else {
        // for edit issue body main textarea
        const textArea2: HTMLTextAreaElement | null = item.querySelector(
          'textarea[name="issue[body]"]'
        );
        if (tabHeader && textArea2) {
          initReactAppIntoMarkdownHeader(tabHeader, textArea2);
        } else {
          const textArea3: HTMLTextAreaElement | null = item.querySelector(
            'textarea[name="pull_request_review[body]"]'
          );
          if (tabHeader && textArea3) {
            initReactAppIntoMarkdownHeader(tabHeader, textArea3);
          } else {
            // for issue edit
            const textArea4: HTMLTextAreaElement | null = item.querySelector(
              'textarea[name="issue_comment[body]"]'
            );
            if (tabHeader && textArea4) {
              initReactAppIntoMarkdownHeader(tabHeader, textArea4);
            }
          }
        }
      }
    }
  });
};
