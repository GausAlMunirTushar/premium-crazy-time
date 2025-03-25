'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ClipboardCopy } from 'lucide-react'

const paymentMethods = [
	{
		id: 'bkash',
		name: 'bKash',
		color: 'bg-pink-500',
		logo: '/images/bkash.svg',
		number: '01976401306',
		qr: '/images/bkash-qr.jpeg'
	},
	{
		id: 'nagad',
		name: 'Nagad',
		color: 'bg-red-500',
		logo: '/images/nagad.svg',
		number: '01976401306',
		qr: '/images/nagad-qr.png'
	}
	// {
	// 	id: 'rocket',
	// 	name: 'Rocket',
	// 	color: 'bg-purple-400',
	// 	logo: '/images/rocket.svg',
	// 	number: '017XXXXXXXX',
	// 	qr: '/images/rocket-qr.png'
	// }
]

const bettingSites = [
	'Bet365',
	'1xBet',
	'Betway',
	'22Bet',
	'Melbet',
	'Parimatch',
	'Dafabet',
	'Fun88',
	'Mostbet',
	'1win',
	'Zeetbuzz',
	'Linebet',
	'Crickex',
	'Nagad88',
	'Krikya',
	'Betvisa',
	'Jaya9',
	'Betwinner',
	'Megapari',
	'Babu88',
	'Bajilive',
	'MCW',
	'Glorycasino',
	'Marvelbet',
	`more........( 27+ site's)`
]

