import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';

const EMOJI_SPAN_ID = 'github_emoji';
const root = document.createElement('span');
root.id = EMOJI_SPAN_ID;

const editorTabClass = 'tabnav-tabs';
const editorTab =
  document.getElementsByClassName(editorTabClass)?.[
    document.getElementsByClassName(editorTabClass).length - 1
  ];
if (editorTab) {
  editorTab.appendChild(root);
  const reactRoot = ReactDOM.createRoot(
    document.getElementById(EMOJI_SPAN_ID)!
  );

  reactRoot.render(
    <React.StrictMode>
      <Button />
    </React.StrictMode>
  );
}
