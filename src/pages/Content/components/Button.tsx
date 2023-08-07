import React from 'react';
import { decodeHtmlEntity } from '@utils/index';
const Button = () => {
  const handleClick = () => {
    const textField: any = document.getElementById('new_comment_field');
    if (textField) {
      textField.value += decodeHtmlEntity('&#x1F604;');
    }
  };

  return <span onClick={handleClick}>😋</span>;
};

export default Button;
