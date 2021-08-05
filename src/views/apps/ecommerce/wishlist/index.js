// ** React Imports
import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import classnames from 'classnames'
import { Star, X, Info } from 'react-feather'
import { Card, CardBody, CardText, Button, Alert } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getWaitlistItems, deleteWishlistItem } from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Wishlist = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
console.log(store)
  //** ComponentDidMount : get wishlist items
  useEffect(() => {
    dispatch(getWaitlistItems())
  }, [])

  // ** Renders wishlist products
  const renderWishlist = () => {
    return store.waitlist.map(item => {
      return (
        <Card className='ecommerce-card' key={item.title}>
          <div className='item-img text-center mx-auto'>
            <Link to={`/apps/gigs-management/details/${item.id}`}>
              <img className='img-fluid' src={item.image} alt={item.title} />
            </Link>
          </div>
          <CardBody>
            <div className='item-wrapper'>
              <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item mr-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className='item-cost'>
                <h6 className='item-price'>$ {item.price}</h6>
              </div>
            </div>
            <div className='item-name'>
              <Link to={`/apps/gigs-management/details/${item.id}`}>{item.title}</Link>
            </div>
            <CardText className='item-description'>{item.description}</CardText>
          </CardBody>
          <div className='item-options text-center'>
            <Button
              className='btn-wishlist remove-wishlist'
              color='light'
              onClick={() => {
                dispatch(deleteWishlistItem(item.id))
              }}
            >
              <X className='mr-25' size={14} />
              <span>Remove</span>
            </Button>
          </div>
        </Card>
      )
    })
  }

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Waitlisted Gigs' breadCrumbParent='Gigs Management' breadCrumbActive='Waitlist' />
      {store.waitlist.length ? (
        <section className='grid-view wishlist-items'>{renderWishlist()}</section>
      ) : (
        <Alert color='info'>
          <div className='alert-body'>
            <Info size={14} />
            <span className='align-middle ml-50'>No waitlisted Gigs</span>
          </div>
        </Alert>
      )}
    </Fragment>
  )
}

export default Wishlist
