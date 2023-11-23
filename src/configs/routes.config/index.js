import React from 'react'
import authRoute from './authRoute'
import appRoute from './appRoute'
import leadsRoute from './leadsRoute'
import verificationRoute from './verificationRoute'
import { SUPERADMIN } from 'constants/roles.constant'
import productRoute from './productRoute'

export const publicRoutes = [
    ...authRoute,
    {
        key: 'reset',
        path: '/reset_password/:id/:token',
        component: React.lazy(() => import('views/auth/ResetPassword')),
        authority: [],
    }
]

export const protectedRoutes = [
    ...appRoute,
    ...productRoute,
    ...leadsRoute,
    ...verificationRoute,
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'access-denied',
        path: '/access-denied',
        component: React.lazy(() => import('views/auth/AccessDenied')),
        authority: [],
    },
]
