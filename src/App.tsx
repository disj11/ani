import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import { navigation } from "./routers/navigation";
import LogoIcon from "./commons/components/LogoIcon";

const branding = {
  title: "Anilist",
  logo: LogoIcon,
};

function App() {
  return (
    <ReactRouterAppProvider navigation={navigation} branding={branding}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;
