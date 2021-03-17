import React from 'react';
import {StyledButton} from './style';

export const Button = ({name, clickEvent, type, className}) => {
    return <StyledButton className={className} htmlType={type} onClick={clickEvent} type="primary">{name}</StyledButton>;
  };