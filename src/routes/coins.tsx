import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Coins = () => {
  return <Title>Coins</Title>;
};

export default Coins;
