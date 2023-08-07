import React, { useState } from 'react';
import { decodeHtmlEntity } from '@utils/index';
import { Popover } from 'react-tiny-popover';
import { SVG } from './SVGs';
import { emojisDirectories } from '../modules/emojies';
const Button = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClick = () => {
    const textField: any = document.getElementById('new_comment_field');
    if (textField) {
      textField.value += decodeHtmlEntity('&#x1F604;');
    }
  };

  const onClicEmoji = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'left']} // if you'd like, you can limit the positions
      padding={10} // adjust padding here!
      reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
      onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
      content={(
        { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
      ) => (
        <div className="gh_emoji_container">
          {/** Input **/}
          <div className="gh_emoji_input-wrapper">
            <img
              className="gh_emoji_search_icon"
              src={SVG['search']}
              alt="search icon"
            />
            <input id="gh_emoji_input_search" placeholder="Search emoji..." />
          </div>
          {/** Input **/}
          <div className="gh_emoji_directory-wrapper">
            {/* <p className="gh_emoji_loading">
              <img src={SVG['spin']} alt="spin icon" />
            </p> */}

            {emojisDirectories.map((section) => {
              return (
                <>
                  <p className="title" id={`gh_emoji_${section.link}`}>
                    <span>{section.title}</span>
                  </p>
                  <div className="emojis">
                    {section.emojis?.map((item) => {
                      return <button>{item.value}</button>;
                    })}
                  </div>
                </>
              );
            })}
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

  // return <span onClick={handleClick}>😋</span>;
};

export default Button;

const styles = {
  popoverContainer: {},
};
