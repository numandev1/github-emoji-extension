import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://chrome.google.com/webstore/detail/ecldoejhjmekemajgjjalfgkhgmfjgcl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Review+On+WebStore&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=" />
        </a>
        <a
          className="App-link"
          href="https://github.com/numandev1/github-emojis-extension/stargazers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>support with a Star on Github ⭐️</h4>
        </a>
        <a
          href="https://github.com/numandev1?tab=followers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.shields.io/github/followers/numandev1?label=Follow%20%40numandev1&style=social"
            height="25"
          />
        </a>
        <a
          className="App-link mt-20"
          href="https://github.com/numandev1/github-emoji-extension#readme"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to use?
        </a>
      </header>
    </div>
  );
};

export default Popup;
