// src/sections/settings/settings-profile.tsx
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Card,
  Stack,
  Dialog,
  Button,
  CardHeader,
  IconButton,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import {  Field } from 'src/components/hook-form';

type EditTarget = 'email' | 'password' | null;

const LS_KEY = 'esim.settings.profile';
const FALLBACK_EMAIL = 'aminmarayed4@gmail.com';
const FALLBACK_PASSWORD = 'Amin@334';

export function SettingsProfile() {
  const { getValues, setValue } = useFormContext();

  const [open, setOpen] = React.useState<EditTarget>(null);
  const [tmp, setTmp] = React.useState(''); // modal primary input (email or new password)
  const [tmpConfirm, setTmpConfirm] = React.useState(''); // confirm password (blank)
  const [showPwd, setShowPwd] = React.useState(true); // show password text in modal



  // Read saved values ONCE
  const initialSaved = (() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as {
        email?: string;
        password?: string;
      };
    } catch {
      return {};
    }
  })();
  const savedRef = React.useRef<{ email?: string; password?: string }>(initialSaved);

  // Ensure RHF has defaults so the display fields show values immediately
  const didInit = React.useRef(false);
  React.useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const curEmail = getValues('email');
    const curPass = getValues('password');

    if (!curEmail) {
      setValue('email', savedRef.current.email ?? FALLBACK_EMAIL, { shouldDirty: false });
    }
    if (!curPass) {
      setValue('password', savedRef.current.password ?? FALLBACK_PASSWORD, { shouldDirty: false });
    }
  }, [getValues, setValue]);

  const persist = (patch: Partial<{ email: string; password: string }>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      const next = { ...cur, ...patch };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      savedRef.current = next;
    } catch {
      /* empty */
    }
  };

  // OPEN modal:
  // - Email: prefill with current/saved
  // - Password: BOTH fields start EMPTY (no default value)
  const handleOpen = (target: Exclude<EditTarget, null>) => {
    if (target === 'email') {
      const current = getValues('email');
      const fallback = savedRef.current.email ?? FALLBACK_EMAIL;
      setTmp(current && String(current).length ? String(current) : fallback);
    } else {
      setTmp(''); // New Password EMPTY
      setTmpConfirm(''); // Confirm Password EMPTY
    }
    setShowPwd(true);
    setOpen(target);
  };

  const handleClose = () => {
    setOpen(null);
    setTmp('');
    setTmpConfirm('');
    setShowPwd(true);
  };

  const handleUpdate = () => {
    if (!open) return;

    if (open === 'email') {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmp);
      if (!ok) {
        alert('Please enter a valid email address.');
        return;
      }
    }

    if (open === 'password') {
      if (tmp.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      if (tmp !== tmpConfirm) {
        alert('Passwords do not match.');
        return;
      }
    }

    setValue(open, tmp, { shouldDirty: true, shouldValidate: true });
    persist({ [open]: tmp } as any);
    handleClose();
  };

  return (
    <>
      <Card>
        <CardHeader title="Edit Profile" />
        <CardContent>
          <Stack spacing={2.5}>
            {/* EMAIL (read-only; has default via RHF) */}
            <Field.Text
              name="email"
              label="Email"
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleOpen('email')} edge="end">
                        <Iconify icon="eva:edit-fill" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* PASSWORD (read-only; masked; default via RHF) */}
            <Field.Text
              name="password"
              label="Password"
              type="password"
              slotProps={{
                input: {
                  readOnly: true,
                  placeholder: '••••••••',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleOpen('password')} edge="end">
                        <Iconify icon="eva:edit-fill" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open !== null} onClose={handleClose} fullWidth maxWidth="sm" keepMounted>
        <DialogTitle>
          {open === 'email' ? 'Edit Email' : open === 'password' ? 'Edit Password' : ''}
        </DialogTitle>

        <DialogContent>
          {open === 'email' ? (
            <MuiTextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={tmp}
              onChange={(e) => setTmp(e.target.value)}
            />
          ) : open === 'password' ? (
            <Stack spacing={2}>
              {/* New Password — EMPTY, visible by default */}
              <MuiTextField
                autoFocus
                margin="dense"
                label="New Password"
                type={showPwd ? 'text' : 'password'}
                fullWidth
                value={tmp}
                onChange={(e) => setTmp(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPwd((s) => !s)}
                        aria-label="toggle password visibility"
                      >
                        <Iconify icon={showPwd ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* Confirm Password — EMPTY */}
              <MuiTextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                value={tmpConfirm}
                onChange={(e) => setTmpConfirm(e.target.value)}
              />
            </Stack>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
