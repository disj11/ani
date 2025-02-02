import { useQuery } from "@apollo/client";
import { TREND } from "../../../commons/queries";
import { TrendResponse, TrendSearchParams } from "../types/home.type";

export const useTrendQuery = (searchParams: TrendSearchParams) => {
  return useQuery<TrendResponse>(TREND, {
    variables: searchParams,
  });
};
