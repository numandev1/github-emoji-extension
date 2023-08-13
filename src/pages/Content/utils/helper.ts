export const insertAtCursor = (
  myField: HTMLInputElement | HTMLTextAreaElement,
  myValue: string
): void => {
  // IE support
  if ((document as any).selection) {
    myField.focus();
    const sel = (document as any).selection.createRange();
    sel.text = myValue;
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
    }
  } else {
    myField.value += myValue;
  }
};

export const EMOJI_SPAN_CLASS = 'github_emoji';
export const buttonSpan = document.createElement('span');
buttonSpan.className = EMOJI_SPAN_CLASS;
