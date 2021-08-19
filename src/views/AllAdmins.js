import axios from 'axios'
import { useState, useEffect } from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const AllAdmins = () => {
    const [users, setUsers] = useState([])
    
    async function readAdmins() {
      const ref = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`)
      const data = await ref.data
      if (!data) return []
      return data
    }
    
    useEffect(() => {
        async function fetchData() {
          const res = await readAdmins()
          if (res) {
            setUsers(res)
          }
        }
        fetchData()
    }, [])
    
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>List of admin users</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            {users?.map((user, index) => {
              return (
                <div key={user.email}>
                  <span> {index + 1}. </span>
                  <span>Name: {user.name} </span>
                  <span>Email: {user.email} </span>
                  <span>Status: {user.status} </span>
                </div>
              )
            })}
          </CardText>
          <CardText>

          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default AllAdmins