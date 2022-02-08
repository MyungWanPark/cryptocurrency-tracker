import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ICoin {
  coinId?: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ICoin) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  return (
    <>
      {
        <ApexChart
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              background: "transparent",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
          }}
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          type="line"
        />
      }
    </>
  );
};

export default Chart;
