import { useMemo } from 'react';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

type CreditSummaryCardProps = { credit: number };

export function CreditSummaryCard({ credit }: CreditSummaryCardProps) {
  const formatter = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    []
  );

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography variant="overline" sx={{ opacity: 0.72 }}>
            Credit
          </Typography>
          <Typography variant="h3">{formatter.format(credit)}</Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() => {
            console.log('Increase credit');
          }}
        >
          Increase credit
        </Button>
      </Stack>
    </Card>
  );
}
