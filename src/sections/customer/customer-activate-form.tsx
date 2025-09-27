// import type { IUserItem } from 'src/types/user';

import { z as zod } from 'zod';
import QRCode from 'react-qr-code';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import { Stack, Typography } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// import { USER_STATUS_OPTIONS } from 'src/_mock';
// import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>;

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),

  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  // Not required
  status: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentUser?: any;
};

export function CustomerActivateForm({ currentUser, open, onClose }: Props) {
  const defaultValues: UserQuickEditSchemaType = {
    name: '',
    email: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    status: '',
    company: '',
    role: '',
  };

  const methods = useForm<UserQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      //   toast.promise(promise, {
      //     loading: 'Loading...',
      //     success: 'Update success!',
      //     error: 'Update error!',
      //   });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
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
          Dariya Cell
        </Typography>
      </DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Box
            sx={{
              p: 2,
              mb: 3,
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Activation code
            </Typography>

            <Box
              sx={{
                width: 200,
                minWidth: 200,
                bgcolor: 'background.paper',
                p: 1,
                borderRadius: 2,
              }}
            >
              <QRCode
                value={currentUser?.activationCode ?? 'ACTIVATION-CODE'}
                size={160}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>

            <Typography variant="body2" color="text.secondary" align="center">
              Scan this code in the mobile app to activate.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
