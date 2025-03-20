// export const allRoles = '/roles'
// export const allPermissions = '/permissions'
// export const createRole = '/roles'
// export const showRole = (id: string) => `/roles/${id}`
// export const updateRole = (id: string) => `/roles/${id}`
// export const deleteRole = (id: string) => `/roles/${id}`

import { useQuery } from '@/hooks/useQuery'
import { TResponse } from '@/types/configs'
import { allPermissions, allRoles, showRole } from '@/apis/endpoints/role_permisson_apis'

export const useAllRoleAPI = () => useQuery<TResponse<object>>(allRoles)
export const useAllPermissionAPI = () => useQuery<TResponse<object>>(allPermissions)
export const useShowRoleAPI = (id: string) => useQuery<TResponse<object>>(showRole(id))
