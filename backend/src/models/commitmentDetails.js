import mongoose from "mongoose";

const CommitmentDetailsSchema = new mongoose.Schema(
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

const CommitmentDetails = mongoose.models.commitmentDetails || mongoose.model('commitmentDetails', CommitmentDetailsSchema);

export default CommitmentDetails;
