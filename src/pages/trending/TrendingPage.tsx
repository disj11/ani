import { useTrendingQuery } from "./apis/trending.api";
import useTrendSearchParamState from "./stores/trendSearchParamState";

const TrendingPage = () => {
  const { searchParams } = useTrendSearchParamState();
  const { loading, data } = useTrendingQuery(searchParams);

  console.log(loading);
  console.log(data);

  return "Trending Page";
};

export default TrendingPage;
