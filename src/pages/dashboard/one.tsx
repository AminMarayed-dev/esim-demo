import * as React from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Box,
  Grid,
  Card,
  Chip,
  Stack,
  Button,
  Divider,
  Typography,
  CardHeader,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewView />
    </>
  );
}






// ---------------------------------------------
// Mock data (TODO: replace with SWR/API hooks)
// ---------------------------------------------
type Purchase = { id: string; title: string; date: string; amount: number; status: 'paid' | 'pending' };
type Bill = { id: string; date: string; total: number; status: 'paid' | 'unpaid' | 'refunded' };

const MOCK_CREDIT = 100.0;
const MOCK_ACTIVE_SERVICES = [
  { id: 'ESIM-9342', carrier: 'Dariya Cell', country: 'UAE', status: 'active' },
  { id: 'ESIM-7771', carrier: 'Dariya Cell', country: 'TR', status: 'active' },
];

const MOCK_PURCHASES: Purchase[] = [
  { id: 'PO-1043', title: 'eSIM Middle East Pack', date: '2025-09-24', amount: 19.9, status: 'paid' },
  { id: 'PO-1042', title: 'Top-up 5GB', date: '2025-09-22', amount: 7.5, status: 'paid' },
  { id: 'PO-1041', title: 'eSIM Turkey 7d', date: '2025-09-20', amount: 12.0, status: 'pending' },
];

const MOCK_BILLS: Bill[] = [
  { id: 'INV-3021', date: '2025-09-24', total: 19.9, status: 'paid' },
  { id: 'INV-3018', date: '2025-09-22', total: 7.5, status: 'paid' },
  { id: 'INV-3012', date: '2025-09-20', total: 12.0, status: 'unpaid' },
];

// ---------------------------------------------
// Reusable UI bits
// ---------------------------------------------
function SectionCard(props: {
  title: string;
  subheader?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  const { title, subheader, actionLabel, onAction, children } = props;
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={subheader}
        action={
          actionLabel ? (
            <Button size="small" endIcon={<ArrowForwardIosIcon fontSize="small" />} onClick={onAction}>
              {actionLabel}
            </Button>
          ) : null
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
}

function StatCard(props: { icon: React.ReactNode; label: string; value: string; cta?: React.ReactNode }) {
  const { icon, label, value, cta } = props;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.900' : 'grey.100'),
              display: 'inline-flex',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" noWrap>
              {label}
            </Typography>
            <Typography variant="h5" noWrap>
              {value}
            </Typography>
          </Box>
          {cta}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------
// Overview View
// ---------------------------------------------
function OverviewView() {
  const navigate = useNavigate();

  // TODO: swap with real profile completeness calc
  const profileProgress = 70;

  return (
    <DashboardContent maxWidth="xl">
      <Stack spacing={3}>
        {/* Top KPIs */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AccountBalanceWalletIcon />}
              label="Account Credit"
              value={`$${MOCK_CREDIT.toFixed(2)}`}
              cta={
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/billing')}
                >
                  Add credit
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<SimCardDownloadIcon />}
              label="Active Services"
              value={`${MOCK_ACTIVE_SERVICES.length} active`}
              cta={
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate('/purchases')}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Manage
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<SettingsIcon />}
              label="Profile Completeness"
              value={`${profileProgress}%`}
              cta={
                <IconButton onClick={() => navigate('/settings')} aria-label="settings">
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              }
            />
          </Grid>
        </Grid>

        {/* Middle: Active Services & Quick Actions */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={8}>
            <SectionCard
              title="Active Services"
              subheader="Your currently active eSIMs"
              actionLabel="View all"
              onAction={() => navigate('/purchases')}
            >
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {MOCK_ACTIVE_SERVICES.map((s) => (
                  <Chip
                    key={s.id}
                    color="success"
                    icon={<CheckCircleIcon />}
                    label={`${s.id} • ${s.country} • ${s.carrier}`}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <SectionCard title="Quick Actions">
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SimCardDownloadIcon />}
                  onClick={() => navigate('/purchases')}
                >
                  Buy eSIM / Package
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ReceiptLongIcon />}
                  onClick={() => navigate('/billing')}
                >
                  Go to Billing
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  startIcon={<SettingsIcon />}
                  onClick={() => navigate('/settings')}
                >
                  Profile & Settings
                </Button>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>

        {/* Bottom: Recent Purchases, Recent Bills, Profile */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <SectionCard
              title="Recent Purchases"
              subheader="Last 3 orders"
              actionLabel="All purchases"
              onAction={() => navigate('/purchases')}
            >
              <List dense disablePadding>
                {MOCK_PURCHASES.map((p) => (
                  <ListItem
                    key={p.id}
                    secondaryAction={
                      <Typography variant="body2" color="text.secondary">
                        ${p.amount.toFixed(2)}
                      </Typography>
                    }
                    sx={{ px: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <SimCardDownloadIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2">{p.title}</Typography>
                          <Chip
                            size="small"
                            label={p.status}
                            color={p.status === 'paid' ? 'success' : 'warning'}
                            variant="soft" // if you use MUI Joy; otherwise remove
                          />
                        </Stack>
                      }
                      secondary={`${p.id} • ${p.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionCard
              title="Recent Bills"
              subheader="Latest invoices"
              actionLabel="All billing"
              onAction={() => navigate('/billing')}
            >
              <List dense disablePadding>
                {MOCK_BILLS.map((b) => (
                  <ListItem
                    key={b.id}
                    secondaryAction={
                      <Typography variant="body2" color="text.secondary">
                        ${b.total.toFixed(2)}
                      </Typography>
                    }
                    sx={{ px: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ReceiptLongIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2">{b.id}</Typography>
                          <Chip
                            size="small"
                            label={b.status}
                            color={
                              b.status === 'paid'
                                ? 'success'
                                : b.status === 'unpaid'
                                ? 'warning'
                                : 'default'
                            }
                          />
                        </Stack>
                      }
                      secondary={b.date}
                    />
                  </ListItem>
                ))}
              </List>
            </SectionCard>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title={<Typography variant="h6">Profile Progress</Typography>} />
              <CardContent>
                <Stack spacing={1.5}>
                  <LinearProgress variant="determinate" value={profileProgress} />
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip label="Email verified" color="success" icon={<CheckCircleIcon />} />
                    <Chip label="Phone verified" color="success" icon={<CheckCircleIcon />} />
                    <Chip label="Billing method" color="warning" />
                    <Chip label="Address" color="warning" />
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => navigate('/settings')}
                    >
                      Complete profile
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </DashboardContent>
  );
}

// ---------------------------------------------
// Notes:
// - TODO: جایگزین کردن MOCK_* با useSWR و هوک‌های API خودت
// - اگر خواستی مستقیماً از کامپوننت‌های موجودت استفاده کنی:
//   * CreditSummaryCard رو می‌تونی به‌جای StatCard اول بذاری.
//   * بخش‌های BillingList / CustomerActivateServices / CustomerListServices
//     رو می‌تونی داخل SectionCard بیاری و با maxHeight/overflow مخفی کنی.
// ---------------------------------------------

