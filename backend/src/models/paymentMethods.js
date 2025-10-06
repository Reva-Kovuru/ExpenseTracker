import mongoose, {Schema} from "mongoose";

const PaymentMethodsSchema = new mongoose.Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'userAuth', 
            required: true,
            index: true, 
        },
        methodName: {
            type: String,
            required: true,
        },
        methodType: {
            type: String,
            enum: ['Cash', 'Debit Card', 'Credit Card'],
            required: true,
        },
        billDay: {
            type: Number,
            min: 1,
            max: 28,
            required: true,
            default: 1,
        }
    }
)

const PaymentMethods = mongoose.models.paymentMethods || mongoose.model('paymentMethods', PaymentMethodsSchema);

export default PaymentMethods;
