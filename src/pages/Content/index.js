import { printLine } from './modules/print';

console.log('Content script works! ss');
console.log('Must reload extension for modifications to take effect. nomi sss');

printLine("Using the 'printLine' function from the Print Module nomi");
const editorTabId = 'new_comment_field';
const editorTab = document.getElementById('new_comment_field');
if (editorTab) {
  document.getElementById(editorTabId).value += ' nomi usman aa sss';
}
