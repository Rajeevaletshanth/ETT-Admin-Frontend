// import React, { useState, useEffect } from 'react'
// import { downloadFile } from 'services/ApiService'
// import { Avatar, Dropdown } from 'components/ui'
// import { Card, Segment, Badge } from 'components/ui'
// import useAuth from 'utils/hooks/useAuth'

// const Project = () => {

// 	const { checkAuthenticate } = useAuth()
// 	const [file, setFile] = useState([]);
	
// 	useEffect(() => {		
// 		getFile();
// 	}, [])

// 	const getFile = async() => {
// 		await checkAuthenticate();		
// 		const profile = await downloadFile('Screenshot.png');
// 		setFile([profile])
// 	}
	
// 	return (
		
// 		<div className="flex flex-col gap-4 h-full">
// 			<Card className="w-4/6 shadow-xl">
// 				<div>
// 					{file.map((item) => {
// 							return[
// 								<img src={URL.createObjectURL(item)} alt="" />
// 							]
// 					})}					
// 				</div>
// 			</Card>
// 		</div>
// 	)
// }

// export default Project

import React from 'react'

const Project = () => {
  return (
	<div>Project</div>
  )
}

export default Project
