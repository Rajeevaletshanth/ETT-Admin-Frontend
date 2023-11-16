import React from 'react'
import {SUPERADMIN, ADMIN, USER} from 'constants/roles.constant'

const verificationRoute = [
    {
        key: 'verifications.list',
        path: '/verification/user',
        component: React.lazy(() => import('views/verifications')),
        authority: [SUPERADMIN, ADMIN],
    },
]

export default verificationRoute