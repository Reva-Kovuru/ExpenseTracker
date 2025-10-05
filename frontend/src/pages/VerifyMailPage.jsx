import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const VerifyMailPage = () => {

    const [isLoading, setLoading] = React.useState(false);
    const [verificationOTP, setVerificationOTP] = React.useState(0);
    const [apiError, setApiError] = React.useState(false);
    const [OTPError, setOTPError] = React.useState(false);
    const [apiErrorMessage, setApiErrorMessage] = React.useState('');

    const navigate = useNavigate();

    const validateInputs = async () => {
        const verificationCode = document.getElementById('verificationCode');
        let isValid = !verificationCode.value ? false : true;
        if(isValid){
            setVerificationOTP(verificationCode.value);
            setOTPError(false);
        } else{
            setOTPError(true);
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setApiError(false);
        if(OTPError){
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.post('/auth/verify-emailaccount',{
                codevalue:verificationOTP
            });
            toast.success("E-mail Verified! Thank You");
            navigate('/dashboard');
        } catch (error) {
            setApiError(true);
            const messageError = error.response?.data?.message || "Verification Failed... Try Again";
            setApiErrorMessage(messageError);
            toast.error("Error in Verification", apiErrorMessage);
            console.log("Error in Verification",error, "\n", apiErrorMessage);
        } finally{
            setLoading(false);
        }

    }

  return (
    <>
        <p>We have sent an OTP to the registered E-mail ID. Please <b>do not</b> leave this page before verification completes</p>
        <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
        }}
        >
        <FormControl>
            <FormLabel htmlFor="verificationCode">OTP</FormLabel>
            <TextField
            id='verificationCode'
            type='text'
            name='verificationCode'
            placeholder="OTP Here please"
            required
            />
        </FormControl>
        <Button
        type="submit"
        disabled={isLoading}
        fullWidth
        variant="contained"
        onClick={validateInputs}
        >
            {isLoading ? <CircularProgress /> : 'Log In'}
        </Button>
        </Box>
    </>
  )
}

export default VerifyMailPage