import React from 'react'
import axiosInstance from '../lib/axios';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import PaymentMethodCard from './PageComponents/PaymentMethodCard';
import LoadingComponent from './PageComponents/LoadingComponent';

const PaymentMethodsPage = () => {

  const [paymentMethodDetails, setPaymentMethodDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect( () => {
    const fetchPaymentMethodDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/expenseTracker/payment-methods');
        setPaymentMethodDetails(res.data);
        console.log("useEffect Hook[fetchPaymentMethodDetails]: Recieved the Data!");
      } catch (error) {
        console.error("ERROR fetching PaymentMethodDetails");
      } finally{
        setLoading(false);
      }
    };
    fetchPaymentMethodDetails();
  }, []);

  return (
    <>
      <center>
        { loading && <LoadingComponent /> }
        { paymentMethodDetails.length == 0 && <div>NO ENTRIES!</div> }
        {
          paymentMethodDetails.length > 0 &&
          <>
            <Stack>
              {paymentMethodDetails.map(payMethod => (
                // <ExpenseCard
                //   key={expense._id}
                //   amount={expense.amount}
                //   paymentMethod={expense.paymentMethod._id}
                //   paymentMethodName={expense.paymentMethod.name}
                //   category={expense.category}
                //   remarks={expense.remarks}
                //   spendDate={expense.spendDate}
                // />
                <PaymentMethodCard key={payMethod._id} payMethod={payMethod}  />
              ))}
            </Stack>
          </>
        }
        <Link to={'/create-paymentmethod-details'}>
          <Button>Add a new Payment Method</Button>
        </Link>
      </center>
    </>
  )
}

export default PaymentMethodsPage