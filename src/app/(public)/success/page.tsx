'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
	const router = useRouter()
	const [countdown, setCountdown] = useState(15) // 15 seconds timer

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					clearInterval(timer)
					router.push('/') // Redirect when countdown reaches 0
				}
				return prev - 1
			})
		}, 1000)

		// Cleanup on unmount
		return () => clearInterval(timer)
	}, [router])

	return (
		<section className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='text-center p-6 bg-white shadow-lg rounded-lg max-w-md'>
				<h1 className='text-2xl font-bold mb-4 text-red-600'>
					Payment Pending!
				</h1>
				<p className='text-lg text-gray-600'>
					Your payment has been processed. Thank you for our service.
				</p>
				<div className='mt-4 text-3xl font-semibold text-red-500'>
					{countdown}
				</div>
				<Link
					href='/'
					className='mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded-md'
				>
					Go to Home Now
				</Link>
			</div>
		</section>
	)
}
