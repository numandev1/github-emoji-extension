import RecentEmojis from '@utils/storage';
import { initReactAppIntoMarkdownHeader } from './common';

// for PR reviews
//@ts-ignore
document.arrive('.js-previewable-comment-form', function (newElem: Element) {
  console.log('markdow editor have come into dom');
  RecentEmojis.init();
  const tabHeader = newElem.querySelector('.tabnav-tabs[role="tablist"]');
  const textArea: HTMLTextAreaElement | null = newElem.querySelector(
    'textarea[name="comment[body]"]'
  );

  if (tabHeader && textArea) {
    initReactAppIntoMarkdownHeader(tabHeader, textArea);
  } else {
    // for open pull request arrive
    const textArea1: HTMLTextAreaElement | null = newElem.querySelector(
      'textarea[id="pull_request_body"]'
    );
    if (tabHeader && textArea1) {
      initReactAppIntoMarkdownHeader(tabHeader, textArea1);
    } else {
      // for edit pull request main textarea
      const textArea2: HTMLTextAreaElement | null = newElem.querySelector(
        'textarea[name="pull_request[body]"]'
      );
      if (tabHeader && textArea2) {
        initReactAppIntoMarkdownHeader(tabHeader, textArea2);
      } else {
        const textArea3: HTMLTextAreaElement | null = newElem.querySelector(
          'textarea[name="pull_request_review[body]"]'
        );
        if (tabHeader && textArea3) {
          initReactAppIntoMarkdownHeader(tabHeader, textArea3);
        } else {
          // for issue edit
          const textArea4: HTMLTextAreaElement | null = newElem.querySelector(
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
