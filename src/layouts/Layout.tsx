import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router";
import ToolbarActionsSearch from "./ToolbarActionsSearch";

export default function Layout() {
  return (
    <DashboardLayout
      slots={{
        toolbarActions: ToolbarActionsSearch,
      }}
    >
      <PageContainer maxWidth="xl">
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
