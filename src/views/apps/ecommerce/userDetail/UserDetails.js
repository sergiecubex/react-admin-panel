// ** React Imports
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

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
  
  const handleSuspend = async (id) => {
    let newUser
    if (user.active) {
      newUser = {...user, active: false}
    } else {
      newUser = {...user, active: true}
    }
    await axios.post(`/apps/users/${id}`, newUser)  
    alert(`User id #${id} was changed`)
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
          <img src={`${process.env.REACT_APP_BASE_URL}/${user.avatar?.url}`} alt={user.email} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>Type: {user.userType.toUpperCase()}</h4>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>Name: {user.firstname} {user.lastname}</h4>
        </div>
        <h5>Email: {user.email}</h5>
        <h5>Statuses:</h5>
        <CardText>
          <div className='ml-25'>{user.active ? "User is active" : "Account is not active"}</div>
        </CardText>
        <CardText>
          <div className='ml-25'>{user.emailVerified ? "Email is verified" : "Email is not verified"}</div>
        </CardText>
        <CardText>Languages: {user.languages.length === 0 ? "Languages are not specified" : user.languages.map(lang => <span key={lang}>{lang} </span>)}
        </CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleSuspend(userId)}
          >
            <span>{user.active ? 'Suspend User' : 'Unsuspend User'}</span>
          </Button>
          <Button
              className='btn-wishlist'
              color='danger'
              onClick={() => handleDelete(userId, user.email)}
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
