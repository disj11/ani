import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <>
      <RedirectHandler />
      <Outlet />
    </>
  );
}

export default App;
