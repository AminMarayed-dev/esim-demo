import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { EsimProfileList } from 'src/sections/customer/view/esim-profile-list';


// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EsimProfileList />
    </>
  );
}
