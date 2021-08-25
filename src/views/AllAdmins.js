import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const AllAdmins = () => {
  const [users, setUsers] = useState([])
  const [modal, setModal] = useState(false)
  const [deletedUser, setDeletedUser] = useState('')
  
  //get user status from state
  const store = useSelector(state => state.auth)
  console.log(store.userData.status)
  
  async function readAdmins() {
    const ref = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`)
    const data = await ref.data
    if (!data) return []
    return data
  }
  
  //get all gigs without token
  async function readGigs() {
    const token = localStorage.getItem('accessToken')
    console.log(`Access token: ${token}`)
    const ref = await axios.get(`${process.env.REACT_APP_BASE_URL}/gigs/all`, {
      headers: { Authorization: token}
    })
    console.log(ref)
    const data = await ref.data
    if (!data) return []
    return data
  }
    
  async function fetchData() {
    const res = await readAdmins()
    if (res) {
      setUsers(res)
    }
  }
    
  const deleteAdmin = useCallback(async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/${id}`)
    if (res.status === 200) {
      alert('User was deleted successfully!')
      fetchData()
    }
    setModal(false)
  }, [])
    
  useEffect(() => {
    //call fetch gigs function
    readGigs()
    console.log('render')
    fetchData()
  }, [deleteAdmin])
  
  const openModal = (id) => {
    setDeletedUser(id)
    setModal(true)
  }
  
  const Modal = () => {
    return (
      <div style={{position: 'fixed', top: '30%', left: '50%', width: '30%', textAlign: 'center', padding: 50, backgroundColor: '#FFFFFF', transform: 'translate(-50%, -50%)', zIndex: '10'}}>
        <h4 style={{margin: '1rem 0'}}>Are you sure you want to delete this User?</h4>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '60%', margin: '0 auto'}}>
          <button onClick={() => setModal(false)}>cancel</button>
          <button onClick={() => deleteAdmin(deletedUser)}>yes</button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {modal && <Modal />}
      <Card>
        <CardHeader>
          <CardTitle>List of admin users</CardTitle>
        </CardHeader>
        <CardBody>
            {users?.map((user, index) => {
              return (
                <div key={user.email} style={{display: 'flex', justifyContent: 'space-between', height: 30}}>
                  <div style={{width: '25%'}}>
                    <span> {index + 1}. </span>
                    <span><strong>Name:</strong> {user.name} </span>
                  </div>
                  <span style={{width: '20%'}}><strong>Email:</strong> {user.email} </span>
                  <span style={{width: '20%'}}><strong>Status:</strong> {user.status} </span>
                  {/* <span style={{color: 'red'}} onClick={() => deleteAdmin(user._id)}> */}
                  <span style={{color: 'red'}} onClick={() => openModal(user._id)}>
                    Delete
                  </span>
                </div>
              )
            })}
          <CardText>

          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default AllAdmins