import { useState, useContext } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'

import {ReactComponent as ReactLogo} from '@src/assets/images/logo/logo.svg'

import '@styles/base/pages/page-auth.scss'

const Register = () => {

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  const [valErrors, setValErrors] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('guest')


  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  // const Terms = () => {
  //   return (
  //     <Fragment>
  //       I agree to
  //       <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
  //         privacy policy & terms
  //       </a>
  //     </Fragment>
  //   )
  // }

  const onSubmit = async () => {
    if (isObjEmpty(errors)) {
      // try {
      //   const res = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/register`, {
      //     method: 'POST',
      //     body: JSON.stringify({name, email, password, confirmPassword, status}),
      //     headers: { 
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   if (res.ok) {
      //     alert(`Admin user ${res.statusText.toLowerCase()}`)
      //     history.push('/')
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
      useJwt
        .register({ name, email, password, confirmPassword, status })
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
            if (res.data.error.email !== null) console.error(res.data.error.email)
            if (res.data.error.name !== null) console.error(res.data.error.name)
          } else {
            console.log(res)
            setValErrors({})
            history.push('/')
          }
        })
        .catch(err => console.log(err))
    }
  }

  const handleNameChange = e => {
    const errs = valErrors
    if (errs.name) delete errs.name
    setName(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }
    
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <ReactLogo />
          <h2 className='brand-text text-primary ml-1'>Human Works</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Create new account
            </CardTitle>
            {/* <CardText className='mb-2'>Make your app management easy and fun!</CardText> */}

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={name}
                  placeholder='some name'
                  id='register-username'
                  name='register-username'
                  onChange={handleNameChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  placeholder='john@example.com'
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Confirm Password
                </Label>
                <InputPasswordToggle
                  value={confirmPassword}
                  id='confirm-password'
                  name='confirm-password'
                  className='input-group-merge'
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['confirm-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='status'>
                  Status
                </Label>
                <Input
                  type='select'
                  value={status}
                  id='status'
                  name='status'
                  placeholder='choose status'
                  onChange={e => setStatus(e.target.value)}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                >
                  <option>guest</option>
                  <option>admin</option>
                  <option>superadmin</option>
                </Input>
              </FormGroup>
              {/* <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup> */}
              <Button.Ripple type='submit' block color='primary'> 
                Create Admin User
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p> */}
            <div className='divider my-1'>
              {/* <div className='divider-text'></div> */}
            </div>
            <Button.Ripple block color='light' onClick={history.goBack}> 
                Cancel
            </Button.Ripple>
            {/* <div className='auth-footer-btn d-flex justify-content-center'>
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

export default Register
