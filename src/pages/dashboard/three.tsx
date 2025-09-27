import * as React from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import UploadIcon from '@mui/icons-material/Upload';
import SimCardIcon from '@mui/icons-material/SimCard';
import DownloadIcon from '@mui/icons-material/Download';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Stack,
  Button,
  Chip,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UsageView />
    </>
  );
}





// ----------------------------------------------------------------------
// Mock types & data (TODO: replace with your SWR hooks / API)
// ----------------------------------------------------------------------

type UsageRow = {
  date: string; // YYYY-MM-DD
  downloadMB: number;
  uploadMB: number;
  roaming: boolean;
  network: '4G' | '5G';
  country: string;
};

const MOCK_SIMS = ['ESIM-9342', 'ESIM-7771', 'ESIM-4460'];
const todayISO = () => new Date().toISOString().slice(0, 10);

function genMockUsage(days = 30): UsageRow[] {
  const out: UsageRow[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const download = 100 + Math.round(Math.random() * 900); // MB
    const upload = 20 + Math.round(Math.random() * 120);
    const roaming = Math.random() < 0.2;
    const network = Math.random() < 0.6 ? '5G' : '4G';
    const country = roaming ? ['UAE', 'TR', 'DE', 'US'][Math.floor(Math.random() * 4)] : 'IR';
    out.push({
      date: d.toISOString().slice(0, 10),
      downloadMB: download,
      uploadMB: upload,
      roaming,
      network,
      country,
    });
  }
  return out;
}

const MOCK_USAGE = genMockUsage(30);

// ----------------------------------------------------------------------
// Small UI helpers (no external chart libs)
// ----------------------------------------------------------------------

function SectionCard(props: {
  title: string;
  subheader?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  sx?: any;
}) {
  const { title, subheader, action, children, sx } = props;
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={subheader}
        action={action}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
}

// Radial usage gauge (SVG)
function RadialGauge({ value, label }: { value: number; label: string }) {
  const size = 160;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * c;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          stroke="rgba(145,158,171,0.2)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          stroke="url(#grad)"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B944F0" />
            <stop offset="100%" stopColor="#682B9F" />
          </linearGradient>
        </defs>
      </svg>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'absolute', inset: 0 }}
        spacing={0.5}
      >
        <Typography variant="h4">{Math.round(clamped)}%</Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}

