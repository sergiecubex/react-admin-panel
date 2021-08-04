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

const UserDetails = props => {
  // ** Props
  const { data, dispatch, getUser, deleteUser, userId } = props
  //state
  const [user, setUser] = useState(data)

  const handleDelete = (id) => {
    alert(`Are you sure you want to delete item ${id}?`)
    // dispatch(deleteGig(id))
    setUser(null)
  }

  if (user === null) return (
  <Row>
    <h2 style={{margin: "0 5%"}}>User was deleted</h2>
    <Link to={`/apps/users`}>
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
          <img className='img-fluid product-img' src={user.avatar} alt={user.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{user.name}</h4>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>{user.email}</h4>
        </div>
        <CardText>
          {/* <span className='ml-25'>{gig.title}</span> */}
        </CardText>
        {/* <CardText>{gig.description}</CardText> */}
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Link to={`/apps/user-details/form/${user.id}`}>
            <Button
              className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
              color='secondary'
              outline
            >
              <span>Change User</span>
            </Button>
          </Link>
          <Button
                className='btn-wishlist'
                color='danger'
                onClick={() => handleDelete(user.id)}
              >
                <span>Delete User</span>
              </Button>
        </div>
      </Col>
    </Row>
  )
}

export default UserDetails
