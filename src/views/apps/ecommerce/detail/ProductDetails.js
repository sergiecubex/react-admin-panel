// ** React Imports
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'

import {
  Row,
  Col,
  CardText,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

const Product = props => {
  const history = useHistory()
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, deleteGig, productId } = props
  //state
  const [gig, setGig] = useState('')
  
  useEffect(() => {
    setGig(data)
  }, [data])
  
  // ** Handle Wishlist item toggle
  // const handleWaitlist = val => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(productId))
  //   } else {
  //     dispatch(addToWishlist(productId))
  //   }
  //   dispatch(getProduct(productId))
  // }

  const handleDelete = (id) => {
    alert(`Are you sure you want to delete item ${id}?`)
    dispatch(deleteGig(id))
    setGig(null)
  }

  if (gig === null) return (
  <Row>
    <h2 style={{margin: "0 5%"}}>Gig was deleted</h2>
    <Link to={`/apps/gigs`}>
      <Button
        className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
        color='secondary'
        outline
      >
        <span>Go Back</span>
      </Button>
    </Link>
  </Row>
  )
  
  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={gig.image} alt={gig.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{gig.name}</h4>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>${gig.price}</h4>
        </div>
        <CardText>
          <span className='ml-25'>{gig.title}</span>
        </CardText>
        <CardText>{gig.description}</CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWaitlist(gig.isInWaitlist)}
          >
            <span>To Waitlist</span>
          </Button>
          <Link to={`/apps/gigs-management/form/${gig.id}`}>
            <Button
              className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
              color='secondary'
              outline
            >
              <span>Change Gig</span>
            </Button>
          </Link>
          <Button
              className='btn-wishlist'
              color='danger'
              onClick={() => handleDelete(gig.id)}
            >
              <span>Delete Gig</span>
          </Button>
          <Button
              className='btn-wishlist'
              color='light'
              onClick={() => history.push('/apps/gigs/details')}
            >
              <span>Back</span>
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default Product
