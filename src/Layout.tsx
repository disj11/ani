import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import * as React from "react";
import logo from "/logo.svg";

interface LayoutProps {
  children: React.ReactNode;
}

const Logo = <img src={logo} alt="logo" />;
export default function Layout({ children }: LayoutProps) {
  return (
    <AppProvider
      branding={{
        logo: Logo,
        title: "Anilist",
      }}
    >
      <DashboardLayout hideNavigation>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
