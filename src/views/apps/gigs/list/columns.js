// ** React Imports
import { Link } from 'react-router-dom'

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

// ** Table columns
export const columns = [
  {
    name: 'User',
    minWidth: '100px',
    selector: 'user',
    cell: row => <Link to={`/apps/gigs-management/details/${row.id}`}>{`#${row.id}`}</Link> // users list
  },
  {
    name: 'Created',
    minWidth: '100px',
    selector: 'user',
    sortable: true,
    cell: row => {
      const today = new Date()
      const date = `${today.getDate()}:${(today.getMonth() + 1)}:${today.getFullYear()}`
      const created = row.date ? row.created : date
      
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{created}</h6>
          </div>
        </div>
      )
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
    name: 'Days left',
    selector: 'execution-time',
    sortable: true,
    minWidth: '100px',
    cell: row => row.turnAroundTimeInDays
  },
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
        <Link to={`/apps/gigs-management/details/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Gig
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='mr-50' />
              <span className='align-middle'>Approve</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/gigs/form/${row.id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='mr-50' />
              <span className='align-middle'>Add to waitlist</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/apps/gigs'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                alert(`Are you sure you want to delete item # ${row.id}`)
                store.dispatch(deleteGig(row.id))
                alert(`Item # ${row.id} deleted`)
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
