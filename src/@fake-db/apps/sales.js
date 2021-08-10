import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  sales: [
    {
      id: "txn_1032HU2eZvKYlo2CEPtcnUvl",
      object: "balance_transaction",
      amount: 400,
      available_on: 1386374400,
      created: 1385814763,
      currency: "usd",
      description: "Charge for test@example.com",
      exchange_rate: null,
      fee: 42,
      fee_details: [
        {
          amount: 42,
          application: null,
          currency: "usd",
          description: "Stripe processing fees",
          type: "stripe_fee"
        }
      ],
      net: 358,
      reporting_category: "charge",
      source: "ch_1032HU2eZvKYlo2C0FuZb3X7",
      status: "available",
      type: "charge"
    }
  ],
  intendedPayments: [
    {
        id: "pi_1Dp8jd2eZvKYlo2CbOmqLWUP",
        object: "payment_intent",
        amount: 1000,
        amount_capturable: 0,
        amount_received: 0,
        application: null,
        application_fee_amount: null,
        canceled_at: null,
        cancellation_reason: null,
        capture_method: "automatic",
        charges: {
          object: "list",
          data: [],
          has_more: false,
          url: "/v1/chares?payment_intent=pi_1Dp8jd2eZvKYlo2CbUmqLWUA"
        },
        client_secret: "pi_1Dp8jd2eZvKYlo2CbUmqLWUA_secret_cVlqXXuXI1cpcbxwwRS8hXQA6",
        confirmation_method: "automatic",
        created: 1546670057,
        currency: "usd",
        customer: "Some client",
        description: "Red fish #34640",
        invoice: null,
        last_payment_error: null,
        livemode: false,
        metadata: {},
        next_action: null,
        on_behalf_of: null,
        payment_method: null,
        payment_method_options: {},
        payment_method_types: ["card"],
        receipt_email: null,
        review: null,
        setup_future_usage: null,
        shipping: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: "requires_payment_method",
        transfer_data: null,
        transfer_group: null
    },
    {
      id: "pi_1Dp8jd2eZvKYlo2CbUmqLWUP",
      object: "payment_intent",
      amount: 1000,
      amount_capturable: 0,
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: "automatic",
      charges: {
        object: "list",
        data: [],
        has_more: false,
        url: "/v1/chares?payment_intent=pi_1Dp8jd2eZvKYlo2CbUmqLWUA"
      },
      client_secret: "pi_1Dp8jd2eZvKYlo2CbUmqLWUA_secret_cVlqXXuXI1cpcbxwwRS8hXQA6",
      confirmation_method: "automatic",
      created: 1546670057,
      currency: "usd",
      customer: null,
      description: "Red fish #34640",
      invoice: null,
      last_payment_error: null,
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: null,
      payment_method_options: {},
      payment_method_types: ["card"],
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: "requires_payment_method",
      transfer_data: null,
      transfer_group: null
    }
  ],
  invoices: [
    {
      id: 4987,
      issuedDate: '13 Dec 2019',
      client: {
        address: '7777 Mendez Plains',
        company: 'Hall-Robbins PLC',
        companyEmail: 'don85@johnson.com',
        country: 'USA',
        contact: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      service: 'Software Development',
      total: 3428,
      avatar: '',
      invoiceStatus: 'Paid',
      balance: '$724',
      dueDate: '23 Apr 2019'
    },
    {
      id: 4988,
      issuedDate: '17 Jul 2019',
      client: {
        address: '04033 Wesley Wall Apt. 961',
        company: 'Mccann LLC and Sons',
        companyEmail: 'brenda49@taylor.info',
        country: 'Haiti',
        contact: '(226) 204-8287',
        name: 'Stephanie Burns'
      },
      service: 'UI/UX Design & Development',
      total: 5219,
      avatar: require('@src/assets/images/avatars/10-small.png').default,
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: '15 Dec 2019'
    },
    {
      id: 4989,
      issuedDate: '19 Oct 2019',
      client: {
        address: '5345 Robert Squares',
        company: 'Leonard-Garcia and Sons',
        companyEmail: 'smithtiffany@powers.com',
        country: 'Denmark',
        contact: '(955) 676-1076',
        name: 'Tony Herrera'
      },
      service: 'Unlimited Extended License',
      total: 3719,
      avatar: require('@src/assets/images/avatars/1-small.png').default,
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: '03 Nov 2019'
    },
    {
      id: 4990,
      issuedDate: '06 Mar 2020',
      client: {
        address: '19022 Clark Parks Suite 149',
        company: 'Smith, Miller and Henry LLC',
        companyEmail: 'mejiageorge@lee-perez.com',
        country: 'Cambodia',
        contact: '(832) 323-6914',
        name: 'Kevin Patton'
      },
      service: 'Software Development',
      total: 4749,
      avatar: require('@src/assets/images/avatars/9-small.png').default,
      invoiceStatus: 'Sent',
      balance: 0,
      dueDate: '11 Feb 2020'
    },
    {
      id: 4991,
      issuedDate: '08 Feb 2020',
      client: {
        address: '8534 Saunders Hill Apt. 583',
        company: 'Garcia-Cameron and Sons',
        companyEmail: 'brandon07@pierce.com',
        country: 'Martinique',
        contact: '(970) 982-3353',
        name: 'Mrs. Julie Donovan MD'
      },
      service: 'UI/UX Design & Development',
      total: 4056,
      avatar: require('@src/assets/images/avatars/10-small.png').default,
      invoiceStatus: 'Draft',
      balance: '$815',
      dueDate: '30 Jun 2019'
    },
    {
      id: 4992,
      issuedDate: '26 Aug 2019',
      client: {
        address: '661 Perez Run Apt. 778',
        company: 'Burnett-Young PLC',
        companyEmail: 'guerrerobrandy@beasley-harper.com',
        country: 'Botswana',
        contact: '(511) 938-9617',
        name: 'Amanda Phillips'
      },
      service: 'UI/UX Design & Development',
      total: 2771,
      avatar: '',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: '24 Jun 2019'
    },
    {
      id: 4993,
      issuedDate: '17 Sep 2019',
      client: {
        address: '074 Long Union',
        company: 'Wilson-Lee LLC',
        companyEmail: 'williamshenry@moon-smith.com',
        country: 'Montserrat',
        contact: '(504) 859-2893',
        name: 'Christina Collier'
      },
      service: 'UI/UX Design & Development',
      total: 2713,
      avatar: '',
      invoiceStatus: 'Draft',
      balance: '$407',
      dueDate: '22 Nov 2019'
    },
    {
      id: 4994,
      issuedDate: '11 Feb 2020',
      client: {
        address: '5225 Ford Cape Apt. 840',
        company: 'Schwartz, Henry and Rhodes Group',
        companyEmail: 'margaretharvey@russell-murray.com',
        country: 'Oman',
        contact: '(758) 403-7718',
        name: 'David Flores'
      },
      service: 'Template Customization',
      total: 4309,
      avatar: require('@src/assets/images/avatars/9-small.png').default,
      invoiceStatus: 'Paid',
      balance: '-$205',
      dueDate: '10 Feb 2020'
    },
    {
      id: 4995,
      issuedDate: '26 Jan 2020',
      client: {
        address: '23717 James Club Suite 277',
        company: 'Henderson-Holder PLC',
        companyEmail: 'dianarodriguez@villegas.com',
        country: 'Cambodia',
        contact: '(292) 873-8254',
        name: 'Valerie Perez'
      },
      service: 'Software Development',
      total: 3367,
      avatar: require('@src/assets/images/avatars/2-small.png').default,
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: '24 Dec 2019'
    }
  ]
}

