export const insertAtCursor = (
  myField: HTMLInputElement | HTMLTextAreaElement,
  myValue: string
): void => {
  const dispatchInputEvents = () => {
    myField.dispatchEvent(new InputEvent('input', { bubbles: true }));
    myField.dispatchEvent(new Event('change', { bubbles: true }));
  };

  if (typeof myField.setRangeText === 'function') {
    const startPos = myField.selectionStart ?? myField.value.length;
    const endPos = myField.selectionEnd ?? myField.value.length;

    myField.focus();
    myField.setRangeText(myValue, startPos, endPos, 'end');
    dispatchInputEvents();
    return;
  }

  // IE support
  if ((document as any).selection) {
    myField.focus();
    const sel = (document as any).selection.createRange();
    sel.text = myValue;
    dispatchInputEvents();
  }
  // Microsoft Edge
  else if (window.navigator.userAgent.indexOf('Edge') > -1) {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;
    if (startPos !== null && endPos !== null) {
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);

      const pos = startPos + myValue.length;
      myField.focus();
      myField.setSelectionRange(pos, pos);
      dispatchInputEvents();
    }
  }
  // MOZILLA and others
  else if (
    myField.selectionStart !== undefined ||
    myField.selectionStart === 0
  ) {
    const startPos = myField.selectionStart as number;
    const endPos = myField.selectionEnd as number;
    if (startPos !== null && endPos !== null) {
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
      dispatchInputEvents();
    }
  } else {
    myField.value += myValue;
    dispatchInputEvents();
  }
};

export const EMOJI_SPAN_CLASS = 'github_emoji';
export const buttonSpan = document.createElement('span');
buttonSpan.className = EMOJI_SPAN_CLASS;
