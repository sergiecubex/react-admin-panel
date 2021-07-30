// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'


// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'

const Form = () => {
  // ** Vars
  const {id} = useParams()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** ComponentDidMount : Get product
//   useEffect(() => {
//     dispatch(getProduct(productId))
//   }, [])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Gig Edit Form' breadCrumbParent='Gigs Management' breadCrumbActive='Edit Form' />
      <div className='app-ecommerce-details'>
        <Card>
            <CardBody>
                <h1>Change item #{id}</h1>
            </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Form