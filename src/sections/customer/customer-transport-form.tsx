import * as React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingButton from '@mui/lab/LoadingButton';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Grid,
  Card,
  List,
  Chip,
  Stack,
  Dialog,
  Button,
  Avatar,
  Divider,
  Checkbox,
  Typography,
  CardHeader,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';

import { CONFIG } from 'src/global-config';

import { Form } from 'src/components/hook-form';

type OperatorTier = 'internal' | 'external';
type Operator = { id: string; name: string; tier: OperatorTier; logo?: string };

const OPERATORS: Operator[] = [
  // domestic/internal
  {
    id: 'mci',
    name: 'MCI',
    tier: 'internal',
    logo: `${CONFIG.assetsDir}/assets/operators/mci.svg`,
  },
  {
    id: 'mtn',
    name: 'MTN',
    tier: 'internal',
    logo: `${CONFIG.assetsDir}/assets/operators/mtn.svg`,
  },
  {
    id: 'rtl',
    name: 'RTL',
    tier: 'internal',
    logo: `${CONFIG.assetsDir}/assets/operators/rtl.svg`,
  },
  // foreign/external
  {
    id: 'vodafone',
    name: 'Vodafone',
    tier: 'external',
    logo: `${CONFIG.assetsDir}/assets/operators/vodafone.svg`,
  },
  {
    id: 'tmobile',
    name: 'T-Mobile',
    tier: 'external',
    logo: `${CONFIG.assetsDir}/assets/operators/tmobile.svg`,
  },
  {
    id: 'att',
    name: 'AT&T',
    tier: 'external',
    logo: `${CONFIG.assetsDir}/assets/operators/att.svg`,
  },
  {
    id: 'telefonica',
    name: 'Telefónica',
    tier: 'external',
    logo: `${CONFIG.assetsDir}/assets/operators/telefonica.svg`,
  },
];

const TransportSchema = zod.object({
  operatorIds: zod.array(zod.string()).min(1, { message: 'Pick at least one operator' }),
});
type TransportFormValues = zod.infer<typeof TransportSchema>;

export type CustomerTransportFormProps = {
  open: boolean;
  onClose: () => void;
  currentUser?: any;
  onRequest?: (operators: Operator[]) => void;
};

export default function CustomerTransportForm({
  open,
  onClose,
  currentUser,
  onRequest,
}: CustomerTransportFormProps) {
  const [query, setQuery] = React.useState('');

  const methods = useForm<TransportFormValues>({
    mode: 'all',
    resolver: zodResolver(TransportSchema),
    defaultValues: { operatorIds: [] },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const selectedIds = watch('operatorIds');
  const selectedSet = new Set(selectedIds);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedSet);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    next.has(id) ? next.delete(id) : next.add(id);
    setValue('operatorIds', Array.from(next), { shouldValidate: true, shouldDirty: true });
  };

  const filteredByTier = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? OPERATORS.filter((o) => o.name.toLowerCase().includes(q)) : OPERATORS;
    return {
      internal: base.filter((o) => o.tier === 'internal'),
      external: base.filter((o) => o.tier === 'external'),
    };
  }, [query]);

  const selectedOps = React.useMemo(
    () => OPERATORS.filter((o) => selectedSet.has(o.id)),
    [selectedIds]
  );

  const onSubmit = handleSubmit((data) => {
    const ops = OPERATORS.filter((o) => data.operatorIds.includes(o.id));
    onRequest?.(ops);
    onClose();
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
        <Typography variant="h4" fontWeight={800}>
          Request transport
        </Typography>
      </DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          {/* Search */}
          {/* <TextField
            fullWidth
            size="small"
            placeholder="Search operators"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          /> */}

          {/* Selected summary */}
          <Stack spacing={1} sx={{ mt: 2 }}>
            {selectedOps.length > 0 && (
              <Stack direction="row" useFlexGap flexWrap="wrap" gap={1}>
                {selectedOps.map((op) => (
                  <Chip
                    key={op.id}
                    label={op.name}
                    onDelete={() => toggleSelect(op.id)}
                    avatar={op.logo ? <Avatar src={op.logo} alt={`${op.name} logo`} /> : undefined}
                  />
                ))}
              </Stack>
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Two groups: Domestic/Internal & Foreign/External */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle1" fontWeight={700}>
                      Domestic (Internal)
                    </Typography>
                  }
                  subheader={`${filteredByTier.internal.length} operators`}
                />
                <List disablePadding>
                  {filteredByTier.internal.map((op, idx) => {
                    const checked = selectedSet.has(op.id);
                    return (
                      <ListItemButton
                        key={op.id}
                        onClick={() => toggleSelect(op.id)}
                        sx={{
                          py: 1.25,
                          borderTop: idx === 0 ? 'none' : '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            sx={{ width: 40, height: 40, bgcolor: 'background.paper' }}
                            src={op.logo}
                            alt={`${op.name} logo`}
                          >
                            {op.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography fontWeight={600}>{op.name}</Typography>}
                          secondary={<Typography variant="caption">Internal operator</Typography>}
                        />
                        <Checkbox edge="end" checked={checked} />
                      </ListItemButton>
                    );
                  })}
                  {filteredByTier.internal.length === 0 && (
                    <Box sx={{ p: 2, pt: 0, color: 'text.secondary' }}>No results</Box>
                  )}
                </List>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle1" fontWeight={700}>
                      Foreign (External)
                    </Typography>
                  }
                  subheader={`${filteredByTier.external.length} operators`}
                />
                <List disablePadding>
                  {filteredByTier.external.map((op, idx) => {
                    const checked = selectedSet.has(op.id);
                    return (
                      <ListItemButton
                        key={op.id}
                        onClick={() => toggleSelect(op.id)}
                        sx={{
                          py: 1.25,
                          borderTop: idx === 0 ? 'none' : '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            sx={{ width: 40, height: 40, bgcolor: 'background.paper' }}
                            src={op.logo}
                            alt={`${op.name} logo`}
                          >
                            {op.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography fontWeight={600}>{op.name}</Typography>}
                          secondary={<Typography variant="caption">External operator</Typography>}
                        />
                        <Checkbox edge="end" checked={checked} />
                      </ListItemButton>
                    );
                  })}
                  {filteredByTier.external.length === 0 && (
                    <Box sx={{ p: 2, pt: 0, color: 'text.secondary' }}>No results</Box>
                  )}
                </List>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={selectedIds.length === 0}
          >
            Request transport
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
