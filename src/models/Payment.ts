import mongoose, { Schema, Document } from 'mongoose'

interface IPayment extends Document {
	username: string
	emailOrPhone: string
	paymentNumber: string
	amount: number
	transactionId: string
	dateTime: Date // Change to Date type
	confirmed: boolean
	bettingSite: string
	paymentMethod: string
	screenshot?: string // Optional field for the screenshot path
}

const PaymentSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		emailOrPhone: { type: String, required: true },
		paymentNumber: { type: String, required: true },
		amount: { type: Number, required: true },
		transactionId: { type: String, required: true },
		dateTime: { type: Date, required: true }, // Changed to Date type
		confirmed: { type: Boolean, required: true },
		bettingSite: { type: String, required: true },
		paymentMethod: { type: String, required: true },
		screenshot: { type: Buffer } // Optional field for the screenshot path
	},
	{
		timestamps: true
	}
)

const Payment =
	mongoose.models.Payment ||
	mongoose.model<IPayment>('Payment', PaymentSchema)

export default Payment
