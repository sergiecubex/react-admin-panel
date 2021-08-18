import axios from 'axios'
import { useState, useEffect } from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const AllAdmins = () => {
    const [users, setUsers] = useState([])
    
    async function collectionReadMany() {
        const ref = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`)
        const data = await ref.data
        console.log(await data)
        if (!data) return []
        return data
    }
    
    useEffect(() => {
        async function fetchData() {
          const res = await collectionReadMany()
          if (res) {
              console.log(res)
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
            {users?.map(user => user.email)}
          </CardText>
          <CardText>

          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default AllAdmins