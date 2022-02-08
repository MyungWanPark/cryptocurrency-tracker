import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ICoin {
  coinId?: string;
}

const Chart = ({ coinId }: ICoin) => {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>chart</h1>;
};

export default Chart;
