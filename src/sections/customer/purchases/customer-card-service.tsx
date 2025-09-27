import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

export function CustomerCardService({ service, sx, ...other }: any) {
  return (
    <Card sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h3" textAlign="center">
              {service.name}
            </Typography>
          </Stack>
        }
        sx={{ pb: 0 }}
      />

      <CardContent>
        <Typography variant="body2" mb={4}>
          {service.description}
        </Typography>
        <Stack display="flex" direction="column">
          <Typography variant='h4'>{`$${service.price}/${service.unit}`}</Typography>
          <Box component="span">per line</Box>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ px: 1, py: 1.5, justifyContent: 'center', width:'100%' }}>
        <Button size="medium" variant="contained" sx={{width:'20%'}}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
