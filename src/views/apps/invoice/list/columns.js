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

  // if (row.avatar.length) {
  //   return <Avatar className='mr-50' img={row.avatar} width='32' height='32' />
  // } else {
  //   return <Avatar color={color} className='mr-50' content={row.client ? row.client.name : 'John Doe'} initials />
  // }
}

// ** Table columns
export const columns = [
  // {
  //   name: <TrendingUp size={14} />,
  //   minWidth: '102px',
  //   selector: 'invoiceStatus',
  //   sortable: true,
  //   cell: row => {
  //     const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
  //       Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Edit
  //     return (
  //       <Fragment>
  //         <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
  //         <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
  //           <span className='font-weight-bold'>{row.invoiceStatus}</span>
  //           <br />
  //           <span className='font-weight-bold'>Balance:</span> {row.balance}
  //           <br />
  //           <span className='font-weight-bold'>Due Date:</span> {row.dueDate}
  //         </UncontrolledTooltip>
  //       </Fragment>
  //     )
  //   }
  // },
  {
    name: 'User',
    minWidth: '250px',
    selector: 'client',
    sortable: true,
    cell: row => {
      // const name = row.clientId?.email ? row.clientId?.firstNname : 'John Doe',
      //   email = row.clientId?.email ? row.client.companyEmail : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{row.userId?.firstname} {row.userId?.lastname}</h6>
            <small className='text-truncate text-muted mb-0'>{row.userId?.email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Frelancer',
    minWidth: '250px',
    selector: 'client',
    sortable: true,
    cell: row => {
      // const name = row.clientId?.email ? row.clientId?.firstNname : 'John Doe',
      //   email = row.clientId?.email ? row.client.companyEmail : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{row.projectId?.freelancerId?.firstname} {row.projectId?.freelancerId?.lastname}</h6>
            <small className='text-truncate text-muted mb-0'>{row.projectId?.freelancerId?.email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '100px',
    cell: row => {
      return row.amount !== 0 ? (
        <span>{row.amount}</span>
      ) : (
        <Badge color='light-success' pill>
          NULL
        </Badge>
      )
    }
  },
  {
    name: 'Total payed',
    selector: 'total',
    sortable: true,
    minWidth: '100px',
    cell: row => {
      return row.projectId?.transactionId?.totalAmount !== 0 ? (
        <span>{row.projectId?.transactionId?.totalAmount}</span>
      ) : (
        <Badge color='light-success' pill>
          NULL
        </Badge>
      )
    }
  },
  {
    name: 'Created',
    selector: 'created',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return <span>{row.date?.slice(0, 10)}</span>
    }
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: false,
    minWidth: '100px',
    cell: row => {
      return <span>{row.type}</span>
    }
  },
  {
    name: 'Project Status',
    selector: 'status',
    sortable: true,
    minWidth: '100px',
    cell: row => <span>{row.projectId?.status}</span>
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
          Preview
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
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
