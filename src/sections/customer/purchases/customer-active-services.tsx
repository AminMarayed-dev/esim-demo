import * as React from 'react';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Divider,
  useTheme,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

type Plan = {
  id: string;
  amount: string; // e.g., "12 GB", "1,000 SMS", "500 min"
  expiry: string; // e.g., "30 days"
  priceUsd: number; // e.g., 2.99
  active?: boolean;
  recommended?: boolean;
};

type Service = {
  key: 'internet' | 'sms' | 'conversation';
  title: string;
  icon: string;
  progress: number; // 0..100 just for the donut UI
  plan: Plan;
};

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

// ---------- MOCK DATA (replace with API later)
const SERVICES: Service[] = [
  {
    key: 'internet',
    title: 'Internet',
    icon: 'solar:wifi-bold',
    progress: 72,
    plan: { id: 'net-12', amount: '12 GB', expiry: '14 days', priceUsd: 2.99, recommended: true },
  },
  {
    key: 'sms',
    title: 'SMS/MMS',
    icon: 'mdi:message-text',
    progress: 40,
    plan: { id: 'sms-1k', amount: '1,000 SMS', expiry: '30 days', priceUsd: 1.49 },
  },
  {
    key: 'conversation',
    title: 'Conversation',
    icon: 'mdi:phone',
    progress: 58,
    plan: { id: 'call-500', amount: '500 min', expiry: '30 days', priceUsd: 2.99, active: true },
  },
];

function LegendRow({ dotColor, label, value }: { dotColor: string; label: string; value: string }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: dotColor }} />
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}

function Donut({
  value,
  centerTop,
  centerBottom,
}: {
  value: number;
  centerTop: string;
  centerBottom: string;
}) {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', width: 168, height: 168 }}>
      {/* track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={168}
        thickness={5}
        sx={{
          color: theme.palette.action.disabledBackground,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
      {/* progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={168}
        thickness={5}
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
        }}
      />
      {/* center text */}
      <Stack
        sx={{ position: 'absolute', inset: 0 }}
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
      >
        <Typography variant="caption" color="text.secondary">
          {centerTop}
        </Typography>
        <Typography variant="h6">{centerBottom}</Typography>
      </Stack>
    </Box>
  );
}

function ServiceCard({ s }: { s: Service }) {
  const [autoRenew, setAutoRenew] = React.useState(false);

  return (
    <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={<Iconify icon={s.icon} width={28} height={28} />}
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{s.title}</Typography>
            {/* {s.plan.recommended && <Chip color="primary" size="small" label="Recommended" />} */}
            {/* {s.plan.active && <Chip color="success" size="small" label="Active" />} */}
          </Stack>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 2 }}>
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Donut value={s.progress} centerTop="Plan" centerBottom={s.plan.amount} />

          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <LegendRow dotColor="#22c55e" label="Amount" value={s.plan.amount} />
            <LegendRow dotColor="#9ca3af" label="Expiry" value={s.plan.expiry} />
            <LegendRow dotColor="#3b82f6" label="Price" value={usd(s.plan.priceUsd)} />
          </Stack>
        </Stack>
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />

      <CardActions sx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}>
        <Button size="medium" variant="contained">
          Renew
        </Button>
      </CardActions>
    </Card>
  );
}

export function CustomerActivateServices() {
  return (
    <Stack spacing={2.5}>
      <Typography variant="h5">Activate Services</Typography>

      {/* three in a row on desktop */}
      <Grid container spacing={2}>
        {SERVICES.map((s) => (
          <Grid key={s.key} item xs={12} sm={6} md={4}>
            <ServiceCard s={s} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
