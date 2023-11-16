import React from 'react'
import {SUPERADMIN, ADMIN, USER} from 'constants/roles.constant'

const leadsRoute = [
    {
        key: 'leads.create',
        path: '/leads/create_lead',
        component: React.lazy(() => import('views/leads/create')),
        authority: [SUPERADMIN, ADMIN],
    },
    {
        key: 'leads.manage',
        path: '/leads/manage_lead',
        component: React.lazy(() => import('views/leads/manage')),
        authority: [SUPERADMIN],
    }
]

export default leadsRoute