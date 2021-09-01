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
  const { data, dispatch, saveUser, deleteUser, userId } = props
  //state
  const [user, setUser] = useState(data)
  
  const handleDelete = (id, email) => {
    alert(`Are you sure you want to delete user ${email}?`)
    dispatch(deleteUser(id))
    setUser(null)
  }
  
  const handleSuspend = async (id) => {
    let newUser
    if (user.isSuspended) {
      newUser = {isSuspended: false}
    } else {
      newUser = {isSuspended: true}
    }
    try {
      dispatch(saveUser(id, newUser))
      alert(`User id #${id} was changed`)
      history.push('/apps/users')
    } catch (error) {
      alert(error.message)
    }
  }
  
  if (user === null || user === {}) return (
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
  
  const avatarUrl = user?.avatar?.url === undefined ? '' : user.avatar.url
  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          {/* <img src={`https://hwdev.web-ai.studio/${avatarUrl}`} alt={user.email} /> */}
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>Type: {user?.userType?.toUpperCase()}</h4>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>Name: {user?.firstname} {user?.lastname}</h4>
        </div>
        <h5>Email: {user?.email}</h5>
        <h5>Balance: {user?.balance}</h5>
        <CardText>
          <span className='ml-25'>{user?.active ? "User is active" : "Account is not active"}</span>
        </CardText>
        <CardText>
          <span className='ml-25'>{user?.emailVerified ? "Email is verified" : "Email is not verified"}</span>
        </CardText>
        <CardText>Languages: {user?.languages?.length === 0 ? "Languages are not specified" : user?.languages?.map(lang => <span key={lang}>{lang} </span>)}
        </CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleSuspend(userId)}
          >
            <span>{!user?.isSuspended ? 'Suspend User' : 'Unsuspend User'}</span>
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
            onClick={() => history.push('/apps/users')}
          >
            <span>Back</span>
        </Button>
        </div>
      </Col>
    </Row>
  )
}

export default UserDetails
