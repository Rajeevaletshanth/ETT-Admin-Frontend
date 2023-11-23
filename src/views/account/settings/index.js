import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminDet } from 'services/AccountServices'
import useAuth from 'utils/hooks/useAuth'
import checkTable from 'services/TableCheck'
import useUserRole from 'services/TableCheck'

const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))
const Billing = lazy(() => import('./components/Billing'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
	profile: { label: 'Profile', path: 'profile' },
	password: { label: 'Password', path: 'password' },
	billing: { label: 'Billing', path: 'billing' },
}

const Settings = () => {

	const [currentTab, setCurrentTab] = useState('profile')
	const [data, setData] = useState({})

  const { checkAuthenticate } = useAuth()

	const navigate = useNavigate()

	const location = useLocation()

  const { id, authority } = useSelector((state) => state.auth.user)

	const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/app/account/settings/${val}`)
	}

	const authTable = useUserRole();

	const fetchData = async () => {
		try{
			await checkAuthenticate();
			const response = await getAdminDet(id, authTable)
			setData({
				id: response.data.admin[0].id,
				username: response.data.admin[0].username,
				email: response.data.admin[0].email,
				authority: response.data.admin[0].authority,
				address: response.data.admin[0].address,
				phone_no: response.data.admin[0].phone_no,
				avatar: response.data.admin[0].avatar
			})
		}catch(err){
			setData({})
		}
	}

	useEffect(() => {
		setCurrentTab(path)    
		if(isEmpty(data)) {
			fetchData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Container>
			<AdaptableCard>
				<Tabs value={currentTab} onChange={val => onTabChange(val)}>
					<TabList>
						{
							Object.keys(settingsMenu).map(key =>
								<TabNav key={key} value={key}>{settingsMenu[key].label}</TabNav>
							)
						}
					</TabList>
				</Tabs>
				<div className="px-4 py-6">
					<Suspense fallback={<></>}>
						{ currentTab === 'profile' && <Profile data={data} /> }
						{ currentTab === 'password' && <Password data={data} /> }
						{ currentTab === 'billing' && <Billing data={data} />}
						{/* { currentTab === 'password' && <Password data={data.loginHistory} /> }
						{ currentTab === 'billing' && <Billing data={data.loginHistory} />}  */}
					</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Settings