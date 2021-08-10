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
    },
    {
      id: "txn_1032HP2eZvKYlo2CEPtcnUvl",
      object: "balance_transaction",
      amount: 200,
      available_on: 1386374700,
      created: 1385814363,
      currency: "usd",
      description: "Charge for test@example.com",
      exchange_rate: null,
      fee: 23,
      fee_details: [
        {
          amount: 23,
          application: null,
          currency: "usd",
          description: "Stripe processing fees",
          type: "stripe_fee"
        }
      ],
      net: 177,
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
  ]
}

// ------------------------------------------------
// GET: Return Sales List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.sales
    // .filter(
    //   invoice =>
    //     /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
    //     (invoice.client.companyEmail.toLowerCase().includes(queryLowered) ||
    //       invoice.client.name.toLowerCase().includes(queryLowered)) &&
    //     invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
    // )
    .sort(sortCompare('amount'))
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
// GET: Return Intended Payments list
// ------------------------------------------------
mock.onGet('/apps/sales/intended').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
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
// GET: Return Single Sale
// ------------------------------------------------
mock.onGet(/\/api\/invoice\/invoices\/?.*/).reply(config => {
  // // Get event id from URL
  const invoiceId = config.url.substring(config.url.lastIndexOf('/') + 1)
  
  const invoiceIndex = data.sales.findIndex(e => e.id === invoiceId)
  const intendedIndex = data.intendedPayments.findIndex(e => e.id === invoiceId)
  
  const responseData = {
    invoice: data.sales[invoiceIndex] || data.intendedPayments[intendedIndex]
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

  const invoiceIndex = data.sales.findIndex(t => t.id === invoiceId)
  data.sales.splice(invoiceIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => invoice.client)
  return [200, clients.slice(0, 5)]
})
