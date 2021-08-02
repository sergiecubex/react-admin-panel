// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { deleteInvoice } from '../store/actions'
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
    name: '#',
    minWidth: '107px',
    selector: 'id',
    cell: row => <Link to={`/apps/gigs-management/details/${row.id}`}>{`#${row.id}`}</Link>
  },
  {
    name: 'User',
    minWidth: '350px',
    selector: 'user',
    sortable: true,
    cell: row => {
      const name = row.client ? row.client.name : 'Unknown',
        email = row.client ? row.client.email : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>${row.price || 0}</span>
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    minWidth: '200px',
    cell: row => row.title
  },
  // {
  //   name: 'Balance',
  //   selector: 'balance',
  //   sortable: true,
  //   minWidth: '164px',
  //   cell: row => {
  //     return row.balance !== 0 ? (
  //       <span>{row.balance}</span>
  //     ) : (
  //       <Badge color='light-success' pill>
  //         Paid
  //       </Badge>
  //     )
  //   }
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
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/gigs/form/${row.id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteGig(row.id))
              }}
            >
              <Trash size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='mr-50' />
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
