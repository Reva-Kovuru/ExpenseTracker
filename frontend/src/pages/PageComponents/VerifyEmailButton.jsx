import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const VerifyEmailButton = () => {

    const [isLoading, setLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState(false);
    const [apiErrorMessage, setApiErrorMessage] = React.useState('');

    const navigate = useNavigate();

    const handleOTPSend = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/auth/send-VerificationCode');
            // (axiosInstanceBasePath)/auth/verify-emailaccount
            navigate('/verify-email');
        } catch (error) {
            setApiError(true);
            const messageError = error.response?.data?.message || "OTP sending Failed... Try Again";
            setApiErrorMessage(messageError);
            toast.error("Error in Delivering OTP", apiError);
            console.log("Error in Delivering OTP",error, "\n", apiError);
        } finally{
            setLoading(false);
        }
    }

  return (
    <>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleOTPSend}
      >
        {isLoading ? <CircularProgress /> : 'Send OTP to verify E-mail'}
      </Button>
    </>
  )
}

export default VerifyEmailButton