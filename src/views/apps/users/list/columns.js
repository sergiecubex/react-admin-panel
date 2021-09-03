// ** React Imports
import { Link } from 'react-router-dom'
import axios from 'axios'
// ** Store & Actions
import { deleteUser, saveUser } from '../store/actions'
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

const suspendUser = async (id, user) => {
  let newUser
  if (user.isSuspended) {
    newUser = {isSuspended: false}
  } else {
    newUser = {isSuspended: true}
  }
  try {
    store.dispatch(saveUser(id, newUser))
    alert(`User id #${id} was changed`)
  } catch (error) {
    alert(error.message)
  }
}

// ** Table columns
export const columns = [
  {
    name: 'User',
    minWidth: '100px',
    selector: 'user',
    cell: row => {
      const userId = row._id || null
      return <Link to={`/apps/user-details/${userId}`}>{`${row.firstname} ${row.lastname}`}</Link> 
    }
  },
  {
    name: 'Email',
    minWidth: '100px',
    selector: 'email',
    cell: row => <span>{row.email}</span>
  },
  {
    name: 'Created',
    minWidth: '100px',
    selector: 'created',
    sortable: true,
    cell: row => {
      const date = row?.createdDate?.toLocaleString().replace('T', ' ').replace('Z', ' ') || null
      return <span>{date}</span>
    }
  },
  {
    name: 'Balance',
    minWidth: '100px',
    selector: 'balance',
    cell: row => <span>{row.balance}</span>
  },
  {
    name: 'Stripe',
    minWidth: '100px',
    selector: 'atripe',
    cell: row => <span onClick={() => {
      getStripedUsers(row.stripeAccountId)
    }}>{row.stripeAccountId}</span>
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.isSuspended === true) {
        return <p>Suspended</p> 
      } 
      return <p>Active</p>
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
              suspendUser(row._id, row)
              }}>
              <Eye size={14} className='mr-50' />
              <span className='align-middle'>{!row.isSuspended ? 'Suspend' : 'Unsuspend'}</span>
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
