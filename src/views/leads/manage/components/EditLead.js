import React, { useState, useEffect } from 'react'
import { Avatar } from 'components/ui'
import { getAvatar } from 'services/ApiService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import { 
	Input,
	Alert,
	Button,
	Select,
	FormItem,
	FormContainer,
    Drawer
} from 'components/ui'
import * as Yup from 'yup'
import CreatableSelect from 'react-select/creatable'
import { useDispatch, useSelector } from 'react-redux'
import { getLeadsData, putLeadsData } from '../store/dataSlice'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const roleOptions = [
	{ value: 'superadmin', label: 'Super Admin', isDisabled: true },
	{ value: 'admin', label: 'Admin' },
	{ value: 'manager', label: 'Manager' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
]

const statusOptions = [
	{ value: true , label: 'Suspend'},
	{ value: false , label: 'Active' }
]

const validationSchema = Yup.object().shape({
	role: Yup.array().min(1, 'Select atleast a role'),
    is_deleted: Yup.array().min(1, 'Select atleast a role').nullable(),
})

const EditLead = ({ data }) => {
    const dispatch = useDispatch()

    const [profileImg, setProfileImg] = useState("");

    const [roles, setRoles] = useState([]);

	const [errorMessage, setErrorMessage] = useTimeOutMessage()
	const [successMessage, setSuccessMessage] = useTimeOutMessage()

    const userEmail = useSelector((state) => state.auth.user.email)
    
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

    const getProfile = async(filename) => {
        try {
            const profile = await getAvatar(filename);
		    setProfileImg(URL.createObjectURL(profile))
        } catch (error) {
            setProfileImg('../../../img/avatars/no_profile.jpg')
        }		
	}

	useEffect(() => {
        handleRole(getRole(JSON.parse(data.authority).role))
		getProfile(data.avatar);             
	},[])

    const getRole = (roles) => {
      let roleArr = [];
      roles.map((item, key) => {
        return[
            roleArr[key] = {
                value: item,
                label: capitalizeFirstLetter(item)
            }
        ]
      })
      return roleArr;
    }   

    

	return (
		<div>
            {errorMessage && <Alert className="mb-4" type="danger"  showIcon>{errorMessage}</Alert>}
			{successMessage && <Alert className="mb-4" type="success"  showIcon>{successMessage}</Alert>}
            <div className='text-center mb-3'>
                <Avatar size={150} shape="circle" src={profileImg} />
            </div>
            <Formik
					enableReinitialize
					initialValues={{ 
                        id: data.id,
						username: data.username,
						role: getRole(JSON.parse(data.authority).role),
						email: data.email,
                        phone_no: data.phone_no,
                        address: data.address,
						is_deleted: {value: data.is_deleted, label: data.is_deleted? "Suspend": "Active" }
					}}
					validationSchema={validationSchema}
					onSubmit={async(values, { setSubmitting }) => {
						let authority = {"role" : roles}
						try {
							setSubmitting(true)
                            let data = {id: values.id, authority: authority ,is_deleted: values.is_deleted.value}
                            const {payload} = await dispatch(putLeadsData(data));
                            if(payload.response === "success"){
                                setSubmitting(false)
                                setSuccessMessage(payload.message)
                                setTimeout(() => {
                                    dispatch(getLeadsData())
                                }, 1000)                                
                            }else{
                                setSubmitting(false)
                                setErrorMessage(payload.message)
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
                                        readOnly
                                        disabled
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
                                        readOnly
                                        disabled
									/>
								</FormItem>	

                                <FormItem
									label="Phone No"
									invalid={errors.phone_no && touched.phone_no}
									errorMessage={errors.phone_no}
								>
									<Field 
										type="text" 
										autoComplete="off" 
										name="phone_no" 
										placeholder="N/A" 
										component={Input} 
                                        readOnly
                                        disabled
									/>
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
										placeholder="N/A" 
										component={Input} 
                                        readOnly
                                        disabled
									/>
								</FormItem>	

                                <FormItem
									label="Status"
									invalid={errors.is_deleted && touched.is_deleted}
									errorMessage={errors.is_deleted}
								>
                                    <Field name="is_deleted">
										{({ field, form }) => (
											<Select
												field={field}
												form={form}
												options={statusOptions}
												onChange={option => {
													form.setFieldValue(field.name, option);
												}}
											/>
										)}
									</Field>
								</FormItem>						

								<FormItem
									label="Role"
									invalid={errors.role && touched.role}
									errorMessage={errors.role}
								>
									<Field name="role" >
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
									<Button type="reset" className="ltr:mr-2 rtl:ml-2" onClick={resetForm} disabled={userEmail === values.email? true: false}>Reset</Button>
									<Button variant="solid" type="submit" color="gray-800" loading={isSubmitting} disabled={userEmail === values.email? true: false}>
										{ isSubmitting ? 'Updating...' : 'Update' }
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

export default EditLead