import axios from 'axios'
import { ApiRequestConfig } from '@/types/configs'
import { LOCAL_STORAGE_KEYS } from '@/configs/constants'

const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL


if (!API_BASE_URL) {
	throw new Error('API_BASE_URL is not defined in .env')
}


const AxiosAPI = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	withCredentials: false
})

AxiosAPI.interceptors.request.use((config) => {
	const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})


export const AxiosFetcher = async (args: string | ApiRequestConfig) => {
	if (typeof args === 'string') {
		return await AxiosAPI.get(args).then((res) => res.data)
	} else {
		const { data, ...rest } = args
		if (data && data instanceof FormData) {
			rest.headers = {
				...rest.headers,
				'Content-Type': 'multipart/form-data'
			}
		}
		return await AxiosAPI.request({
			data,
			...rest
		}).then((res) => res.data)
	}
}