export default function PaymentComponent() {
	const [selectedTab, setSelectedTab] = useState(paymentMethods[0])
	const [selectedSite, setSelectedSite] = useState('')
	const router = useRouter()
	const [formData, setFormData] = useState({
		username: '',
		emailOrPhone: '',
		paymentNumber: '',
		amount: '',
		transactionId: '',
		dateTime: '',
		confirmed: false
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target

		setFormData(prev => ({
			...prev,
			[name]:
				type === 'checkbox'
					? (e.target as HTMLInputElement).checked
					: value
		}))
	}
	const [file, setFile] = useState<File | null>(null) // State to store file

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (
			!selectedSite ||
			!formData.username ||
			!formData.emailOrPhone ||
			!formData.paymentNumber ||
			!formData.amount ||
			!formData.transactionId ||
			!formData.dateTime ||
			!formData.confirmed ||
			!file
		) {
			toast.error('Please fill all fields and confirm the information.')
			return
		}

		const paymentData = {
			username: formData.username,
			emailOrPhone: formData.emailOrPhone,
			paymentNumber: formData.paymentNumber,
			amount: formData.amount,
			transactionId: formData.transactionId,
			dateTime: formData.dateTime,
			confirmed: formData.confirmed ? 'true' : 'false', // Convert boolean to string
			bettingSite: selectedSite,
			paymentMethod: selectedTab.name
		}

		// Create a FormData object
		const formDataToSend = new FormData()
		Object.keys(paymentData).forEach(key => {
			const value = paymentData[key as keyof typeof paymentData]
			// Convert values to string (for booleans and other types) before appending to FormData
			formDataToSend.append(key, value.toString())
		})
		formDataToSend.append('screenshot', file) // Add the screenshot file

		try {
			const response = await fetch('/api/payments', {
				method: 'POST',
				body: formDataToSend // Send FormData, not JSON
			})

			if (!response.ok) {
				throw new Error('Failed to submit payment.')
			}

			const result = await response.json()
			toast.success(result.message)
			router.push('/success')

			// Reset form
			setFormData({
				username: '',
				emailOrPhone: '',
				paymentNumber: '',
				amount: '',
				transactionId: '',
				dateTime: '',
				confirmed: false
			})
			setSelectedSite('')
			setSelectedTab(paymentMethods[0]) // Reset payment method
			setFile(null) // Reset file
		} catch (error: string | any) {
			toast.error(`Error: ${error.message}`)
		}
	}
	const handleCopyNumber = (number: string) => {
		navigator.clipboard
			.writeText(number)
			.then(() => {
				toast.success('Payment number copied to clipboard!')
			})
			.catch(() => {
				toast.error('Failed to copy payment number.')
			})
	}
	return (
		<section className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
			<div className='max-w-xl w-full bg-white shadow-lg rounded-lg p-6'>
				{/* Tabs */}
				<h1 className='text-center text-2xl '>Select Payment Method</h1>
				<p className='text-center mb-2'>(Send Money)</p>
				<div className='flex justify-center space-x-4 mb-6'>
					{paymentMethods.map(method => (
						<button
							key={method.id}
							className={`flex flex-col items-center p-2 rounded-lg ${
								selectedTab.id === method.id
									? method.color
									: 'bg-gray-300'
							}`}
							onClick={() => setSelectedTab(method)}
						>
							<Image
								src={method.logo}
								alt={method.name}
								width={90}
								height={90}
							/>
							<span className='text-white'>{method.name}</span>
						</button>
					))}
				</div>

				{/* Payment Info */}
				<div className='bg-green-100 p-4 rounded-md mb-4 text-center'>
					<h2 className='font-semibold'>Send Money To:</h2>
					<p
						className='text-lg font-bold cursor-pointer'
						onClick={() => handleCopyNumber(selectedTab.number)}
					>
						{selectedTab.number}
					</p>

					{/* <Image
						src={selectedTab.qr}
						alt={`${selectedTab.name} QR Code`}
						width={150}
						height={150}
						className='mx-auto mt-2'
					/> */}
				</div>

				{/* Form */}
				<form className='space-y-4'>
					{/* Select Betting Site */}
					<div className='mb-4'>
						<label className='block font-medium'>
							আপনার বেটিং সাইট সিলেক্ট করুন
						</label>
						<select
							name='bettingSite'
							value={selectedSite}
							onChange={e => setSelectedSite(e.target.value)}
							className='w-full p-2 border rounded-md'
						>
							<option value=''>-- Select a site --</option>
							{bettingSites.map((site, index) => (
								<option key={index} value={site}>
									{site}
								</option>
							))}
						</select>
					</div>

					{/* Username */}
					<div>
						<label className='block font-medium'>
							{' '}
							Betting User ID
						</label>
						<input
							type='text'
							name='username'
							placeholder='Enter your username'
							value={formData.username}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div>
						<label className='block font-medium'>
							Email/Phone Number
						</label>
						<input
							type='text'
							name='emailOrPhone'
							placeholder='Enter your email or phone number'
							value={formData.emailOrPhone}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div>
						<label className='block font-medium'>
							Payment Number
						</label>
						<p className='text-sm my-1 text-green-600 '>
							যে নাম্বার থেকে টাকা পাঠিয়েছেন, সেটি এখানে লিখুন
						</p>

						<input
							type='number'
							name='paymentNumber'
							placeholder='Enter Payment Number'
							value={formData.paymentNumber}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>

					<div>
						<label className='block font-medium'>
							Deposit Amount
						</label>
						<p className='text-sm my-1 text-green-600 '>
							Min Deposit BDT 1000.00 to Max Deposit BDT 30000.00
						</p>
						<input
							type='number'
							name='amount'
							placeholder='Enter Amount'
							value={formData.amount}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
						<p className='text-sm my-1 text-red-400 '>
							৩০০০ টাকা ডিপোজিট করলে ৬০০০ টাকা বোনাস ৭০০০ টাকা
							ডিপোজিট করলে ১০০০০ টাকা বোনাস  (Turn Over) নেই
						</p>
					</div>

					<div>
						<label className='block font-medium'>
							Transaction ID
						</label>
						<input
							type='text'
							name='transactionId'
							placeholder='Enter Transaction ID'
							value={formData.transactionId}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>

					<div>
						<label className='block font-medium'>
							Transaction Date & Time
						</label>
						<input
							type='datetime-local'
							name='dateTime'
							value={formData.dateTime}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div>
						<label className='block font-medium'>
							Payment Screenshot
						</label>
						<input
							type='file'
							name='screenshot'
							accept='image/*'
							onChange={handleFileChange}
							className='w-full p-2 border rounded-md'
						/>
					</div>

					<div className='flex items-center space-x-2'>
						<input
							type='checkbox'
							name='confirmed'
							checked={formData.confirmed}
							onChange={handleChange}
							className='w-4 h-4'
						/>
						<label>All provided information is correct</label>
					</div>

					<button
						onClick={handleSubmit}
						className='w-full p-2 bg-green-500 text-white rounded-md'
					>
						Deposit Now
					</button>
				</form>
			</div>
		</section>
	)
}