// ------------------------------------------------
// GET: Return Intended Payments list
// ------------------------------------------------
mock.onGet('/apps/sales/intended').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { perPage = 10, page = 1 } = config
  /* eslint-enable */

  const filteredData = data.intendedPayments
    .sort(sortCompare('amount'))
    .reverse()
  /* eslint-enable  */
  return [
    200,
    {
      allData: data.intendedPayments,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.invoices
    .filter(
      invoice =>
        /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (invoice.client.companyEmail.toLowerCase().includes(queryLowered) ||
          invoice.client.name.toLowerCase().includes(queryLowered)) &&
        invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
    )
    .sort(sortCompare('id'))
    .reverse()
  /* eslint-enable  */
  return [
    200,
    {
      allData: data.invoices,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
// mock.onGet(/\/api\/invoice\/invoices\/\d+/).reply(config => {
//   const invoiceId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))
//   const invoiceIndex = data.invoices.findIndex(e => e.id === invoiceId)
//   const intendedIndex = data.intendedPayments.findIndex(e => e.id === invoiceId)
  
//   const responseData = {
//     invoice: data.invoices[invoiceIndex] || data.intendedPayments[intendedIndex],
//     paymentDetails: {
//       totalDue: '',
//       bankName: '',
//       country: '',
//       iban: '',
//       swiftCode: ''
//     }
//   }
//   console.log(responseData)
//   return [200, responseData]
// })

mock.onGet(/\/api\/invoice\/invoices\/?.*/).reply(config => {
  // // Get event id from URL
  // const stringId = String(config.url.substring(config.url.lastIndexOf('/') + 1))
  const invoiceId = config.url.substring(config.url.lastIndexOf('/') + 1)
  
  const invoiceIndex = data.invoices.findIndex(e => e.id === invoiceId)
  const intendedIndex = data.intendedPayments.findIndex(e => e.id === invoiceId)
  
  const responseData = {
    invoice: data.invoices[invoiceIndex] || data.intendedPayments[intendedIndex],
    paymentDetails: {
      totalDue: '',
      bankName: '',
      country: '',
      iban: '',
      swiftCode: ''
    }
  }
  console.log(responseData)
  return [200, responseData]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  // Get invoice id from URL
  let invoiceId = config.id

  // Convert Id to number
  invoiceId = Number(invoiceId)

  const invoiceIndex = data.invoices.findIndex(t => t.id === invoiceId)
  data.invoices.splice(invoiceIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => invoice.client)
  return [200, clients.slice(0, 5)]
})
