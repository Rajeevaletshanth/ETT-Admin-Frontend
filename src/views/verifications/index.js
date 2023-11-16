import { Container, AdaptableCard } from 'components/shared'
import React, { useEffect, useState } from 'react'
import reducer from './store'
import { Loading } from 'components/shared'
import { injectReducer } from 'store/index'
import { getVerificationList } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
// import ManageLeads from './ManageLeads'
// import LeadsList from './components/LeadsList'
import VerificationList from './components/VerificationList'


injectReducer('verificationList', reducer)

const VerifyUsers = () => {

	const dispatch = useDispatch()
	const { unverified_users } = useSelector((state) => state.verificationList.data.verificationListData);
	const loading = useSelector((state) => state.verificationList.data.loading)

	useEffect(() => {
		fetchData()	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	
	const fetchData = async() => {
		dispatch(getVerificationList())
	}

	return (
		<div className="flex flex-col gap-4 h-full">
			<Loading loading={loading}>				
				<Container>
					<AdaptableCard>
						<div className="px-4 py-6">
							<h3 className='mb-6'>Verification Requests</h3>
							<hr className='mb-4'/>
							{unverified_users && <VerificationList data={unverified_users} dataLength={unverified_users.length}/>}
						</div>
					</AdaptableCard>
				</Container>
			</Loading>
		</div>
	)
}

export default VerifyUsers