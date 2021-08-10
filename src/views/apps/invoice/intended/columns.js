// ** React Imports
import { Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { deleteInvoice } from '../store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap'
import {
  Eye,
  TrendingUp,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

}

// ** Table columns
export const columns = [
  {
    name: 'Customer',
    minWidth: '50px',
    selector: 'id',
    cell: row => <Link to={`/apps/sales/preview/${row.id}`}>{`${row.customer}`}</Link>
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: '50px',
    selector: 'invoiceStatus',
    sortable: true,
    cell: row => {
      const color = row.status === "requires_payment_method" ? 'light-danger' : 'primary',
        Icon = row.status === "requires_payment_method" ? Info : Edit
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
        </Fragment>
      )
    }
  },
  {
    name: 'Description',
    minWidth: '150px',
    selector: 'description',
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{row.description}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '80px',
    cell: row => <span>${row.amount || 0}</span>
  },
  {
    name: 'Currency',
    selector: 'currency',
    sortable: true,
    minWidth: '80px',
    cell: row => <span>{row.currency || 'unknown'}</span>
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    minWidth: '100px',
    cell: row => {
      const date = new Date(row.created).toLocaleString()
      return <span>{date}</span>
    }
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '160px',
    cell: row => row.status
  },
  {
    name: 'Capture method',
    selector: 'capture_method',
    sortable: true,
    minWidth: '130px',
    cell: row => row.capture_method
  },
  {
    name: 'Confirmation method',
    selector: 'confirmation_method',
    sortable: true,
    minWidth: '200px',
    cell: row => row.confirmation_method
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
        <Link to={`/apps/sales/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoice
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
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteInvoice(row.id))
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
