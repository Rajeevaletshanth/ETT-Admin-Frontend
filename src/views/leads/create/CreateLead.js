import React, { useState } from 'react'
import { 
	Input,
	Alert,
	Button,
	Select,
	FormItem,
	FormContainer
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import { createLead } from 'services/ApiService'

const roleOptions = [
	{ value: 'superadmin', label: 'Super Admin', isDisabled: true },
	{ value: 'admin', label: 'Admin' },
	{ value: 'manager', label: 'Manager' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
  ]


const validationSchema = Yup.object().shape({
	username: Yup.string().min(3, "Username is too short").max(25, "Username is too long").required("Please enter username"),
	role: Yup.array().min(1, 'Select atleast a role'),
	email: Yup.string().required("Please enter a email"),
	password: Yup.string().min(4, "Password is too short").required("Please enter a password")
})




const MixedFormControl = () => {

	const [roles, setRoles] = useState([]);

	const [errorMessage, setErrorMessage] = useTimeOutMessage()
	const [successMessage, setSuccessMessage] = useTimeOutMessage()
	const [warningMessage, setWarningMessage] = useTimeOutMessage()

	const generatePassword = (size) => {
		let length = size,
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^&*()_",
			retVal = "";
		for (let i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	}

	const setPassword = (form, field) => {
		let randomPassword = generatePassword(12);
	  	form.setFieldValue(field.name, randomPassword)
	}

	const handleRole = (option) => {
		setRoles([]);
		option.map((item) => {
			setRoles(s => {
				return[
					...s, item.value
				]
			})
		})
	}

	return (
			<div>
				{errorMessage && <Alert className="mb-4" type="danger"  showIcon>{errorMessage}</Alert>}
				{successMessage && <Alert className="mb-4" type="success"  showIcon>{successMessage}</Alert>}
				{warningMessage && <Alert className="mb-4" type="warning"  showIcon>{warningMessage}</Alert>}
				<Formik
					enableReinitialize
					initialValues={{ 
						username: '',
						role: [],
						email: '',
						password: ''
					}}
					validationSchema={validationSchema}
					onSubmit={async(values, { setSubmitting }) => {
						let authority = {"role" : roles}
						try {
							setSubmitting(true)
							const response = await createLead({ username: values.username, authority, email: values.email, password: values.password })
							if(response.data){							
								if(response.data.response == "success"){
									setSuccessMessage(response.data.message)
									setSubmitting(false)
								}else if(response.data.response === "warning"){
									setWarningMessage(response.data.message)
									setSubmitting(false)
								}else{
									setErrorMessage(response.data.message)
									setSubmitting(false)
								}								
							}
						} catch (error) {
							setErrorMessage("404, Axios error!")
							setSubmitting(false)
						}
					}}
				>
					{({values, touched, errors, resetForm, isSubmitting }) => (
						<Form>
							<FormContainer>

								<FormItem
									label="Username"
									invalid={errors.username && touched.username}
									errorMessage={errors.username}
								>
									<Field 
										type="text" 
										autoComplete="off" 
										name="username" 
										placeholder="Username" 
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
									<div className="flex flex-row gap-8">
										<Field 
											type="password" 
											autoComplete="off" 
											name="password" 
											placeholder="Password" 
											component={PasswordInput} 
										/>
										<Field name="password">
											{({ field, form }) => (
												<Button type="button" onClick={() => setPassword(form, field)}>Generate Password</Button>
											)}
										</Field>								
									</div>

								</FormItem>

								

								<FormItem
									label="Role"
									invalid={errors.role && touched.role}
									errorMessage={errors.role}
								>
									<Field name="role">
										{({ field, form }) => (
											<Select
												componentAs={CreatableSelect}
												isMulti
												field={field}
												form={form}
												options={roleOptions}
												value={values.role}
												onChange={option => {
													form.setFieldValue(field.name, option);
													handleRole(option);
												}}
											/>
										)}
									</Field>
								</FormItem>
								
								<FormItem>
									<Button type="reset" className="ltr:mr-2 rtl:ml-2" onClick={resetForm}>Reset</Button>
									<Button variant="solid" type="submit" loading={isSubmitting} >
										{ isSubmitting ? 'Creating Account...' : 'Create' }
									</Button>
								</FormItem>
							</FormContainer>
						</Form>
						)
					}
				</Formik>
		</div>
	)
}

export default MixedFormControl
