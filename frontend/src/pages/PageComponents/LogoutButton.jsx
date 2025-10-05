import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axiosInstance from '../../lib/axios';

const LogoutButton = (props) => {
    const [isLoading, setLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState("");
    const [apiErrorMessage, setApiErrorMessage] = React.useState("");

    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            await axiosInstance.patch('/auth/logout');
            navigate('/');
        } catch(error){
            setApiError(true);
            const errorMessage = error.response?.data?.message || "Login Failed, Try again";
            setApiErrorMessage(errorMessage);
            toast.error("Error in Logout");
            console.log("Error in Logout",errorMessage,"\n",error);
        } finally{
            setLoading(false);
        }
    }


  return (
    <>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleLogout}
      >
        {isLoading ? <CircularProgress /> : 'LogOut'}
      </Button>
    </>
  )
}

export default LogoutButton