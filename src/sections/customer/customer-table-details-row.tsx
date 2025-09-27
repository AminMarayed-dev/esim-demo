// import type { IUserItem } from 'src/types/user';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import CustomerTransportForm from './customer-transport-form';
import { CustomerActivateForm } from './customer-activate-form';


// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  editHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
  detailsHref: string;
};

export function CustomerTableDetailsRow({ row, selected, editHref, onSelectRow, onDeleteRow, detailsHref }: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const customerView = useBoolean();
  const customerTransport = useBoolean();

  const renderCustomerViewForm = () => (
    <CustomerActivateForm currentUser={row} open={customerView.value} onClose={customerView.onFalse} />
  );


const renderCustomerTransportForm = () => (
  <CustomerTransportForm
    currentUser={row}
    open={customerTransport.value}
    onClose={customerTransport.onFalse}
    onRequest={(op) => {
      // TODO: call API to request transport with `op`
      // console.info('Selected operator:', op);
    }}
  />
);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={row.name}
              src={row.avatarUrl}
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'background.neutral',
              }}
              imgProps={{
                style: {
                  objectFit: 'contain',
                  objectPosition: 'center',
                  transform: 'scale(0.9)',
                },
              }}
            />
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box
                component="span"
                // href={editHref}
                color="inherit"
                // sx={{ cursor: 'pointer' }}
              >
                IRAN
              </Box>
            </Stack>
          </Box>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'banned' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell>
          <Switch defaultChecked size="small" />
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={customerView.onTrue}
              startIcon={<Iconify icon="solar:check-circle-bold" />} // optional
              sx={{ minWidth: 108 }}
            >
              Activate
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={customerTransport.onTrue}
              startIcon={<Iconify icon="solar:truck-bold" />} // optional
              sx={{ minWidth: 108 }}
            >
              Transport
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      {renderCustomerViewForm()}
      {renderCustomerTransportForm()}
      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
