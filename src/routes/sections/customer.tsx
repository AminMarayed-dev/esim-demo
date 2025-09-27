import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));


const EsimProfilePage = lazy(() => import('src/pages/customer/esim-profile/list'));
const EsimProfileDetailsPage = lazy(() => import('src/pages/customer/esim-profile/details'));
const PurphasesPage = lazy(() => import('src/pages/customer/purchases/purchases'));
const BillingPage = lazy(() => import('src/pages/customer/billing/billing'));
const SettingsPage = lazy(() => import('src/pages/customer/settings/settings'))
// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const customerLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const customerRoutes: RouteObject[] = [
  {
    path: 'customer',
    element: CONFIG.auth.skip ? customerLayout() : <AuthGuard>{customerLayout()}</AuthGuard>,
    children: [
      { element: <IndexPage />, path: 'dashboard' },
      {
        path: 'esim-profile',
        children: [
          { index: true, element: <EsimProfilePage /> },

          { path: ':id', element: <EsimProfileDetailsPage/> },
        ],
      },
      { path: 'purchases', element: <PurphasesPage /> },
      { path: 'usage', element: <PageThree /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
];
