import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button, Tag, Notification, toast, FormContainer, Dialog, Alert } from 'components/ui'
import FormDesription from '../FormDesription'
import FormRow from '../FormRow'
import CreditCardForm from './CreditCardForm'
import BillingHistory from './BillingHistory'
import { Field, Form, Formik } from 'formik'
import { HiPlus } from 'react-icons/hi'
import isLastChild from 'utils/isLastChild'
import isEmpty from 'lodash/isEmpty'
import { Loading } from 'components/shared'
import { useSelector } from 'react-redux'
import { getAllCards, detachCard, attachCard, changePrimaryCard } from 'services/PaymentServices'
// import { apiGetAccountSettingBillingData } from 'services/AccountServices'

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const Billing = () => {


	const [data, setData] = useState({})
	const [selectedCard, setSelectedCard] = useState({})
	const [ccDialogType, setCcDialogType] = useState('')

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const [loading, setLoading] = useState(true);
	const [updatingCard, setUpdatingCard] = useState(false);
	const [removingCard, setRemovingCard] = useState(false);
	
	const admin_id = useSelector((state) => state.auth.user.id)
	const username = useSelector((state) => state.auth.user.username)
	const email = useSelector((state) => state.auth.user.email)

	const fetchData = async () => {
		const response = await getAllCards(admin_id)
		if(response.data){
			let cardList = [];
			if(response.data.response === "success"){
				response.data.cards?.map((item, key) => {
					cardList[key] = {
						cardHolderName: item.card_holder_name,
						cardId: item.card_id,
						cardType: item.card_type,
						expMonth: item.exp_month,
						expYear: item.exp_year,
						last4Number: item.last_four_digits,
						primary: item.primary_card
					}
				})
			}
			setData({paymentMethods : cardList});
			setLoading(false);
		}
	}

	const onFormSubmit = (_, setSubmitting) => {
		toast.push(
			<Notification title={"Billing information updated"} type="success" />
		,{
			placement: 'top-center'
		})
		setSubmitting(false)
	}

	const onCreditCardDialogClose = () => {
		setCcDialogType('')
		setSelectedCard({})
	}

	const onSetPrimaryCard = async(card) => {
		let data = {card_id: card.cardId}
		const response = await changePrimaryCard(admin_id, data);
		if(response.data){
			if(response.data.response === "success"){
				toast.push(
					<Notification title={response.data.response.charAt(0).toUpperCase() + response.data.response.slice(1)} type={'success'}>
						{response.data.message}
					</Notification>
				)
			}else{
				toast.push(
					<Notification title={response.data.response.charAt(0).toUpperCase() + response.data.response.slice(1)} type={'danger'}>
						{response.data.message}
					</Notification>
				)				
			}
			fetchData()
		}
	}

	const onRemoveCreditCard = async(card) => {
		setRemovingCard(true)
		let data = {card_id: card.cardId}
		const response = await detachCard(admin_id, data);
		if(response.data){
			if(response.data.response === "success"){
				toast.push(
					<Notification title={response.data.response.charAt(0).toUpperCase() + response.data.response.slice(1)} type={'success'}>
						{response.data.message}
					</Notification>
				)
			}else{
				toast.push(
					<Notification title={response.data.response.charAt(0).toUpperCase() + response.data.response.slice(1)} type={'danger'}>
						{response.data.message}
					</Notification>
				)				
			}
			setRemovingCard(false)
			fetchData()
		}
	}
	

	const onEditCreditCard = (card, type) => {
		setCcDialogType(type)
		setSelectedCard(card)
	}

	const onCardUpdate = async(cardValue, form, field) => {
		console.log(cardValue)
		setErrorMsg("");
		setUpdatingCard(true);
		let card_data = {
			customer_name: username,
			name: cardValue.cardHolderName,
			email: email,
			type: 'card',
			card_no: cardValue.cardNumber,
			exp_month: cardValue.expMonth,
			exp_year: cardValue.expYear,
			cvc: cardValue.cvv,
			cardId: cardValue.cardId,
			last4Number: cardValue.last4Number,
			cardType: cardValue.cardType,
			primary_card: cardValue.primary
		}

		const response = await attachCard(admin_id, card_data);
		if(response.data){
			if(response.data.response === "success"){
				fetchData();
				onCreditCardDialogClose()
				toast.push(
					<Notification title={response.data.response.charAt(0).toUpperCase() + response.data.response.slice(1)} type={response.data.response}>
						Card Added Successfully
					</Notification>
				)
			}else{
				setErrorMsg("Invalid Card Details")
			}
			setUpdatingCard(false);
		}
	}

	const onRedirect = (url) => {
		let win = window.open(url, '_blank')
		win.focus()
	}

	useEffect(() => {
		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Formik
			initialValues={data}
			enableReinitialize
			// onSubmit={(values, { setSubmitting }) => {
				// setSubmitting(true)
				// setTimeout(() => {
        //   console.log(values, "Valuess")
			// 		onFormSubmit(setSubmitting)
			// 	}, 1000)
			// }}
		>
			{({values, touched, errors, isSubmitting, resetForm}) => {
				const validatorProps = {touched, errors}
				return (
					<Form>
						<FormContainer>
							<FormDesription 
								title="Payment Method"
								desc="You can update your cards information here"
							/>
							<Loading loading={loading}>
								<FormRow name="paymentMethods" alignCenter={false} label="Credit Cards" {...validatorProps} >
									<div className="rounded-lg border border-gray-200 dark:border-gray-600">
										{values?.paymentMethods?.length === 0?  
											<div className="flex items-center">
												<div className="ml-3 rtl:mr-3">
														<div className="flex items-center">
															<div className="text-gray-200 dark:text-gray-100 font-semibold">
																No Cards Added Yet.
															</div>
														</div>
												</div>
											</div>
										: ""}
										{values?.paymentMethods?.map((card, index) => (
											<div 
												key={card.cardId} 
												className={classNames(
													'flex items-center justify-between p-4',
													!isLastChild(values.paymentMethods, index) && 'border-b border-gray-200 dark:border-gray-600'
												)}
											>
												<div className="flex items-center">
													{card.cardType === 'visa' && <img src="/img/others/img-8.png" alt="visa" />}
													{card.cardType === 'mastercard' && <img src="/img/others/img-9.png" alt="master" />}
													{card.cardType === 'amex' && <img src="/img/others/americanexp.png" alt="american express" />}
													{card.cardType === 'discover' && <img src="/img/others/discover.png" alt="discover" />}
													<div className="ml-3 rtl:mr-3">
														<div className="flex items-center">
															<div className="text-gray-900 dark:text-gray-100 font-semibold">
																{card.cardHolderName} •••• {card.last4Number}
															</div>
															{card.primary && (
																<Tag className="bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-100 rounded-md border-0 mx-2">
																	<span className="capitalize"> Primary </span>
																</Tag>
															)}
														</div>
														<span>Expired {months[parseInt(card.expMonth) - 1]} 20{card.expYear}</span>
													</div>
												</div>
												<div className="">
													{!card.primary &&
													<Button
														size="xs" 
														onClick={() => onSetPrimaryCard(card)}
														type="button"
														className="mr-2 mb-2"
													>
														Set Primary
													</Button>}
													<Button
														size="xs" 
														onClick={() => onRemoveCreditCard(card)}
														type="button"
														variant="solid" 
														color="red-600"
													>
														Remove
													</Button>
												</div>
											</div>
										))}
									</div>
									<div className="mt-2">
										<Button 
											type="button" 
											variant="plain" 
											size="sm" 
											icon={<HiPlus className="text-lg" />}
											onClick={() => onEditCreditCard({}, 'NEW')}
										>
											<span className="font-semibold">Add new card</span>
										</Button>
									</div>
								</FormRow>
							</Loading>
							<Dialog
								isOpen={ccDialogType === 'NEW' || ccDialogType === 'EDIT'}
								onClose={onCreditCardDialogClose}
								onRequestClose={onCreditCardDialogClose}
							>
								<h5 className="mb-4">Edit Credit Card</h5>
								{errorMsg && <Alert className="mb-4" type="danger" showIcon>{errorMsg}</Alert>}
								<Field name="paymentMethods">
									{({ field, form }) => {
										return (
											<CreditCardForm
												type={ccDialogType}
												card={selectedCard} 
												onUpdate={cardValue => onCardUpdate(cardValue, form, field)} 
												loading={updatingCard}
											/>
										) 
									}}
								</Field>
							</Dialog>
							{/* <div className="mt-4 ltr:text-right">
								<Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={resetForm}>Reset</Button>
								<Button variant="solid" loading={isSubmitting} type="submit">
									{isSubmitting ? 'Updating' : 'Update'}
								</Button>
							</div> */}
							<FormDesription
								className="mt-6"
								title="Billing History"
								desc="View your previos billing"
							/>
							<BillingHistory 
								className="mt-4 rounded-lg border border-gray-200 dark:border-gray-600" 
								data={data.billingHistory} 
							/>
						</FormContainer>
					</Form>
				)
			}}
		</Formik>
	)
}

export default Billing