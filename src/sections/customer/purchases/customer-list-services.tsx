import type { ServiceCategory } from 'src/_mock/_service';

import { useState, useCallback } from 'react';

import { Box, Tab, Tabs, Stack, Typography } from '@mui/material';

import { _services } from 'src/_mock/_service';

import { CustomerCardService } from './customer-card-service';

const TABS = [
  { value: 'internet', label: 'Internet' },
  { value: 'sms', label: 'SMS/MMS' },
  { value: 'conversation', label: 'Conversation' },
  { value: 'hybrid', label: 'Hybrid' },
];

export function CustomerListServices() {
  const [currentTab, setCurrentTab] = useState('internet');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

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
  const renderList = () => {
    const categoryMap: Record<string, ServiceCategory> = {
      internet: 'Internet',
      sms: 'SMS/MMS',
      conversation: 'Conversation',
      hybrid: 'Hybrid',
    };

    const selectedCategory = categoryMap[currentTab];

    const filteredServices = _services.filter((service) => service.category === selectedCategory);

    return (
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {filteredServices.map((service, index) => (
          <CustomerCardService service={service} key={index} />
        ))}
      </Box>
    );
  };
  return (
    <Stack mt={6} spacing={2.5}>
      <Typography variant='h5'>List Of Services</Typography>
      {renderTabs()}
      {renderList()}
    </Stack>
  );
}
