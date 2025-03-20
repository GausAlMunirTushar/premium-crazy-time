import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/database'
import Payment from '@/models/Payment'

export async function POST(req: NextRequest) {
	try {
		// Connect to the database
		await connectToDatabase()

		// Read form data
		const formData = await req.formData()

		// Extract fields
		const username = formData.get('username') as string
		const emailOrPhone = formData.get('emailOrPhone') as string
		const paymentNumber = formData.get('paymentNumber') as string
		const amount = formData.get('amount') as string
		const transactionId = formData.get('transactionId') as string
		const dateTime = formData.get('dateTime') as string
		const confirmed = formData.get('confirmed') as string
		const bettingSite = formData.get('bettingSite') as string
		const paymentMethod = formData.get('paymentMethod') as string
		const file = formData.get('screenshot') as File | null

		let screenshotBuffer = null

		if (file) {
			// Convert the file to a Buffer
			screenshotBuffer = Buffer.from(await file.arrayBuffer())
		}

		// Create a new payment object
		const newPayment = new Payment({
			username,
			emailOrPhone,
			paymentNumber,
			amount,
			transactionId,
			dateTime,
			confirmed,
			bettingSite,
			paymentMethod,
			screenshot: screenshotBuffer // Store as binary data
		})

		// Save the payment to the database
		await newPayment.save()

		// Return a success response
		return NextResponse.json(
			{ message: 'Payment successfully created', data: newPayment },
			{ status: 201 }
		)
	} catch (error: any) {
		console.error('Error creating payment:', error)
		return NextResponse.json(
			{ message: 'Error creating payment', error: error.message },
			{ status: 500 }
		)
	}
}

// GET request to fetch all payments
export async function GET() {
	try {
		// Connect to the database
		await connectToDatabase()

		// Fetch all payments
		const payments = await Payment.find()

		// Convert Buffer data to Base64 for frontend display
		const processedPayments = payments.map(payment => ({
			...payment.toObject(),
			screenshot: payment.screenshot
				? `data:image/png;base64,${payment.screenshot.toString('base64')}`
				: null
		}))

		// Return the payments in the response
		return NextResponse.json(processedPayments)
	} catch (error: any) {
		console.error('Error fetching payments:', error)
		return NextResponse.json(
			{ message: 'Error fetching payments', error: error.message },
			{ status: 500 }
		)
	}
}
