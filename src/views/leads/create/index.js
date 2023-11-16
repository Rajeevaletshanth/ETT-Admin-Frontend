import { Container, AdaptableCard } from 'components/shared'
import React from 'react'
import CreateLead from './CreateLead'

const index = () => {
	return (
		<Container>
			<AdaptableCard>               
                <div className="px-4 py-6">
                    <h3 className='mb-6'>Create Lead</h3>
                    <CreateLead />
                </div>				
			</AdaptableCard>
		</Container>
		
	)
}

export default index