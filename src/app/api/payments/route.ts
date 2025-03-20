import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/database'
import Payment from '@/models/Payment'

// POST request to create a payment
export async function POST(req: Request) {
	try {
		const data = await req.json()

		// Destructure data to validate
		const {
			username,
			emailOrPhone,
			paymentNumber,
			amount,
			transactionId,
			dateTime,
			confirmed,
			bettingSite,
			paymentMethod
		} = data

		// Connect to MongoDB
		await connectToDatabase()

		// Create and save new payment
		const newPayment = new Payment({
			username,
			emailOrPhone,
			paymentNumber,
			amount,
			transactionId,
			dateTime,
			confirmed,
			bettingSite,
			paymentMethod
		})

		await newPayment.save()

		return NextResponse.json(
			{ message: 'Payment successfully created', data: newPayment },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating payment', error },
			{ status: 500 }
		)
	}
}

// GET request to fetch all payments
export async function GET() {
	try {
		// Connect to MongoDB
		await connectToDatabase()

		// Fetch all payments
		const payments = await Payment.find()
		return NextResponse.json(payments)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching payments', error },
			{ status: 500 }
		)
	}
}
