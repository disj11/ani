import { Routes, Route } from "react-router";
import HomePage from "../pages/home";

const PageRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
};

export default PageRouter;
