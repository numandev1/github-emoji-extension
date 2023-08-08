import React, { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import { SVG } from './SVGs';
import { emojisDirectories } from '../modules/emojies';
import useDebouncedCallback from '../modules/useDebouncedCallback';
const Button = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [emojisDirectoriesState, setEmojisDirectoriesState] =
    useState(emojisDirectories);

  useEffect(() => {
    isPopoverOpen && setEmojisDirectoriesState(emojisDirectories);
  }, [isPopoverOpen]);

  const updateEmojis = useDebouncedCallback((text: string) => {
    console.log('text', text);
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

  const onSelectEmojiHandler = (emoji: string) => {
    const textField: any = document.getElementById('new_comment_field');
    if (textField) {
      textField.value += emoji;
    }
  };

  const onClicEmoji = () => {
    isPopoverOpen && document.getElementById('new_comment_field')?.focus();
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'left']} //
      padding={10}
      reposition={false}
      onClickOutside={() => {
        setIsPopoverOpen(false);
        document.getElementById('new_comment_field')?.focus();
      }}
      content={({ position, nudgedLeft, nudgedTop }) => (
        <div className="gh_emoji_container">
          {/** Input **/}
          <div className="gh_emoji_input-wrapper">
            <img
              className="gh_emoji_search_icon"
              src={SVG['search']}
              alt="search icon"
            />
            <input
              id="gh_emoji_input_search"
              placeholder="Search emoji..."
              onChange={onSearch}
            />
          </div>
          {/** emojies **/}
          <div className="gh_emoji_directory-wrapper">
            {emojisDirectoriesState.length === 0 ? (
              <p>No emoji found.</p>
            ) : (
              emojisDirectoriesState.map((section) => {
                return (
                  <>
                    <p className="title" id={`gh_emoji_${section.link}`}>
                      <span>{section.title}</span>
                    </p>
                    <div className="emojis">
                      {section.emojis?.map((item) => {
                        return (
                          <button
                            onClick={() => onSelectEmojiHandler(item.value)}
                          >
                            {item.value}
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })
            )}
          </div>

          <div className="gh_emoji_shortcut-wrapper">
            <a href="#gh_emoji_smileyy">
              <img src={SVG['smiley']} alt="smiley icon" />
            </a>
            <a href="#gh_emoji_people">
              <img src={SVG['hand']} alt="hand icon" />
            </a>
            <a href="#gh_emoji_animals">
              <img src={SVG['animal']} alt="animal icon" />
            </a>
            <a href="#gh_emoji_food">
              <img src={SVG['food']} alt="food icon" />
            </a>
            <a href="#gh_emoji_travel">
              <img src={SVG['travel']} alt="travel icon" />
            </a>
            <a href="#gh_emoji_activities">
              <img src={SVG['activities']} alt="activities icon" />
            </a>
            <a href="#gh_emoji_objects">
              <img src={SVG['objects']} alt="objects icon" />
            </a>
            <a href="#gh_emoji_symbols">
              <img src={SVG['symbols']} alt="symbols icon" />
            </a>
            <a href="#gh_emoji_flags">
              <img src={SVG['flags']} alt="flags icon" />
            </a>
          </div>

          <div className="gh_emoji_output-wrapper">
            <input
              id="gh_emoji_input_output"
              placeholder="Copied emoji will appear here..."
            />
          </div>
        </div>
      )}
    >
      <span onClick={onClicEmoji}>😋</span>
    </Popover>
  );
};

export default Button;
