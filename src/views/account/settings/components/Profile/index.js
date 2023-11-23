import React,{ useState, useEffect } from 'react'
import { 
	Input, 
	Avatar,
	Upload,
	Button,
	Select,
	Switcher,
	Notification, 
	toast,
    FormItem,
	FormContainer 
} from 'components/ui'
import FormDesription from '../FormDesription'
import FormRow from '../FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import { 
	HiOutlineUserCircle, 
	HiOutlineMail, 
	HiOutlineBriefcase, 
	HiOutlineUser, 
	HiCheck,
    HiHome,
    HiOutlinePhone,
	HiOutlineGlobeAlt
} from 'react-icons/hi'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setUser } from 'store/auth/userSlice'
import { editAdminDet } from 'services/AccountServices'
import { getAvatar, uploadFile } from 'services/ApiService'
import useUserRole from 'services/TableCheck'


const { Control } = components

const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Username Required'),
    address: Yup.string().min(3, 'Too Short!').max(250, 'Too Long!').required('Address Required').nullable(),
    phone_no: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Too Short!').max(11, 'Too Long!').required('Phone Number Required').nullable(),
    lang: Yup.string(),
    avatar: Yup.string(),
})

const langOptions = [
	{ value: 'en', label: 'English (US)', imgPath: '/img/countries/us.png' },
    { value: 'it', label: 'Italian', imgPath: '/img/countries/it.png' },
	{ value: 'ch', label: '中文', imgPath: '/img/countries/cn.png' },	
	{ value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' }
]

const CustomSelectOption = ({innerProps, label, data, isSelected}) => {
	return (
		<div 
			className={`flex items-center justify-between p-2 ${isSelected ? 'bg-gray-100 dark:bg-gray-500' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`} 
			{...innerProps}
		>
			<div className="flex items-center">
				<Avatar shape="circle" size={20} src={data.imgPath} />
				<span className="ml-2 rtl:mr-2">{label}</span>
			</div>
			{isSelected && <HiCheck className="text-emerald-500 text-xl" />}
		</div>
	)
}

const CustomControl = ({ children, ...props }) => {	 
	const selected = props.getValue()[0]
	return (
		<Control {...props}>
			{selected && <Avatar className="ltr:ml-4 rtl:mr-4" shape="circle" size={18} src={selected.imgPath} />}
			{children}
		</Control>
	)
}

const uploadProfile = async(file) => {
    try {
        const avatar = await uploadFile(file)
        return avatar;
    } catch (error) {
        return error
    }
}

const Profile = ({data}) => {
    const dispatch = useDispatch()
    const authTable = useUserRole();
    const [avatarFile, setAvatarFile] = useState([]);
    const [profileImg, setProfileImg] = useState("");

    const onSetFormFile = (form, field, file) => {
		form.setFieldValue(field.name, URL.createObjectURL(file[0]))
        setAvatarFile([file[0]])
	}

    const getProfile = async(filename) => {
        try {
            const profile = await getAvatar(filename);
		    setProfileImg(URL.createObjectURL(profile))
        } catch (error) {
            setProfileImg()
        }		
	}

	useEffect(() => {
        if(avatarFile.length === 0){
		    getProfile(data.avatar);
        }
	},[data])

    const onFormSubmit = async(values, setSubmitting) => {
               let image = values.avatar;
                if(avatarFile.length > 0){ 
                    image = await uploadProfile(avatarFile);
                }

                let formData = {
                    username: values.username,
                    address: values.address,
                    phone_no: values.phone_no,
                    avatar : image
                }
                const response = await editAdminDet(values.id, formData, authTable);
                if(response.data){
                    if(response.data.response === "success"){
                        dispatch(setUser({
                            id: values.id,
                            avatar: image, 
                            username: values.username, 
                            authority: JSON.parse(values.authority).role, 
                            email: data.email
                        }))
                        toast.push(<Notification title={response.data.message} type="success" />, {placement: 'top-center'})
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000)
                    }else{
                        toast.push(<Notification title={response.data.message} type="danger" />, {placement: 'top-center'})
                    }
                    setSubmitting(false)
                }                  
          
    }
    
  return (
    <Formik
		initialValues={data}
		enableReinitialize
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
                return(
                    <Form>
                        <FormContainer>
                            <FormDesription 
                                title="General"
								desc="Basic info."
							/>

                            <FormRow name="username" label="Username" {...validatorProps}>								
                                <Field 
                                    type="text" 
                                    autoComplete="off" 
                                    name="username"
                                    placeholder="Username" 
                                    component={Input}
                                    prefix={<HiOutlineUserCircle className="text-xl" />}
                                />
							</FormRow>

                            <FormRow name="email" label="Email" {...validatorProps}>								
                                <Field 
                                    type="email" 
                                    autoComplete="off" 
                                    disabled={true}
                                    name="email"
                                    placeholder="Email" 
                                    component={Input}
                                    prefix={<HiOutlineMail className="text-xl" />}
                                />
							</FormRow>

                            <FormRow name="address" label="Address" {...validatorProps}>								
                                <Field 
                                    type="text" 
                                    autoComplete="off" 
                                    name="address" 
                                    placeholder="Address" 
                                    component={Input}
                                    prefix={<HiHome className="text-xl" />}
                                />
							</FormRow>

                            <FormRow name="phone_no" label="Phone Number" {...validatorProps}>								
                                <Field 
                                    type="text" 
                                    autoComplete="on" 
                                    name="phone_no" 
                                    placeholder="Phone Number" 
                                    component={Input}
                                    prefix={<HiOutlinePhone className="text-xl" />}
                                />
							</FormRow>

                            <FormRow name="avatar" label="Avatar" {...validatorProps} >                                
                                    <Field name="avatar">
                                        {({ field, form }) => {
                                        const avatarProps = field.value ? { src: avatarFile.length > 0? field.value : profileImg } : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={files => onSetFormFile(form, field, files)}
                                                onFileRemove={files => onSetFormFile(form, field, files)}
                                                showList={false}
                                                uploadLimit={1}
                                            >
                                                <Avatar 
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={120} 
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}  
                                                />
                                            </Upload>
                                        )
                                        }}
                                    </Field>
							</FormRow>


                            <div className="mt-4 ltr:text-right">
								<Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={resetForm}>Reset</Button>
								<Button variant="solid" loading={isSubmitting} type="submit">
									{isSubmitting ? 'Updating' : 'Update'}
								</Button>
							</div>

                        </FormContainer>
                    </Form>
                )
        }}

    </Formik>
  )
}

export default Profile
