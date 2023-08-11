export const insertAtCursor = (myField: Element, myValue: string) => {
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }
  // Microsoft Edge
  else if (window.navigator.userAgent.indexOf('Edge') > -1) {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    var pos = startPos + myValue.length;
    myField.focus();
    myField.setSelectionRange(pos, pos);
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == 0) {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
  }
};
