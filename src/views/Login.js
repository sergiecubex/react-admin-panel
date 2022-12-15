import { useState, useContext, useEffect, Fragment } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee, Mail } from 'react-feather'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import { useGoogleLogin } from 'react-google-login'
import {ReactComponent as ReactLogo} from '@src/assets/images/logo/logo.svg'


import '@styles/base/pages/page-auth.scss'
  
const ToastContent = ({ name, status }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {status} user to admin dashboard.</span>
    </div>
  </Fragment>
)
const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enable2Factor, setEnable2Factor] = useState(false)
  const [data, setData] = useState('')
  const [image, setImage] = useState('')
  
  const clientId = '748556428480-kpriq162t1ankg260tljmvebcepjks66.apps.googleusercontent.com' //TO DO: transfer to env
  // const project_id = "amplified-wares-310800"
  // const auth_uri = "https://accounts.google.com/o/oauth2/auth"
  // const token_uri = "https://oauth2.googleapis.com/token"
  // const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs"
  // const client_secret = "yLBHXGhcH1C8VpiDtGn-4-us"
  
  const { register, errors, handleSubmit } = useForm()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

    //refresh token in Google log in
  const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res?.tokenObj?.expires_in || 3600 - (5 * 60)) * 1000
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse()
      refreshTiming = (newAuthRes.expires_in || 3600 - (5 * 60)) * 1000
      console.log('newAuthRes:', newAuthRes)
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem('authToken', newAuthRes.id_token)
  
      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming)
    }
    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming)
  }
  
  //generate QR Code
  const enable2F = async (ref) => {
    try {
      const token = ref.data.token
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/2fa/generate`, {token})
      setImage(res.data) //setting qr code as image
    } catch (error) {
      alert(error.message)
    }
  }
  
  const confirm2FA = async () => {
    dispatch(handleLogin(data))
    history.push('/home')
    toast.success(
      <ToastContent name={data.name || 'no user name'} status={data.status || 'no user status'} />,
      { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    )
  }
  
  //modal window that shows QR code
  const Ask2FactorEnable = () => (
    <Alert color='info'>
      <div className='alert-body'>
        <div style={{width: '100%', textAlign: 'center'}}>
          If you want to enable 2 factor authentication scan the QR code!
          <img src={image} alt='qr code' />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <Button.Ripple className='mr-2' color='twitter' onClick={() => confirm2FA()}>
          Yes
        </Button.Ripple>
        <Button.Ripple color='google' onClick={() => setEnable2Factor(false)}>
          No
        </Button.Ripple>
      </div>
    </Alert>
  )
  
  //log in with email and password
  const onSubmit = async () => {
    if (isObjEmpty(errors)) {
      useJwt
        .login({ email, password })
        .then(res => {
          const data = { ...res.data.data.admin, accessToken: res.data.token, refreshToken: res.data.refreshToken }
          console.log("LOGIN", data)
          dispatch(handleLogin(data))
          setData(data)
          setEnable2Factor(true)
          enable2F(res)
          history.push(getHomeRouteForLoggedInUser(data.status))
          location.reload()
          toast.success(
            <ToastContent name={data.name || 'no user name'} role={data.status || 'no user status'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(err => console.log(err))
    }
  }
  
  //if google login failed
  const onFailure = (res) => {
    console.log('Login failed: res:', res)
  }
  //if Google login succeeded
  const onSuccess = async (res) => {
    const payload = await res?.profileObj?.email
    if (await payload) {
      try {
        const ref = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/verify`, { payload })
        if (ref.status === 200) {
          const data = { ...ref.data.data.admin, accessToken: ref.data.token }
          dispatch(handleLogin(data))
          history.push(getHomeRouteForLoggedInUser(data.status))
          location.reload()
          toast.success(
            <ToastContent name={res?.profileObj?.name || data.name || data.username} role={data.status || 'guest'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          refreshTokenSetup(res)
        }
      } catch (error) {
        alert("You are not authorized to login to this application! Please try again with other email...")
      }
    }
  }
  //consts of Google auth
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId
    // isSignedIn: true,
    // accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent'
  })
  
  //push Google submit button
  const onGoogleSubmit = () => {
    signIn()
  }
  
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <ReactLogo />
          <h2 className='brand-text text-primary ml-1'>Admin Panel</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            {enable2Factor && <Ask2FactorEnable />}
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Admin Panel! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account!</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Sign in
              </Button.Ripple>
              <Button.Ripple color='google' block onClick={onGoogleSubmit}>
              <Mail className='mr-2' size={14} />
                Sign in with Google
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
            {/* <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login