'use client'

import { useState } from 'react'
import Image from 'next/image'

const paymentMethods = [
	{
		id: 'bkash',
		name: 'bKash',
		color: 'bg-pink-500',
		logo: '/images/bkash.svg',
		number: '01709480483434',
		qr: '/images/bkash-qr.jpeg'
	},
	{
		id: 'nagad',
		name: 'Nagad',
		color: 'bg-red-500',
		logo: '/images/nagad.svg',
		number: '017XXXXXXXX',
		qr: '/images/nagad-qr.png'
	},
	{
		id: 'rocket',
		name: 'Rocket',
		color: 'bg-purple-400',
		logo: '/images/rocket.svg',
		number: '017XXXXXXXX',
		qr: '/images/rocket-qr.png'
	}
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

	const [formData, setFormData] = useState({
		username: '',
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

	const handleSubmit = () => {
		if (
			!selectedSite ||
			!formData.username ||
			!formData.paymentNumber ||
			!formData.amount ||
			!formData.transactionId ||
			!formData.dateTime ||
			!formData.confirmed
		) {
			alert('Please fill all fields and confirm the information.')
			return
		}
		alert(
			`Payment submitted for ${selectedSite} using ${selectedTab.name}!`
		)
	}

	return (
		<section className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
			<div className='max-w-xl w-full bg-white shadow-lg rounded-lg p-6'>
				{/* Tabs */}
				<h1 className='text-center text-2xl mb-2'>
					Select Payment Method
				</h1>
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
				<div className='bg-gray-100 p-4 rounded-md mb-4 text-center'>
					<h2 className='font-semibold'>Send Payment To:</h2>
					<p className='text-lg font-bold'>{selectedTab.number}</p>
					<Image
						src={selectedTab.qr}
						alt={`${selectedTab.name} QR Code`}
						width={150}
						height={150}
						className='mx-auto mt-2'
					/>
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
						<label className='block font-medium'>Username</label>
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
							Payment Number
						</label>
						<input
							type='text'
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
						<input
							type='number'
							name='amount'
							placeholder='Enter Amount'
							value={formData.amount}
							onChange={handleChange}
							className='w-full p-2 border rounded-md'
						/>
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
