import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PurchasesView } from 'src/sections/customer/purchases/view/purchases-view';



// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PurchasesView />
    </>
  );
}
