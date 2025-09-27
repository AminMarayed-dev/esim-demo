import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { _userList } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { schemaHelper } from 'src/components/hook-form/schema-helper';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: 'Avatar is required!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  //   phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  phoneNumber: zod.string().min(1, { message: 'State is required!' }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'Country is required!' }), {
    // message for null value
    message: 'Country is required!',
  }),
  state: zod.string().min(1, { message: 'State is required!' }),
  national_id: zod.string().min(1, { message: 'National ID is required!' }),
});

// ----------------------------------------------------------------------

// type Props = {
//   currentUser?: any;
// };

export function SettingsPersonal() {
  const currentUser = _userList.find((user) => user.id === 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1');
  const router = useRouter();

  const defaultValues: NewUserSchemaType = {
    avatarUrl: null,
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    national_id: '',
  };

  const methods = useForm<any>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    reset,
    // watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  //   const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.customer.dashboard);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Field.UploadAvatar name="avatarUrl" maxSize={3145728} />
            </Box>

            <Typography
              variant="caption"
              sx={{ mt: 2, textAlign: 'center', color: 'text.disabled' }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
            <Box
              sx={{
                flex: 1, // <-- let the fields area grow to fill the card
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="name" label="Full name" disabled />
              <Field.Text name="email" label="Email address" />
              <Field.Text name="national_id" label="National ID" />
              <Field.Phone
                name="phoneNumber"
                label="Phone number"
                // country={!currentUser ? 'DE' : undefined}
              />
              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
              />
              <Field.Text name="state" label="State/region" />
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                save changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
