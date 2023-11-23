import React from 'react'
import {SUPERADMIN, ADMIN, USER} from 'constants/roles.constant'

const appRoute = [
    {
        key: 'account.profile',
        path: '/app/account/settings/profile',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    {
        key: 'account.password',
        path: '/app/account/settings/password',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    {
        key: 'account.billings',
        path: '/app/account/settings/billing',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    {
        key: 'quotation',
        path: '/quotation',
        component: React.lazy(() => import('views/quotation')),
        authority: [],
    },
    {
        key: 'agents',
        path: '/agents',
        component: React.lazy(() => import('views/agents')),
        authority: [],
    },
    {
        key: 'supplier',
        path: '/supplier',
        component: React.lazy(() => import('views/supplier')),
        authority: [],
    },
    {
        key: 'client',
        path: '/client',
        component: React.lazy(() => import('views/b2cClients')),
        authority: [],
    },
    {
        key: 'additional_info',
        path: '/additional_info',
        component: React.lazy(() => import('views/additionalInfo')),
        authority: [],
    },
    {
        key: 'my_bookings',
        path: '/my_bookings',
        component: React.lazy(() => import('views/myBookings')),
        authority: [],
    },
    {
        key: 'offers',
        path: '/offers',
        component: React.lazy(() => import('views/offers')),
        authority: [],
    },
    {
        key: 'contact_us',
        path: '/contact_us',
        component: React.lazy(() => import('views/contactUs')),
        authority: [],
    },
]

export default appRoute