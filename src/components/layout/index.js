import React, { memo, useMemo, lazy, Suspense, useEffect, useCallback, useState } from 'react'
import { Loading } from 'components/shared'
import { useSelector } from 'react-redux'
import { 
	LAYOUT_TYPE_CLASSIC, 
	LAYOUT_TYPE_MODERN, 
	LAYOUT_TYPE_SIMPLE,
	LAYOUT_TYPE_STACKED_SIDE,
	LAYOUT_TYPE_DECKED,
	LAYOUT_TYPE_BLANK
} from 'constants/theme.constant'
import useAuth from 'utils/hooks/useAuth'
import useDirection from 'utils/hooks/useDirection'
import useLocale from 'utils/hooks/useLocale'
import { useLocation } from 'react-router-dom'

const layouts = {
	[LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
	[LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
	[LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
	[LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
	[LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
	[LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {

	const layoutType = useSelector((state) => state.theme.layout.type)

	const { authenticated } = useAuth()

	const location = useLocation()
	const [counter, setCounter] = useState(0)

	useDirection()

	useLocale()

	//Check Auth
	const { checkAuthenticate } = useAuth()

	const checkAuth = useCallback(async() => {
		if(location.pathname.split('/')[1] !== "reset_password"){
			await checkAuthenticate()
		}
	},[location, checkAuthenticate])

	useEffect(() => {
		if(counter === 0){
			checkAuth();
			setCounter(1)
		}
		
	}, [counter, checkAuth])
	//End check Auth

	const AppLayout = useMemo(() => {
		if (authenticated) {
			return layouts[layoutType]
		}
		return lazy(() => import('./AuthLayout'))
	}, [layoutType, authenticated])

	return (
		<Suspense 
			fallback={
				<div className="flex flex-auto flex-col h-[100vh]">
					<Loading loading={true} />
				</div>
			}
		>
			<AppLayout />
		</Suspense>
	)
}

export default memo(Layout)