import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import type { Navigation } from "@toolpad/core";
import logo from "/logo.svg";

const NAVIGATIOHN: Navigation = [
  {
    kind: "header",
    title: "Anilist",
  },
  {
    segment: "trending",
    title: "Trending",
  },
  {
    segment: "animations",
    title: "Animations",
  },
];

const Logo = <img src={logo} alt="logo" />;

const BRANDING = {
  title: "Anilist",
  logo: Logo,
};

function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATIOHN} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;
