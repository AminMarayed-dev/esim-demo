import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Tab, Tabs, Stack } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';

import { SettingsProfile } from '../settings-profile';
import { SettingsPersonal } from '../settings-personal';


const TABS = [
  { value: 'profile', label: 'Profile Settings' },
  { value: 'personal', label: 'Personal Settings' },
];

export function SettingsView() {
  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


    const SignInSchema = zod.object({
      email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
      password: zod
        .string()
        .min(1, { message: 'Password is required!' })
        .min(6, { message: 'Password must be at least 6 characters!' }),
    });

    const methods = useForm<any>({
      resolver: zodResolver(SignInSchema),
    });

  const renderTabs = () => (
    <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mb: { xs: 3, md: 5 } }}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          //   icon={
          //     <Label
          //       variant={((tab === 'all' || tab === state.publish) && 'filled') || 'soft'}
          //       color={(tab === 'published' && 'info') || 'default'}
          //     >
          //       {tab === 'all' && posts.length}
          //       {tab === 'published' && posts.filter((post) => post.publish === 'published').length}
          //       {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
          //     </Label>
          //   }
          sx={{ textTransform: 'capitalize' }}
        />
      ))}
    </Tabs>
  );

  const renderSettings = () =>
    currentTab === 'profile' ? (
      <Form methods={methods} onSubmit={undefined}>
        <SettingsProfile />
      </Form>
    ) : (
      <SettingsPersonal />
    );
  return (
    <DashboardContent>
      <Stack spacing={3}>
        {renderTabs()}
        {renderSettings()}
      </Stack>
    </DashboardContent>
  );
}
