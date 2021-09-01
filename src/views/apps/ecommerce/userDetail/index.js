// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import UserDetails from './UserDetails'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser, saveUser } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'

const User = () => {
  // ** Vars
  const params = useParams().user
  const userId = params.substring(params.lastIndexOf('-') + 1)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
  
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getUser(userId))
  }, [])
 
  const st = useSelector(state => console.log(state))
  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='User Details' breadCrumbParent='User Management' breadCrumbActive='Details' />
      <div className='app-ecommerce-details'>
        {Object.keys(store?.userDetail).length ? (
          <Card>
            <CardBody>
              <UserDetails
                dispatch={dispatch}
                userId={userId}
                getUser={getUser}
                saveUser={saveUser}
                deleteUser={deleteUser}
                data={store.userDetail}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default User
