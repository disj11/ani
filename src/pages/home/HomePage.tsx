import Layout from "../../Layout";
import { useTrendQuery } from "./apis/trends.api";
import useTrendSearchParamState from "./stores/trendSearchParamState";

const HomePage = () => {
  const { searchParams } = useTrendSearchParamState();
  const { loading, data } = useTrendQuery(searchParams);

  console.log(loading);
  console.log(data);

  return <Layout>list...</Layout>;
};

export default HomePage;
