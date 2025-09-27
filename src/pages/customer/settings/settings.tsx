import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SettingsView } from 'src/sections/customer/settings/view/settings-view';




// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SettingsView />
    </>
  );
}
