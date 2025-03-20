import mongoose from 'mongoose'

const connectToDatabase = async () => {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected to MongoDB')
		return
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI as string)
		console.log('MongoDB connected')
	} catch (error) {
		console.error('MongoDB connection error:', error)
		process.exit(1)
	}
}

export default connectToDatabase
