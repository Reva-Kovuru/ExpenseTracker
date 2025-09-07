import mongoose from "mongoose";

const ExpenseDetailsSchema = new mongoose.Schema(
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
        paymentMethod: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
            required: true,
        },
        spendDate: {
            type: Date,
            required: true,
            default: Date.now,
        }
    }
)

const ExpenseDetails = mongoose.models.expenseDetails || mongoose.model('expenseDetails', ExpenseDetailsSchema);

export default ExpenseDetails;
