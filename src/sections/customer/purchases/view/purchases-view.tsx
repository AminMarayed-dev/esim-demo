import { DashboardContent } from 'src/layouts/dashboard';

import { CustomerListServices } from '../customer-list-services';
import { CustomerActivateServices } from '../customer-active-services';

export function PurchasesView() {
  return (
    <DashboardContent maxWidth="xl" >
      <CustomerActivateServices />
      <CustomerListServices/> 
    </DashboardContent>
  );
}


