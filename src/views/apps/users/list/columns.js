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
  if (row.userSuspended) {
    user = {...row, userSuspended: false}
  } else {
    user = {...row, userSuspended: true}
  }
  await axios.post(`/apps/users/${row.id}`, user)  
  alert(`User id #${row.id} was changed`)
  store.dispatch(getData())
}
// ** Table columns
export const columns = [
  // {
  //   name: 'User',
  //   minWidth: '100px',
  //   selector: 'user',
  //   cell: row => <Link to={`/apps/user-details/${row.id}`}>{`#${row.id}`}</Link> // users list
  // },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth: '200px',
    cell: row => row.name
  },
  {
    name: 'Created',
    minWidth: '100px',
    selector: 'user',
    sortable: true,
    cell: row => {
      const date = new Date(row.created).toLocaleString()
      return <span>{date}</span>
    }
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.userSuspended === true) {
        return <p>Suspended</p> 
      } 
      return <p>Active</p>
    }
  },
  {
    name: 'Total earnings',
    selector: 'total',
    sortable: true,
    minWidth: '100px',
    cell: row => row.totalEarnings
  },
  // {
  //   name: 'Price',
  //   selector: 'price',
  //   sortable: true,
  //   minWidth: '100px',
  //   cell: row => <span>${row.price || 0}</span>
  // },
  // {
  //   name: 'Days left',
  //   selector: 'execution-time',
  //   sortable: true,
  //   minWidth: '100px',
  //   cell: row => row.turnAroundTimeInDays
  // },
  {
    name: 'Action',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/apps/user-details/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
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
              <span className='align-middle'>{ row.userSuspended ? 'Unsuspend' : 'Suspend'}</span>
            </DropdownItem>
            {/* <DropdownItem tag={Link} to={`/apps/user-form/${row.id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}
            <DropdownItem
              tag='a'
              href='/apps/gigs'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                alert(`Are you sure you want to delete user ${row.name}`)
                store.dispatch(deleteUser(row.id))
                alert(`User ${row.name} deleted`)
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