// Simple sparkline (area) with SVG
function Sparkline({ data, height = 56 }: { data: number[]; height?: number }) {
  const width = 160;
  const max = Math.max(...data, 1);
  const step = width / (data.length - 1 || 1);
  const points = data.map((v, i) => `${i * step},${height - (v / max) * height}`).join(' ');
  const last = data[data.length - 1] ?? 0;
  const prev = data[data.length - 2] ?? last;
  const up = last >= prev;

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(185,68,240,0.35)" />
          <stop offset="100%" stopColor="rgba(185,68,240,0.02)" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="#B944F0" strokeWidth="2" points={points} />
      <polygon
        fill="url(#area)"
        points={`0,${height} ${points} ${width},${height}`}
      />
      <circle
        cx={(data.length - 1) * step}
        cy={height - (last / max) * height}
        r={3.5}
        fill={up ? '#22C55E' : '#FF5630'}
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Format helpers
function toGB(mb: number) {
  return mb / 1024;
}
function formatData(mb: number, unit: 'MB' | 'GB') {
  return unit === 'GB' ? `${toGB(mb).toFixed(2)} GB` : `${mb.toLocaleString()} MB`;
}

// CSV export
function exportUsageCsv(rows: UsageRow[], filename = 'usage.csv') {
  const header = ['date', 'downloadMB', 'uploadMB', 'totalMB', 'roaming', 'network', 'country'];
  const lines = rows.map((r) =>
    [r.date, r.downloadMB, r.uploadMB, r.downloadMB + r.uploadMB, r.roaming, r.network, r.country].join(',')
  );
  const csv = [header.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ----------------------------------------------------------------------
// View
// ----------------------------------------------------------------------

function UsageView() {
  const navigate = useNavigate();

  // Filters
  const [sim, setSim] = useState(MOCK_SIMS[0]);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [unit, setUnit] = useState<'MB' | 'GB'>('GB');
  const [from, setFrom] = useState(MOCK_USAGE[0].date);
  const [to, setTo] = useState(todayISO());

  // Table state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRpp] = useState(10);

  // Derived data
  const filtered = useMemo(() => {
    const fromD = new Date(from);
    const toD = new Date(to);
    return MOCK_USAGE.filter((r) => {
      const d = new Date(r.date);
      return d >= fromD && d <= toD;
    });
  }, [from, to]);

  const chartSeries = useMemo(
    () => filtered.map((r) => r.downloadMB + r.uploadMB),
    [filtered]
  );

  const totals = useMemo(() => {
    const totalMB = filtered.reduce((acc, r) => acc + r.downloadMB + r.uploadMB, 0);
    const downloadMB = filtered.reduce((acc, r) => acc + r.downloadMB, 0);
    const uploadMB = filtered.reduce((acc, r) => acc + r.uploadMB, 0);
    return { totalMB, downloadMB, uploadMB };
  }, [filtered]);

  // Cycle mock (e.g., 20GB plan, 65% used)
  const planTotalGB = 20;
  const usedGB = toGB(totals.totalMB);
  const usagePct = Math.min(100, Math.round((usedGB / planTotalGB) * 100));

  // Period quick change
  const handlePeriod = (_: any, val: '7d' | '30d' | '90d' | null) => {
    if (!val) return;
    setPeriod(val);
    const days = val === '7d' ? 7 : val === '30d' ? 30 : 90;
    const toD = new Date();
    const fromD = new Date();
    fromD.setDate(toD.getDate() - (days - 1));
    setFrom(fromD.toISOString().slice(0, 10));
    setTo(toD.toISOString().slice(0, 10));
  };

  return (
    <DashboardContent maxWidth="xl">
      <Stack spacing={3}>
        {/* Filters */}
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="sim-label">SIM</InputLabel>
                  <Select
                    labelId="sim-label"
                    label="SIM"
                    value={sim}
                    onChange={(e) => setSim(e.target.value)}
                  >
                    {MOCK_SIMS.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <SimCardIcon fontSize="small" />
                          <span>{s}</span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={period}
                  onChange={handlePeriod}
                >
                  <ToggleButton value="7d">7d</ToggleButton>
                  <ToggleButton value="30d">30d</ToggleButton>
                  <ToggleButton value="90d">90d</ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={unit}
                  onChange={(_, v) => v && setUnit(v)}
                >
                  <ToggleButton value="MB">MB</ToggleButton>
                  <ToggleButton value="GB">GB</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* KPI row */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={4} lg={3}>
            <SectionCard
              title="Plan usage"
              subheader={`${usedGB.toFixed(2)} GB of ${planTotalGB} GB`}
              action={
                <Chip
                  color={usagePct > 85 ? 'warning' : 'success'}
                  label={`${usagePct}%`}
                  size="small"
                />
              }
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <RadialGauge value={usagePct} label="Used" />
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DataUsageIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Total
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatData(totals.totalMB, unit)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DownloadIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Download
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatData(totals.downloadMB, unit)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <UploadIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Upload
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatData(totals.uploadMB, unit)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={8} lg={5}>
            <SectionCard title="Usage trend" subheader="Daily total (MB)">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Last {filtered.length} days
                </Typography>
                <Sparkline data={chartSeries} />
              </Stack>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip size="small" label="Roaming 20%" />
                <Chip size="small" label="5G 60%" />
                <Chip size="small" label="Peak day: ~1.1 GB" />
              </Stack>
            </SectionCard>
          </Grid>

          <Grid item xs={12} lg={4}>
            <SectionCard
              title="Quick actions"
              subheader="Manage your plan"
              action={
                <Tooltip title="Export CSV">
                  <IconButton onClick={() => exportUsageCsv(filtered)}>
                    <FileDownloadIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => navigate('/purchases')}
                >
                  Buy data package
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/billing')}
                >
                  View billing
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  startIcon={<NotificationsActiveIcon />}
                  onClick={() => navigate('/settings')}
                >
                  Set usage alerts
                </Button>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>

        {/* Table */}
        <SectionCard
          title="Usage details"
          subheader="Session/day breakdown"
          action={
            <Button
              size="small"
              startIcon={<FileDownloadIcon />}
              onClick={() => exportUsageCsv(filtered)}
            >
              Export CSV
            </Button>
          }
        >
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Download</TableCell>
                  <TableCell align="right">Upload</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Roaming</TableCell>
                  <TableCell align="center">Network</TableCell>
                  <TableCell align="center">Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => {
                    const total = r.downloadMB + r.uploadMB;
                    return (
                      <TableRow key={r.date} hover>
                        <TableCell>
                          <Typography variant="body2">{r.date}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          {formatData(r.downloadMB, unit)}
                        </TableCell>
                        <TableCell align="right">
                          {formatData(r.uploadMB, unit)}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2">
                            {formatData(total, unit)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            color={r.roaming ? 'warning' : 'default'}
                            label={r.roaming ? 'Yes' : 'No'}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip size="small" label={r.network} />
                        </TableCell>
                        <TableCell align="center">
                          <Chip size="small" variant="outlined" label={r.country} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                setRpp(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </TableContainer>
        </SectionCard>
      </Stack>
    </DashboardContent>
  );
}

