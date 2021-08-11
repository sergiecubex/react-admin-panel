// ** React Imports
import { Link } from 'react-router-dom'
import axios from 'axios'
// ** Store & Actions
import { deleteUser, getData } from '../store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap'
import {
  Eye,
  Send,
  MoreVertical,
  Trash
} from 'react-feather'

const suspendUser = async (row) => {
  let user
  if (row.active) {
    user = {...row, active: false}
  } else {
    user = {...row, active: true}
  }
  console.log(user)
  await axios.post(`/apps/users/${row._id}`, user)  
  alert(`User id #${row._id} was changed`)
  await store.dispatch(getData())
}
// ** Table columns
export const columns = [
  {
    name: 'User',
    minWidth: '100px',
    selector: 'user',
    cell: row => {
      const userId = row._id || null
      return <Link to={`/apps/user-details/${userId}`}>{`${row.email}`}</Link> 
    }
  },
  {
    name: 'Type',
    minWidth: '100px',
    selector: 'type',
    cell: row => <span>{row.userType}</span>
  },
  {
    name: 'Created',
    minWidth: '100px',
    selector: 'created',
    sortable: true,
    cell: row => {
      const date = row?.createdDate?.toLocaleString() || null
      return <span>{date}</span>
    }
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.active === true) {
        return <p>Active</p> 
      } 
      return <p>Suspended</p>
    }
  },
  {
    name: 'Verified',
    selector: 'verigied',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.emailVerified === true) {
        return <p>Verified</p> 
      } 
      return <p>Not verified</p>
    }
  },
  {
    name: 'Action',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {/* <Send size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip> */}
        <Link to={`/apps/user-details/${row._id}`} id={`pw-tooltip-${row._id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row._id}`}>
          Preview User
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              suspendUser(row)
              }}>
              <Eye size={14} className='mr-50' />
              <span className='align-middle'>{ row.active ? 'Suspend' : 'Unsuspend'}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/apps/users'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                alert(`Are you sure you want to delete user ${row.email}`)
                store.dispatch(deleteUser(row._id))
                alert(`User ${row.email} deleted`)
              }}
            >
              <Trash size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
