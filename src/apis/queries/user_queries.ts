import { useQuery } from '@/hooks/useQuery'
import { allBrowserLogout, logout, userProfile } from '@/apis/endpoints/user_apis'
import { TResponse } from '@/types/configs'


export const useUserProfileApi = () => useQuery<TResponse<object>>(userProfile)
export const useLogoutAPI = () => useQuery<TResponse<object>>(logout)
export const useAllDeviceLogoutAPI = () => useQuery<TResponse<object>>(allBrowserLogout)
