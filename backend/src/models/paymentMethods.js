import mongoose from "mongoose";

const PaymentMethodsSchema = new mongoose.Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'userAuth', 
            required: true,
            index: true, 
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        tenureInMonths: {
            type: Number,
            required: true,
            default: 12, 
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
)

const PaymentMethods = mongoose.models.paymentMethods || mongoose.model('paymentMethods', PaymentMethodsSchema);

export default PaymentMethods;
