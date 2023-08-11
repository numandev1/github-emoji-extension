import React, { useState, useEffect } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import { SVG } from './SVGs';
import { emojisDirectories } from '../modules/emojies';
import {
  getRecentsEmojis,
  getRecentsEmojisLisner,
  setRecentEmojis,
} from '../storage/index';
import useDebouncedCallback from '../modules/useDebouncedCallback';
import { insertAtCursor } from '../modules/helper';
const Button = ({ textArea }: { textArea: Element }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentsEmojis, setRecentsEmojis] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [emojisDirectoriesState, setEmojisDirectoriesState] =
    useState(emojisDirectories);

  const getRecentEmojiHandler = () => {
    getRecentsEmojisLisner((result: any[]) => {
      if (result.length > 0) {
        setRecentsEmojis(result);
      }
    });
    getRecentsEmojis()
      .then((result: any[]) => {
        if (result.length > 0) {
          setRecentsEmojis(result);
        }
      })
      .catch((error) => {
        console.log('error=>', error);
      });
  };

  useEffect(() => {
    isPopoverOpen && setEmojisDirectoriesState(emojisDirectories);
    isPopoverOpen && getRecentEmojiHandler();
  }, [isPopoverOpen]);

  useEffect(() => {
    const handleUserKeyPress = (e: KeyboardEvent) => {
      //@ts-ignore
      var evtobj = window.event ? window.event : e;
      //@ts-ignore
      if (evtobj.ctrlKey || (evtobj.metaKey && evtobj.keyCode === 191))
        setIsPopoverOpen(!isPopoverOpen);
    };

    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [isPopoverOpen]);

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

  const onSelectEmojiHandler = (emoji) => {
    const textField: any = textArea;
    if (textField) {
      insertAtCursor(textField, emoji.value);
      setRecentEmojis(emoji);
    }
  };

  const onClicEmoji = () => {
    isPopoverOpen && textArea?.focus();
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'left']} //
      containerClassName="popover-container"
      padding={10}
      reposition={false}
      onClickOutside={() => {
        setIsPopoverOpen(false);
        textArea?.focus();
      }}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'#DDD'}
          arrowSize={10}
          arrowStyle={{ opacity: 0.7 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
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

            {/** emojies **/}
            <div className="gh_emoji_directory-wrapper">
              {emojisDirectoriesState.length === 0 ? (
                <p>No emoji found.</p>
              ) : (
                <>
                  {!searchTerm && recentsEmojis?.length > 0 && (
                    <>
                      <p className="title" id={`gh_emoji_recents`}>
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
                        <p className="title" id={`gh_emoji_${section.link}`}>
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

            {/* <div className="gh_emoji_output-wrapper">
           <h1>nomi</h1>
          </div> */}
          </div>
        </ArrowContainer>
      )}
    >
      <span onClick={onClicEmoji}>
        {recentsEmojis?.length > 0 ? recentsEmojis[0].value : '😋'}
      </span>
    </Popover>
  );
};

export default Button;
