// ** React Imports
import { Link } from 'react-router-dom'
import axios from 'axios'

// ** Store & Actions
import { deleteGig } from '../store/actions'
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
  Download,
  Edit,
  Trash,
  Copy
} from 'react-feather'

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]
}

const approveGig = async (row) => {
  let gig
  if (!row.approved) {
    gig = {...row, approved: true}
    alert(`Gig id #${row.id} approved`)
  } 
  await axios.post(`/apps/gigs/${row.id}`, gig) 
  store.dispatch(getData()) 
}

const waitlistGig = async (row) => {
  let gig
  if (row.isShortlisted) {
    gig = {...row, isShortlisted: false}
  } else {
    gig = {...row, isShortlisted: true}
  }
  await axios.post(`/apps/gigs/${row.id}`, gig)  
  alert(`Gig id #${row.id} was changed`)
  store.dispatch(getData())
}

// ** Table columns
export const columns = [
  {
    name: 'User',
    minWidth: '100px',
    selector: 'user',
    cell: row => {
      const userId = row.userId?._id || null
      return <Link to={`/apps/user-details/${userId}`}>{`${row.userId?.firstname} ${row.userId?.lastname}`}</Link>
    }
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    minWidth: '200px',
    cell: row => row.title
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
    cell: row => <span>${row.price || 0}</span>
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.approved === true) {
        return <p>Approved</p> 
      } 
      return <p>Not Approved</p>
    }
  },  {
    name: 'Waitlist',
    selector: 'waitlist',
    sortable: true,
    minWidth: '100px',
    cell: row => { 
      if (row.isShortlisted === true) {
        return <p>In waitlist</p> 
      } 
      return <p>Not waitlisted</p>
    }
  },
  {
    name: 'Action',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send size={17} id={`send-tooltip-${row._id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row._id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/apps/gigs-management/details/${row._id}`} id={`pw-tooltip-${row._id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row._id}`}>
          Preview Gig
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              approveGig(row)
              }}>
              <Download size={14} className='mr-50' />
              <span className='align-middle'>Approve</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/gigs-management/form/${row._id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              waitlistGig(row)
              }}>
              <Eye size={14} className='mr-50' />
              <span className='align-middle'>{ row.isShortlisted ? 'Remove from waitlist' : 'Add to waitlist'}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/apps/gigs'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                alert(`Are you sure you want to delete item # ${row._id}`)
                store.dispatch(deleteGig(row._id))
                alert(`Item # ${row._id} deleted`)
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
