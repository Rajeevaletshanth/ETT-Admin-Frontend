import React from 'react'
import {SUPERADMIN, ADMIN, USER} from 'constants/roles.constant'

const productRoute = [
    {
        key: 'product.fixed_departure',
        path: '/product/fixed_departure',
        component: React.lazy(() => import('views/products/fixedDeparture')),
        authority: [],
    },
    {
        key: 'product.van_tours',
        path: '/product/van_tours',
        component: React.lazy(() => import('views/products/vanTours')),
        authority: [],
    },
    {
        key: 'product.vip',
        path: '/product/vip',
        component: React.lazy(() => import('views/products/vip')),
        authority: [],
    },
    {
        key: 'product.fit',
        path: '/product/fit',
        component: React.lazy(() => import('views/products/fit')),
        authority: [],
    },
    {
        key: 'product.mice',
        path: '/product/mice',
        component: React.lazy(() => import('views/products/mice')),
        authority: [],
    },
    {
        key: 'product.tour_packages',
        path: '/product/tour_packages',
        component: React.lazy(() => import('views/products/tourPackages')),
        authority: [],
    },
    {
        key: 'product.hotel',
        path: '/product/hotel',
        component: React.lazy(() => import('views/products/hotel')),
        authority: [],
    },
    {
        key: 'product.apartments',
        path: '/product/apartments',
        component: React.lazy(() => import('views/products/apartments')),
        authority: [],
    },
    {
        key: 'product.transport',
        path: '/product/transport',
        component: React.lazy(() => import('views/products/transport')),
        authority: [],
    },
]

export default productRoute