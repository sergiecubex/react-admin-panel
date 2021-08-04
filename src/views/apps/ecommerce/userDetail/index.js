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
import { getUser } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'

const User = () => {
  // ** Vars
  const params = useParams().user
  const productId = params.substring(params.lastIndexOf('-') + 1)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getUser(productId))
  }, [])
  console.log(store.userDetail)
  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='User Details' breadCrumbParent='User Management' breadCrumbActive='Details' />
      <div className='app-ecommerce-details'>
        USER
        {Object.keys(store.userDetail).length ? (
          <Card>
            <CardBody>
              <UserDetails
                dispatch={dispatch}
                userId={productId}
                getUser={getUser}
                // deleteGig={deleteGig}
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
