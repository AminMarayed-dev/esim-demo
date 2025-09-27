import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { BillingView } from 'src/sections/customer/billing/view/billing-view';




// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BillingView/>
    </>
  );
}
