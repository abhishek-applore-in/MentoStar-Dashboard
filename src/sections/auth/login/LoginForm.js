import * as Yup from 'yup';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../../../contexts/AuthContext';
import { auth } from "../../../firebase-config";


// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';


// ----------------------------------------------------------------------

export default function LoginForm() {
  
  const navigate = useNavigate();

  const { dispatch} = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const LoginSchema = Yup.object().shape({
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };
  

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {

    console.log(email, password)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
     const user = userCredential.user;
     dispatch({type: "LOGIN", payload:  user})
     if(user?.accessToken) {
        localStorage.setItem('token', JSON.stringify(user?.accessToken))
     }
     console.log(user);
    navigate('/dashboard/app', { replace: true });
    // ...
    })
  .catch((error) => {
    setError(true);
    });

   };

   

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address"value={email}
          onChange={(e) => setEmail(e.target.value)}     
        />
        <RHFTextField
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
