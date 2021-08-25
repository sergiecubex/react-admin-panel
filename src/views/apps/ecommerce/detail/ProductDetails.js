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
  const { data, dispatch, deleteGig, productId } = props
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

  const imageUrl = data?.gallery[0]?.url
  const image = `${process.env.REACT_APP_BASE_URL}/${imageUrl}`
  
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
          <img className='img-fluid product-img' src={image ? image : '/assets/images/logo.png'} alt={gig.title} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <Link to={`/apps/user-details/${data.userId?._id}`}>
          <h4>USER: {data.userId?.email}</h4>
        </Link>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>Price: {data?.gigPackages[0]?.priceCurrency} {data?.gigPackages[0]?.price}</h4>
        </div>
        <CardText>
          Title:
          <span className='ml-25'>{gig?.title}</span>
        </CardText>
        <CardText>
          Category:
          <span className='ml-25'> {gig?.main_category} : {gig?.parent_subcategory} : {gig?.child_subcategory}</span>
        </CardText>
        <CardText><span className='ml-25'>{gig?.longDescription}</span></CardText>
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
