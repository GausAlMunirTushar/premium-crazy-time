import '@/styles/globals.scss'

export const metadata = {
	title: 'Premium Crazy Time',
	description: ''
}

interface LayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<html>
			<body>{children}</body>
		</html>
	)
}
