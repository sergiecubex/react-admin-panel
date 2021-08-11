// ** React Imports
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import {
  Row,
  Col,
  CardText,
  Button
  // UncontrolledButtonDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu
} from 'reactstrap'

const UserDetails = props => {
  const history = useHistory()
  // ** Props
  const { data, dispatch, deleteUser, userId } = props
  //state
  const [user, setUser] = useState(data)

  const handleDelete = (id, email) => {
    alert(`Are you sure you want to delete user ${email}?`)
    dispatch(deleteUser(id))
    setUser(null)
  }

  if (user === null) return (
  <Row>
    <h2 style={{margin: "0 5%"}}>{`User id #${userId} deleted!`}</h2>
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
          {/* {user.name} */}
          {/* <img className='img-fluid product-img' src={user.avatar} alt={user.name} /> */}
        </div>
      </Col>
      <Col md='7' xs='12'>
        {/* <h4>{user.name}</h4> */}
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>{user.email}</h4>
        </div>
        <CardText>
          {/* <span className='ml-25'>{gig.title}</span> */}
        </CardText>
        {/* <CardText>{gig.description}</CardText> */}
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => alert('User suspended')}
          >
            <span>Suspend User</span>
          </Button>
          <Button
              className='btn-wishlist'
              color='danger'
              onClick={() => handleDelete(user._id.$oid, user.email)}
            >
              <span>Delete User</span>
          </Button>
          <Button
            className='btn-wishlist'
            color='light'
            onClick={() => history.push('/apps/users/details')}
          >
            <span>Back</span>
        </Button>
        </div>
      </Col>
    </Row>
  )
}

export default UserDetails
