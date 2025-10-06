import React from 'react'
import axiosInstance from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RotateRightSharpIcon from '@mui/icons-material/RotateRightSharp';
import SendIcon from '@mui/icons-material/Send';

const CreateExpensePage = () => {
  // This page has to get all the paymentMethods for the user and put them as a dropdown for the user to select from there.
  // I am not giving the option to create a new PaymentMethod here.
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = React.useState([]);

  const [amount, setAmount] = React.useState(0);
  const [amountError, setAmountError] = React.useState(false);
  const [amountErrorMessage, setAmountErrorMessage] = React.useState('');

  const [remarks, setRemarks] = React.useState('');
  const [remarksError, setRemarksError] = React.useState(false);
  const [remarksErrorMessage, setRemarksErrorMessage] = React.useState('');

  const [category, setCategory] = React.useState('');
  const [categoryError, setCategoryError] = React.useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = React.useState('');

  const [payMethod, setPayMethod] = React.useState('');
  const [payMethodError, setPayMethodError] = React.useState(false);
  const [payMethodErrorMessage, setPayMethodErrorMessage] = React.useState('');

  const [spendDate, setSpendDate] = React.useState(dayjs());
  const [spendDateError, setSpendDateError] = React.useState(false);
  const [spendDateErrorMessage, setSpendDateErrorMessage] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/expenseTracker/payment-methods');
        console.log(res.data);
        setPaymentMethods(res.data);
        console.log("useEffect Hook[fetchPaymentMethods]: Recieved the Data!");
      } catch (error) {
        console.error("ERROR fetching PaymentMethods");
      } finally{
        setLoading(false);
      }
    };
    fetchPaymentMethods();
  }, []);

  const validateInputs = () => {
    // const amount = document.getElementById('amount');
    // const remarks = document.getElementById('remarks');
    // const category = document.getElementById('category');
    // const payMethod = document.getElementById('payMethod');
    // const spendDate = document.getElementById('spendDate');

    let isValid = true;
    if(!amount || amount < 0){
      setAmountError(true);
      setAmountErrorMessage("Amount Must Be Positive");
      isValid = false;
    } else{
      setAmountError(false);
      setAmountErrorMessage('');
      // setAmount(amount);
    }

    if(!remarks || remarks.length < 4){
      setRemarksError(true);
      setRemarksErrorMessage("Remarks Must Be atleast 4 characters");
      isValid = false;
    } else{
      setRemarksError(false);
      setRemarksErrorMessage('');
      // setRemarks(remarks);
    }

    if(!category || category.length < 4){
      setCategoryError(true);
      setCategoryErrorMessage("Category Must Be atleast 4 characters");
      isValid = false;
    } else{
      setCategoryError(false);
      setCategoryErrorMessage('');
      // setCategory(category);
    }

    if(!payMethod){
      setPayMethodError(true);
      setPayMethodErrorMessage("payMethod Must Be Chosen from the given options");
      isValid = false;
    } else{
      setPayMethodError(false);
      setPayMethodErrorMessage('');
      // setPayMethod(payMethod);
    }

    if(!spendDate || spendDate > dayjs()){
      setSpendDateError(true);
      setSpendDateErrorMessage("spendDate Must Be Chosen from the given Date Picker");
      isValid = false;
    } else{
      setSpendDateError(false);
      setSpendDateErrorMessage('');
      // setSpendDate(spendDate);
    }

    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(amountError || payMethodError || categoryError || remarksError || spendDateError){
        return ;
      }
      setLoading(true);
      await axiosInstance.post('/expenseTracker/add-expense', {
        amount: amount,
        payMethod: payMethod,
        category: category,
        remarks: remarks,
        spendDate: spendDate,
      });
      console.log("Expense Creation Success!");
      navigate('/expense-details');
    } catch (error) {
      console.log("---------ERROR ADDING NEW EXPENSE--------\n",error);
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
        // display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        maxWidth: '98%',
        margin: '2rem auto',
        colorScheme: 'dark',
        }}
      >
        <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        {/* Amount */}
        <TextField
          fullWidth
          id='amount'
          label='Amount'
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={amountError}
          helperText={amountErrorMessage}
          color={amountError ? 'error' : 'primary'}
          />
        {/* Remarks */}
        <TextField
          fullWidth
          label="Remarks/Note"
          variant="outlined"
          id='remarks'
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={loading}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={remarksError}
          helperText={remarksErrorMessage}
          color={remarksError ? 'error' : 'primary'}
          />
        {/* Category */}
        <TextField
          fullWidth
          label="Category"
          variant="outlined"
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={categoryError}
          helperText={categoryErrorMessage}
          color={categoryError ? 'error' : 'primary'}
          />
        {/* PayMethod */}
        <FormControl 
          fullWidth 
          error={payMethodError} 
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
        >
          <InputLabel id="payment-method-label">Payment Method Type</InputLabel>
        <Select
          id='payMethod'
          value={payMethod}
          labelId="payment-method-label"
          label="Payment Method"
          onChange={(e) => setPayMethod(e.target.value)}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          color={payMethodError ? 'error' : 'primary'}
          >
          { paymentMethods.length == 0 && <MenuItem value={null}>No Payment Methods</MenuItem> }
          { paymentMethods.length > 0 &&
            paymentMethods.map(method => (
              <MenuItem value={ method._id }>{ method.methodName }</MenuItem>
            ))
          }
        </Select>
        </FormControl>
        {/* Date-Picker */}
        {/* I didn't understand it that much */}
        <DatePicker
          label="Spent Date"
          id='spendDate'
          value={spendDate}
          onChange={(newDate) => {
            setSpendDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mr: 1, my: 0.5, py: 0.5 }}
          error={spendDateError}
          helperText={spendDateErrorMessage}
          color={spendDateError ? 'error' : 'primary'}
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

export default CreateExpensePage