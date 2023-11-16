import React from 'react'
import classNames from 'classnames'
import { 
	Input,
	Button,
	Tag,
	Notification, 
	toast,
	FormContainer 
} from 'components/ui'
import FormDesription from '../FormDesription'
import FormRow from '../FormRow'
import { Field, Form, Formik } from 'formik'
import isLastChild from 'utils/isLastChild'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { changePassword } from 'services/AccountServices'


const validationSchema = Yup.object().shape({
	password: Yup.string().required('Password Required'),
	newPassword: Yup.string().required('Enter your new password').min(4, 'Too Short!').matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
	confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Password not match')
})

const Password = ({ data }) => {

	const onFormSubmit = async(values, setSubmitting) => {
    if(values.password === values.newPassword){
      toast.push(<Notification title={"Your current password and new password cannot be same!"} type="danger" />,{placement: 'top-center'})
      setSubmitting(false)
    }else{
      const response = await changePassword(data.id, { currentPassword: values.password, newPassword: values.newPassword })
      if(response.data){
        if(response.data.response === "success"){
          toast.push(<Notification title={"Password updated"} type="success" />,{placement: 'top-center'})
        }else{
          toast.push(<Notification title={response.data.message} type="danger" />,{placement: 'top-center'})
        }
        setSubmitting(false)
      }
    }
	}

	return (
		<>
			<Formik
				initialValues={{ 
					password: '', 
					newPassword: '',
					confirmNewPassword: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true)
					setTimeout(() => {
						onFormSubmit(values, setSubmitting)
					}, 1000)
				}}
			>
				{({values, touched, errors, isSubmitting, resetForm}) => {
					const validatorProps = {touched, errors}
					return (
						<Form>
							<FormContainer>
								<FormDesription 
									title="Password"
									desc="Enter your current & new password to reset your password"
								/>
								<FormRow name="password" label="Current Password" {...validatorProps} >
									<Field 
										type="password" 
										autoComplete="off" 
										name="password" 
										placeholder="Current Password" 
										component={Input}
									/>
								</FormRow>
								<FormRow name="newPassword" label="New Password" {...validatorProps} >
									<Field 
										type="password"
										autoComplete="off"
										name="newPassword"
										placeholder="New Password"
										component={Input}
									/>
								</FormRow>
								<FormRow name="confirmNewPassword" label="Confirm Password" {...validatorProps} >
									<Field 
										type="password"
										autoComplete="off"
										name="confirmNewPassword"
										placeholder="Confirm Password"
										component={Input}
									/>
								</FormRow>							
								<div className="mt-4 ltr:text-right">
									<Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={resetForm}>Reset</Button>
									<Button variant="solid" loading={isSubmitting} type="submit">
										{isSubmitting ? 'Updating' : 'Update Password'}
									</Button>
								</div>
							</FormContainer>
						</Form>
					)
				}}
			</Formik>
		</>
	)
}

export default Password