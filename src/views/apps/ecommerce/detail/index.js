// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ProductDetails from './ProductDetails'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getGig, deleteGig, deleteWishlistItem, addToWishlist } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const params = useParams().product
  const productId = params.substring(params.lastIndexOf('-') + 1)
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.gigs)

  console.log(store)

  
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getGig(productId))
  }, [])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Gig Details' breadCrumbParent='Gigs Management' breadCrumbActive='Details' />
      <div className='app-ecommerce-details'>
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                productId={productId}
                getProduct={getGig}
                deleteGig={deleteGig}
                data={store.productDetail}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Details
