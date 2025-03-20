'use client'

import { useEffect, useState } from 'react'

type Payment = {
	_id: string
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

export default function PaymentsPage() {
	const [payments, setPayments] = useState<Payment[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const response = await fetch('/api/payments')
				if (!response.ok) {
					throw new Error('Failed to fetch payments')
				}
				const data = await response.json()
				setPayments(data)
			} catch (error) {
				console.error('Error fetching payments:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchPayments()
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-2xl'>Loading...</div>
			</div>
		)
	}

	return (
		<section className='min-h-screen p-4'>
			<div className='overflow-x-auto bg-white shadow-lg rounded-lg'>
				<table className='min-w-full table-auto'>
					<thead>
						<tr className='bg-primary text-white'>
							<th className='p-3 text-left'>User ID</th>
							<th className='p-3 text-left'>Email/Phone</th>
							<th className='p-3 text-left'>Payment Number</th>
							<th className='p-3 text-left'>Amount</th>
							<th className='p-3 text-left'>Transaction ID</th>
							<th className='p-3 text-left'>Date & Time</th>
							<th className='p-3 text-left'>Confirmed</th>
							<th className='p-3 text-left'>Betting Site</th>
							<th className='p-3 text-left'>Payment Method</th>
						</tr>
					</thead>
					<tbody>
						{payments.map(payment => (
							<tr key={payment._id} className='border-b'>
								<td className='p-3'>{payment.username}</td>
								<td className='p-3'>{payment.emailOrPhone}</td>
								<td className='p-3'>{payment.paymentNumber}</td>
								<td className='p-3'>{payment.amount}</td>
								<td className='p-3'>{payment.transactionId}</td>
								<td className='p-3'>
									{new Date(
										payment.dateTime
									).toLocaleString()}
								</td>
								<td className='p-3'>
									{payment.confirmed ? (
										<span className='text-green-500'>
											Confirmed
										</span>
									) : (
										<span className='text-red-500'>
											Not Confirmed
										</span>
									)}
								</td>
								<td className='p-3'>{payment.bettingSite}</td>
								<td className='p-3'>{payment.paymentMethod}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
