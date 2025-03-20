import Image from 'next/image'
import Link from 'next/link'

export default function SuccessPage() {
	return (
		<section className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='text-center p-6 bg-white shadow-lg rounded-lg max-w-md'>
				<h1 className='text-2xl font-bold mb-4'>Payment Successful!</h1>
				<p className='text-lg text-gray-600'>
					Your payment has been successfully processed. Thank you for
					using our service!
				</p>
				<Link
					href={'/'}
					className='mt-8 p-2 bg-green-500 text-white rounded-md'
				>
					Go Back to Home
				</Link>
			</div>
		</section>
	)
}
