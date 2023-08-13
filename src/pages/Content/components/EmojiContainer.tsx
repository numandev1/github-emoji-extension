import { Emoji } from '@entities/emojiTypo';
import React, { useState, useEffect } from 'react';
import { SVG } from '@utils/SVGs';
import useDebouncedCallback from '@hooks/useDebouncedCallback';
import { emojisDirectories } from '@utils/emojies';
import { insertAtCursor } from '@utils/helper';
import RecentEmojis from '@utils/storage';
import InputRef from '@utils/inputRef';
type Props = {
  textArea: HTMLTextAreaElement;
  recentsEmojis: Emoji[];
  isPopoverOpen: boolean;
};

const EmojiContainer = ({ recentsEmojis, textArea, isPopoverOpen }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emojisDirectoriesState, setEmojisDirectoriesState] =
    useState(emojisDirectories);

  const updateEmojis = useDebouncedCallback((text: string) => {
    setSearchTerm(text);
    const searchedText = text.toLowerCase();
    const filteredEmojiDirectories: any = [];
    emojisDirectories.forEach((section: any) => {
      const emojis = section.emojis.filter((emoji: any) =>
        emoji.terms.toLowerCase().includes(searchedText)
      );
      if (emojis.length > 0) {
        filteredEmojiDirectories.push({
          ...section,
          emojis,
        });
      }
    });

    setEmojisDirectoriesState(filteredEmojiDirectories);
  }, 200);

  const onSearch = (e: any) => {
    const value = e.target.value;
    updateEmojis(value);
  };

  const onSelectEmojiHandler = (emoji: Emoji) => {
    const textField: any = textArea;
    if (textField) {
      insertAtCursor(textField, emoji.value);
      InputRef.ref.current?.focus();
      RecentEmojis.setRecentEmojis(emoji);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      setTimeout(() => {
        InputRef.ref.current?.focus();
      }, 0);
    } else {
      setEmojisDirectoriesState(emojisDirectories);
      setSearchTerm('');
    }
  }, [isPopoverOpen]);

  return (
    <div className="gh-emoji-container">
      {/** Input **/}
      <div className="gh-emoji-input-wrapper">
        <img
          className="gh-emoji-search-icon"
          src={SVG['search']}
          alt="search icon"
        />
        <input
          ref={InputRef.ref}
          id="gh-emoji-input-search"
          placeholder="Search emoji..."
          onChange={onSearch}
        />
      </div>

      <div className="gh-emoji-shortcut-wrapper">
        <a href="#gh-emoji-smileyy">
          <img src={SVG['smiley']} alt="smiley icon" />
        </a>
        <a href="#gh-emoji-people">
          <img src={SVG['hand']} alt="hand icon" />
        </a>
        <a href="#gh-emoji-animals">
          <img src={SVG['animal']} alt="animal icon" />
        </a>
        <a href="#gh-emoji-food">
          <img src={SVG['food']} alt="food icon" />
        </a>
        <a href="#gh-emoji-travel">
          <img src={SVG['travel']} alt="travel icon" />
        </a>
        <a href="#gh-emoji-activities">
          <img src={SVG['activities']} alt="activities icon" />
        </a>
        <a href="#gh-emoji-objects">
          <img src={SVG['objects']} alt="objects icon" />
        </a>
        <a href="#gh-emoji-symbols">
          <img src={SVG['symbols']} alt="symbols icon" />
        </a>
        <a href="#gh-emoji-flags">
          <img src={SVG['flags']} alt="flags icon" />
        </a>
      </div>

      {/** emojies **/}
      <div className="gh-emoji-directory-wrapper">
        {emojisDirectoriesState.length === 0 ? (
          <p>No emoji found.</p>
        ) : (
          <>
            {!searchTerm && recentsEmojis?.length > 0 && (
              <>
                <p className="title" id={`gh-emoji-recents`}>
                  <span>RECENTS</span>
                </p>
                <div className="emojis">
                  {recentsEmojis?.map((item, index) => {
                    return (
                      <button
                        key={`recents_emojis_${index}`}
                        onClick={() => onSelectEmojiHandler(item)}
                      >
                        {item.value}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            {emojisDirectoriesState.map((section) => {
              return (
                <>
                  <p className="title" id={`gh-emoji-${section.link}`}>
                    <span>{section.title}</span>
                  </p>
                  <div className="emojis">
                    {section.emojis?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => onSelectEmojiHandler(item)}
                        >
                          {item.value}
                        </button>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>

      <div className="gh-emoji-output-wrapper">
        <a
          className="App-link"
          href="https://github.com/numandev1/github-emojis-extension/stargazers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>Consider supporting with a Star ⭐️</h6>
        </a>
      </div>
    </div>
  );
};

export default EmojiContainer;
