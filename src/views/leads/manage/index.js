import { Container, AdaptableCard } from 'components/shared'
import React, { useEffect, useState } from 'react'
import reducer from './store'
import { Loading } from 'components/shared'
import { injectReducer } from 'store/index'
import { getLeadsData } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
// import ManageLeads from './ManageLeads'
import LeadsList from './components/LeadsList'


injectReducer('manageLeads', reducer)

const ManageLeads = () => {

	const dispatch = useDispatch()
	const { admin } = useSelector((state) => state.manageLeads.data.leadsData);
	const loading = useSelector((state) => state.manageLeads.data.loading)

	useEffect(() => {
		fetchData()	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	
	const fetchData = async() => {
		dispatch(getLeadsData())
	}

	return (
		<div className="flex flex-col gap-4 h-full">
			<Loading loading={loading}>				
				<Container>
					<AdaptableCard>
						<div className="px-4 py-6">
							<h3 className='mb-6'>Leads</h3>
							<hr className='mb-4'/>
							{admin && <LeadsList data={admin} dataLength={admin.length}/>}
						</div>
					</AdaptableCard>
				</Container>
			</Loading>
		</div>
	)
}

export default ManageLeads