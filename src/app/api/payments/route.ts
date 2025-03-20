import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/database'
import Payment from '@/models/Payment'
import { writeFile } from 'fs/promises'
import path from 'path'

// POST request to create a payment
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

		let screenshotPath = null

		if (file) {
			// Generate a unique filename
			const fileName = `${Date.now()}-${file.name}`
			const filePath = path.join(
				process.cwd(),
				'public/uploads',
				fileName
			)

			// Read the file content
			const fileBuffer = Buffer.from(await file.arrayBuffer())

			// Write the file to the uploads folder
			await writeFile(filePath, fileBuffer)

			// Set the screenshot path to be saved in the database
			screenshotPath = `/uploads/${fileName}`
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
			screenshot: screenshotPath
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

		// Fetch all payments from the database
		const payments = await Payment.find()

		// Return the payments in the response
		return NextResponse.json(payments)
	} catch (error: any) {
		console.error('Error fetching payments:', error)
		return NextResponse.json(
			{ message: 'Error fetching payments', error: error.message },
			{ status: 500 }
		)
	}
}
