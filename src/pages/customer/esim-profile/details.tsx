import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { EsimProfileDetails } from 'src/sections/customer/view/esim-profile-details';

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EsimProfileDetails />
    </>
  );
}
