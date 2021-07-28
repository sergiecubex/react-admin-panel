// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    activeView,
    addToCart,
    dispatch,
    getProducts,
    deleteGig,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(store.params))
  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }
  
  const handleDeleteBtn = id => {
    dispatch(deleteGig(id))
    dispatch(getProducts(store.params))
  }

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.id}>
            <Link to={`/apps/gigs-management/details/${item.id}`}>
              <div className='item-img text-center mx-auto'>
                {item.image ? <img className='img-fluid card-img-top' src={item.image} alt={item.name} /> : <h2 className='mx-auto'>No Image</h2>}
              </div>
            </Link>
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
                    <h6 className='item-price'>${item.price}</h6>
                  </div>
                </div>
                <h6 className='item-name'>
                  <Link className='text-body' to={`/apps/gigs-management/details/${item.slug}`}>
                    {item.name}
                  </Link>
                  <CardText tag='span' className='item-company'>
                    By{' '}
                    <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                      {item.brand}
                    </a>
                  </CardText>
                </h6>
                <CardText className='item-description'>{item.description}</CardText>
              </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <span>To Featured</span>
              </Button>
              <Button
                className='btn-wishlist'
                color='dark'
                onClick={() => handleDeleteBtn(item.id)}
              >
                <span>Delete</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
