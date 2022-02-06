import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface StateInterface {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [generalInfo, setGeneralInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  const state = useLocation().state as StateInterface;
  useEffect(() => {
    (async () => {
      const generalInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setGeneralInfo(generalInfo);
      setPriceInfo(priceInfo);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
