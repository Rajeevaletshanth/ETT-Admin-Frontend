import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut } from 'services/AuthService'
import { authenticate } from'services/ApiService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

	const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async ({ email, password, signedIn }) => {
        try {
			const resp = await apiSignIn({ email, password, signedIn })
			if (resp.data.isLoggedIn) {
				const { token } = resp.data
				dispatch(onSignInSuccess(token))
				if(resp.data.user) {
						dispatch(setUser({
							id: resp.data.user.id,
							avatar: resp.data.user.avatar, 
							username: resp.data.user.username, 
							authority: JSON.parse(resp.data.user.authority).role, 
							email: resp.data.user.email
						}))				
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)
				navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
                return {
                    status: 'success',
                    message: ''
                }
			}else{
				return {
                    status: 'failed',
                    message: resp.data.message
                }
			}
		} catch (errors) {
			return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
		}
    }

    const handleSignOut = ()  => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}

    const signOut = async () => {
		handleSignOut()
	}

	const checkAuthenticate = async() => {
		try {
		  	await authenticate();
		} catch (errors) {
			handleSignOut();
		}
	}
    
    return {
        authenticated: token && signedIn,
        signIn,
        signOut,
		checkAuthenticate
    }
}

export default useAuth