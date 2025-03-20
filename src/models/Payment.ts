import mongoose, { Schema, Document } from 'mongoose'

interface IPayment extends Document {
	username: string
	emailOrPhone: string
	paymentNumber: string
	amount: number
	transactionId: string
	dateTime: string
	confirmed: boolean
	bettingSite: string
	paymentMethod: string
}

const PaymentSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		emailOrPhone: { type: String, required: true },
		paymentNumber: { type: String, required: true },
		amount: { type: Number, required: true },
		transactionId: { type: String, required: true },
		dateTime: { type: String, required: true },
		confirmed: { type: Boolean, required: true },
		bettingSite: { type: String, required: true },
		paymentMethod: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const Payment =
	mongoose.models.Payment ||
	mongoose.model<IPayment>('Payment', PaymentSchema)

export default Payment
