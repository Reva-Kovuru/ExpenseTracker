import React from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import RotateRightSharpIcon from '@mui/icons-material/RotateRightSharp';
import SendIcon from '@mui/icons-material/Send';

const CreatePaymentMethodPage = () => {
  
  const [loading, setLoading] = React.useState(false);
  
  const [methodName, setMethodName] = React.useState('');
  const [methodNameError, setMethodNameError] = React.useState(false);
  const [methodNameErrorMessage, setMethodNameErrorMessage] = React.useState('');

  const [methodType, setMethodType] = React.useState('');
  const [methodTypeError, setMethodTypeError] = React.useState(false);
  const [methodTypeErrorMessage, setMethodTypeErrorMessage] = React.useState('');
  
  const [billDay, setBillDay] = React.useState(1);
  const [billDayError, setBillDayError] = React.useState(false);
  const [billDayErrorMessage, setBillDayErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    // const methodName = document.getElementById('methodName');
    // const methodType = document.getElementById('methodType');
    // const billDay = document.getElementById('billDay');

    let isValid = true;

    if(!methodName || methodName.length < 4){
      setMethodNameError(true);
      setMethodNameErrorMessage("Method Name must be at least 4 characters long!");
      isValid = false;
    } else{
      setMethodNameError(false);
      setMethodNameErrorMessage("");
      // setMethodName(methodName.value);
    }

    if(!methodType){
      setMethodTypeError(true);
      setMethodTypeErrorMessage("Method Type must be chosen from one of the options");
      console.log("Error code Reached");
      isValid = false;
    } else{
      setMethodTypeError(false);
      setMethodTypeErrorMessage("");
      // setMethodType(methodType.value);
    }

    if(!billDay || (billDay > 28 || billDay < 1)){
      setBillDayError(true);
      setBillDayErrorMessage("Bill Day Must be between 1 and 28");
      isValid = false;
    } else{
      setBillDayError(false);
      setBillDayErrorMessage("");
      // setBillDay(billDay.value);
    }

    return isValid;
  }

  const handleBillDayChange = (billDayNum) => {
    if(billDayNum < 1 || billDayNum > 29){
      setBillDayError(true);
      setBillDay(1);
    } else{
      setBillDay(billDayNum);
      setBillDayError(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(methodNameError || methodTypeError || billDayError){
        return ;
      }
      setLoading(true);
      await axiosInstance.post('/expenseTracker/add-payment-method', {
        methodName: methodName,
        methodType: methodType,
        billDay : billDay,
      });
      console.log("Payment Method Creation Success!");
      navigate('/paymentmethod-details');
    } catch (error) {
      console.log("---------ERROR ADDING NEW PAYMENT METHOD--------\n",error);
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: '98%',
        margin: '2rem auto',
        colorScheme: 'dark',
        }}
      >
        {/* MethodName */}
        <TextField
          fullWidth
          id='methodName'
          label='Payment Method Name'
          variant="outlined"
          value={methodName}
          onChange={(e) => setMethodName(e.target.value)}
          disabled={loading}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={methodNameError}
          helperText={methodNameErrorMessage}
          color={methodNameError ? 'error' : 'primary'}
          />
        {/* MethodType */}
        <FormControl 
          fullWidth 
          error={methodTypeError} 
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
        >
          <InputLabel id="payment-method-label">Payment Method Type</InputLabel>
          <Select
            labelId="payment-method-label"
            id="methodType"
            value={methodType}
            onChange={(e) => setMethodType(e.target.value)}
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
          </Select>
        </FormControl>

        {/* BillDay */}
        <TextField
          fullWidth
          id='billDay'
          label='Bill Day'
          variant="outlined"
          type='number'
          value={billDay}
          onChange={(e) => handleBillDayChange(e.target.value)}
          disabled={loading}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={billDayError}
          helperText={billDayErrorMessage}
          color={billDayError ? 'error' : 'primary'}
          />
        {/* SUBMIT BUTTON */}
        <Button 
          type="submit"
          variant="contained"
          endIcon={loading ? null : <SendIcon />}
          disabled={loading}
          onClick={validateInputs}
          sx={{
              minWidth: '120px', // Give the button a fixed width
              height: '56px' // Match the TextField height
          }}
        >
        {loading ? <RotateRightSharpIcon size={24} color="inherit" /> : 'Add'}
        </Button>
      </Box>
    </>
  )
}

export default CreatePaymentMethodPage