import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  Routes,
  Route,
  useMatch,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import Chart from "./chart";
import Price from "./price";
import { fetchGeneralInfo, fetchPriceInfo } from "../api";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface StateInterface {
  name: string;
}

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

interface Quotes {
  USD: Usd;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

interface IGeneralInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

interface Links {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
}

interface LinksExtended {
  url: string;
  type: string;
  stats?: Stats;
}

interface Stats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
  followers?: number;
}

interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

interface Team {
  id: string;
  name: string;
  position: string;
}

interface Whitepaper {
  link: string;
  thumbnail: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: generalIsLoading, data: generalData } =
    useQuery<IGeneralInfo>(["general", coinId], () => fetchGeneralInfo(coinId));
  const { isLoading: priceIsLoading, data: priceData } = useQuery<IPriceInfo>(
    ["price", coinId],
    () => fetchPriceInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const state = useLocation().state as StateInterface;
  const isLoading = generalIsLoading || priceIsLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : isLoading
            ? "Loading..."
            : generalData?.name}
        </title>
      </Helmet>

      <Header>
        <Title>
          {state?.name
            ? state.name
            : isLoading
            ? "Loading..."
            : generalData?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{generalData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${generalData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{generalData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
