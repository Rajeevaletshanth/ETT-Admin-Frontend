import React, { useState } from 'react'
import SignInForm from './SignInForm'
import { Switcher } from 'components/ui'

const SignIn = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	return (
		<>
			<div className="mb-8">
				<div className='flex space-x-4'>
					<h3 className="mb-1">Welcome back!</h3>
					<div className='mt-1'><Switcher checkedContent="Admin" unCheckedContent="User" onChange={(val) => setIsAdmin(val)} /></div>
				</div>
				<p>Please enter your credentials to sign in!</p>
			</div>
			<SignInForm disableSubmit={false} isAdmin={isAdmin}/>
		</>
	)
}

export default SignIn