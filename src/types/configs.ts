import { AxiosRequestConfig } from 'axios'
import { SWRConfiguration } from 'swr'

export interface ApiRequestConfig extends AxiosRequestConfig {
	url: string
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	data?: object | FormData,
}

export interface SWRConfig extends SWRConfiguration {
	shouldRetryOnError?: boolean
}

export type TResponse<T> = {
	message: string
	data: T
}
