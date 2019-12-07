import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  display: ${props => (props.newGame ? 'none' : 'initial')};
  font-size: 26px;
  max-width: 200px;
  margin: 0;
  padding-right: 40px;
`;

const GameOver = props => <Text {...props}>{props.text}</Text>;

export default GameOver;