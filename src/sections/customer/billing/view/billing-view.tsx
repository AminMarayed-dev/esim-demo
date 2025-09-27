import { Stack } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { BillingList } from '../billing-list';
import { CreditSummaryCard } from '../billing-credit';

export function BillingView() {
  return (
    <DashboardContent>
      <Stack spacing={2.5}>
        <CreditSummaryCard credit={100.0} />
        <BillingList />
      </Stack>
    </DashboardContent>
  );
}
