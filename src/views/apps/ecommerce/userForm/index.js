// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { InputGroup, InputGroupAddon, Input, Button, Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'
import classes from './form.module.css'

const UserForm = () => {
    
  const params = useParams().user
  const userId = params.substring(params.lastIndexOf('-') + 1)
  console.log(userId)
  // ** Vars
//   const {id} = useParams()
  const history = useHistory()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  const user = store.userDetail

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getUser(userId))
  }, [])
  
  const handleSave = () => {
      alert('Gig saved')
      history.push(`/apps/user-details/${userId}`)
  }
  
  const handleCancel = () => {
    history.push(`/apps/user-details/${userId}`)
}

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle={`User #${userId} edit form`} breadCrumbParent='User Management' breadCrumbActive='Edit Form' />
      <div className='app-ecommerce-details'>
        <Card>
            <CardBody>
                <h2>Name</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        value={user.name}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Email</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='textarea'
                        value={user.email}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>

                <InputGroup className={classes.buttons}>
                    <Button color='danger' onClick={handleCancel}>Cancel</Button>
                    <Button color='success' onClick={handleSave}>Save User</Button>
                </InputGroup>
            </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default UserForm