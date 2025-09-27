import type { TFunction } from 'i18next';
import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

// export const navData: NavSectionProps['data'] = [
//   /**
//    * Overview
//    */
//   {
//     subheader: 'Overview',
//     items: [
//       {
//         title: 'One',
//         path: paths.customer.dashboard,
//         icon: ICONS.dashboard,
//         info: <Label>v{CONFIG.appVersion}</Label>,
//       },
//       { title: 'Two', path: paths.customer.esim, icon: ICONS.ecommerce },
//       { title: 'Three', path: paths.customer.profile, icon: ICONS.analytics },
//     ],
//   },
// ];


export function navDataFunc(t: TFunction<any, any>): NavSectionProps['data'] {
  return [
    {
      subheader: t('overview'),
      items: [
        {
          title: t('dashboard'),
          path: paths.customer.dashboard,
          icon: ICONS.dashboard,
        },
        {
          title: t('esimProfiles'),
          path: paths.customer.esim.root,
          icon: ICONS.ecommerce,
        },
        {
          title: t('purchases'),
          path: paths.customer.purchases,
          icon: ICONS.order,
        },
        {
          title: t('usage'),
          path: paths.customer.usage,
          icon: ICONS.analytics,
        },
        // {
        //   title: t('packages'),
        //   path: paths.customer.packages,
        //   icon: ICONS.product,
        // },
        {
          title: t('billing'),
          path: paths.customer.billing,
          icon: ICONS.invoice,
        },
        {
          title: t('settings'),
          path: paths.customer.settings,
          icon: ICONS.parameter,
        },
      ],
    },
  ];
}

