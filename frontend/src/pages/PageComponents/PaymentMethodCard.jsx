import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const PaymentMethodCard = ( {payMethod} ) => {
  return (
    <Card sx={{ minWidth:275, py: 1, my: 1 }}>
      <CardContent>
        <CurrencyRupeeIcon />
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
          {payMethod.methodName}
        </Typography>
        <br />
        <Typography>
          {payMethod.methodType}
        </Typography>
        <br />
        <Typography>
          {payMethod.billDay}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PaymentMethodCard