import React from 'react'
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation();
	return (
		<div>{t('nav.home')}</div>
	)
}

export default Home