import { useQuery } from "@apollo/client";
import { TREND } from "../../../commons/queries";
import { TrendingResponse, TrendingSearchParams } from "../types/trending.type";

export const useTrendingQuery = (searchParams: TrendingSearchParams) => {
  return useQuery<TrendingResponse>(TREND, {
    variables: searchParams,
  });
};
