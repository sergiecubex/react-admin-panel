// ** React Imports
import { useState, useEffect, useCallback } from 'react'
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
  const { data, dispatch, getProduct, deleteGig, productId } = props
  //state
  const [gig, setGig] = useState(null)
  
  const fetchGig = useCallback(async () => {
    setGig(data) 
  }, [data])
  
  useEffect(() => {
    fetchGig()
  }, [fetchGig])

  const handleDelete = (id) => {
    alert(`Are you sure you want to delete item ${id}?`)
    dispatch(deleteGig(id))
    setGig(null)
  }

  const imageUrl = data.gallery[0].url
  
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
          <img className='img-fluid product-img' src={imageUrl || ''} alt={gig.title} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        {/* <h4>{user}</h4> */}
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>${gig.price}</h4>
        </div>
        <CardText>
          <span className='ml-25'>{gig.title}</span>
        </CardText>
        <CardText>{gig.description}</CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          {/* <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWaitlist(gig.isInWaitlist)}
          >
            <span>To Waitlist</span>
          </Button> */}
          <Link to={`/apps/gigs-management/form/${productId}`}>
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
              onClick={() => handleDelete(productId)}
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
