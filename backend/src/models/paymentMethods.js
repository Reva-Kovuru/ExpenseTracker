import mongoose from "mongoose";

const PaymentMethodsSchema = new mongoose.Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'userAuth', 
            required: true,
            index: true, 
        },
        paymentMethod: {
            type: String,
            required: true,
        },
    }
)

const PaymentMethods = mongoose.models.paymentMethods || mongoose.model('paymentMethods', PaymentMethodsSchema);

export default PaymentMethods;
