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
    
]

export default appRoute