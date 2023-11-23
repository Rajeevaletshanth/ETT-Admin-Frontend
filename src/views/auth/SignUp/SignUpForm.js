import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert, Select } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
// import { onSignInSuccess } from 'store/auth/sessionSlice'
// import { setUser } from 'store/auth/userSlice'
import { apiSignUp } from 'services/AuthService'
import { uploadFile } from 'services/ApiService'
import appConfig from 'configs/app.config'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Avatar, Upload } from 'components/ui'
import { HiOutlinePlus } from 'react-icons/hi'

const validationSchema = Yup.object().shape({
	username: Yup.string().min(3, 'Username is too short').max(100, 'Username is too long').required('Please enter your username'),
	role: Yup.array().min(1, 'Select atleast a role').nullable(),
	address: Yup.string().min(3, 'Address is too short').max(100, 'Address is too long').required('Please enter your address'),
	phone_no: Yup.string().min(9, 'Invalid phone number').max(12, 'Invalid phone number').required('Please enter your phone number'),
	email: Yup.string().email('Invalid email').required('Please enter your email'),
	password: Yup.string().min(3, 'Password is too short').max(50, 'Password is too long').required('Please enter your password'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Your passwords do not match')
})

const roleOptions = [
	{ value: 'client' , label: 'B2C Client'},
	{ value: 'agent' , label: 'Agent'},
	{ value: 'supplier' , label: 'Supplier'}
]

const SignUpForm = props => {

	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props


	const navigate = useNavigate()

	//Profile Upload
	const [avatarFile, setAvatarFile] = useState([]);
	const [avatarImg, setAvatarImg] = useState(null)
	const onFileUpload = file => {
		setAvatarImg(URL.createObjectURL(file[0]))
		setAvatarFile([file[0]])
	}

	const removeAvatar = () => {
		setAvatarImg(null)
		setAvatarFile([])
	}
	const beforeUpload = files => {
        let valid = true
        const allowedFileType = ['image/jpeg', 'image/png']
        for (let file of files) {
			if (!allowedFileType.includes(file.type)) {
				valid = 'Please upload a .jpeg or .png file!'
			}
		}
        return valid
    }

	const getAvatar = async() => {
		try {
			const avatar = await uploadFile(avatarFile)
			return avatar;
		} catch (error) {
			return error
		}
	}


	const [errorMessage, setErrorMessage] = useTimeOutMessage()
	const [successMessage, setSuccessMessage] = useTimeOutMessage()

	const onSignUp = async (values, setSubmitting) => {
		const { username, role, password, email, address, phone_no } = values
		setSubmitting(true)		
		try {
			let profile = await getAvatar();
			const resp = await apiSignUp({ username, address, authority : {"role" : [role.value]}, phone_no, email, password, avatar: profile }, 'moderator')
			if (resp.data) {
				setSubmitting(false)
				if(resp.data.response === "success"){
					setSuccessMessage('Successfully Registered. Please login to continue.')
					setTimeout(() => {
						navigate(appConfig.unAuthenticatedEntryPath)
					}, 3000)					
				}else{
					setErrorMessage(resp.data.message)
				}
			}
		} catch (errors) {
			setErrorMessage(errors?.response?.data?.message || errors.toString())
			setSubmitting(false)
		}
	}

	return (
		<div className={className}>
			<Formik
				initialValues={{
					role: roleOptions[0],
					username: '', 
					address: '',
					phone_no: '',
					password: '', 
					confirmPassword: '',
					email: '' 
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignUp(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem className="text-center">
								<Upload 
								className="cursor-pointer " 
								onChange={onFileUpload} 
								showList={false}
								uploadLimit={1}
								beforeUpload={beforeUpload}
								>
									<Avatar size={140} shape='circle' src={avatarImg} icon={<HiOutlinePlus />} />
								</Upload>	<br />
								{avatarImg && <Button className="mt-5" variant="solid" color="red-500" size="xs" onClick={removeAvatar}>Remove Profile</Button>}						
							</FormItem>
							
							<FormItem
								label="Username"
								invalid={errors.username && touched.username}
								errorMessage={errors.username}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="username" 
									placeholder="User Name" 
									component={Input} 
								/>
							</FormItem>

							<FormItem
									label="Role"
									invalid={errors.role && touched.role}
									errorMessage={errors.role}
							>
								
                                    <Field name="role">
										{({ field, form }) => (
											<Select
												field={field}
												form={form}
												options={roleOptions}
												onChange={option => {
													form.setFieldValue(field.name, option);
												}}
											/>
										)}
									</Field>
							</FormItem>

							<FormItem
								label="Address"
								invalid={errors.address && touched.address}
								errorMessage={errors.address}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="address" 
									placeholder="Address" 
									component={Input} 
								/>
							</FormItem>

							<FormItem
								label="Phone No"
								invalid={errors.phone_no && touched.phone_no}
								errorMessage={errors.phone_no}
							>
								<Field 
									type="number" 
									autoComplete="off" 
									name="phone_no" 
									placeholder="Phone No" 
									component={Input} 
								/>
							</FormItem>

							<FormItem
								label="Email"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field 
									type="email" 
									autoComplete="off" 
									name="email" 
									placeholder="Email" 
									component={Input} 
								/>
							</FormItem>

							<FormItem
								label="Password"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off" 
									name="password" 
									placeholder="Password" 
									component={PasswordInput} 
								/>
							</FormItem>

							<FormItem
								label="Confirm Password"
								invalid={errors.confirmPassword && touched.confirmPassword}
								errorMessage={errors.confirmPassword}
							>
								<Field
									autoComplete="off" 
									name="confirmPassword" 
									placeholder="Confirm Password" 
									component={PasswordInput} 
								/>
							</FormItem>

							
							{errorMessage && <Alert className="mb-4" type="danger"  showIcon>{errorMessage}</Alert>}
							{successMessage && <Alert className="mb-4" type="success"  showIcon>{successMessage}</Alert>}
							

							<Button 
								block 
								loading={isSubmitting} 
								variant="solid" 
								type="submit"
							>
								{ isSubmitting ? 'Creating Account...' : 'Sign Up' }
							</Button>
							<div className="mt-4 text-center">
								<span>Already have an account? </span>
								<ActionLink to={signInUrl}>
									Sign in
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
			
		</div>
	)
}

export default SignUpForm