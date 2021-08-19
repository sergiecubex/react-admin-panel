import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const AllAdmins = () => {
  const [users, setUsers] = useState([])
  
  async function readAdmins() {
    const ref = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`)
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
    alert(`Are you sure you want to delete ${id}?`)
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/${id}`)
    if (res.status === 200) {
      alert('User was deleted successfully!')
      fetchData()
    }
  }, [])
    
  useEffect(() => {
    console.log('render')
    fetchData()
  }, [deleteAdmin])
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>List of admin users</CardTitle>
        </CardHeader>
        <CardBody>
            {users?.map((user, index) => {
              return (
                <div key={user.email} style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                    <span> {index + 1}. </span>
                    <span><strong>Name:</strong> {user.name} </span>
                  </div>
                  <span><strong>Email:</strong> {user.email} </span>
                  <span><strong>Status:</strong> {user.status} </span>
                  <span style={{color: 'red'}} onClick={() => deleteAdmin(user._id)}>
                    delete
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