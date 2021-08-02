// ** React Imports
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, Heart} from 'react-feather'
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
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props

  // ** Handle Wishlist item toggle
  const handleWishlist = val => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  const handleDelete = (id) => {
    console.log(`will be deleted item ${id}`)
  }
  // ** Handle Move/Add to cart
  // const handleCartBtn = (id, val) => {
  //   if (val === false) {
  //     dispatch(addToCart(id))
  //   }
  //   dispatch(getProduct(productId))
  // }

  // ** Condition btn tag
  // const CartBtnTag = data.isInCart ? Link : 'button'

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={data.image} alt={data.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.name}</h4>
        <CardText tag='span' className='item-company'>
          Freelance group?
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {data.brand}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>${data.price}</h4>
        </div>
        <CardText>
          <span className='ml-25'>{data.title}</span>
        </CardText>
        <CardText>{data.description}</CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>

          <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWishlist(data.isInWishlist)}
          >
            <Heart
              size={14}
              className={classnames('mr-50', {
                'text-danger': data.isInWishlist
              })}
            />
            <span>To Featured</span>
          </Button>
          <Link to={`/apps/gigs-management/form/${data.id}`}>
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
                onClick={(id) => handleDelete(data.id)}
              >
                <span>Delete Gig</span>
              </Button>

          {/* <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}
        </div>
      </Col>
    </Row>
  )
}

export default Product
