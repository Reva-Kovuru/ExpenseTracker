import React from 'react'
import axiosInstance from '../lib/axios';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import LoadingComponent from './PageComponents/LoadingComponent';
import ExpenseCard from './PageComponents/ExpenseCard';

const ExpensesPage = () => {

  const [expenseDetails, setExpenseDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect( () => {
    const fetchExpenseDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/expenseTracker/expense-details');
        setExpenseDetails(res.data);
        console.log("useEffect Hook[fetchExpenseDetails]: Recieved the Data!");
      } catch (error) {
        console.error("ERROR fetching ExpenseData");
      } finally{
        setLoading(false);
      }
    };
    fetchExpenseDetails();
  }, []);

  return (
    <>
      <center>
        { loading && <LoadingComponent /> }
        { expenseDetails.length == 0 && <div>NO ENTRIES!</div> }
        {
          expenseDetails.length > 0 &&
          <>
            <Stack>
              {expenseDetails.map(expense => (
                // <ExpenseCard
                //   key={expense._id}
                //   amount={expense.amount}
                //   paymentMethod={expense.paymentMethod._id}
                //   paymentMethodName={expense.paymentMethod.name}
                //   category={expense.category}
                //   remarks={expense.remarks}
                //   spendDate={expense.spendDate}
                // />
                <ExpenseCard key={expense._id} expense={expense} />
              ))}
            </Stack>
          </>
        }
        <Link to={'/create-expense-details'}>
          <Button>Add a new Expense</Button>
        </Link>
      </center>
    </>
  )
}

export default ExpensesPage