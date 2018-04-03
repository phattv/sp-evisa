paypal.Button.render({

  env: 'sandbox', // 'production' or 'sandbox'

  client: {
    sandbox:    'ARbpiltFosCc8bt1e1DnQvUeaWirbKNSdfNccETRH2cOnTn6jB5sg7tOTaHCMlyZngMBSgGIvZOCOk6S',
    production: 'AeposU75PsU1HDeKovqhb-komh_0cm5uJlbecPvnN4epIla8DyfOwTTvbrup8UWGv6vRiUMXPXFL-6kz'
  },

  commit: true, // Show a 'Pay Now' button

  payment: function(data, actions) {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: '1.00', currency: 'USD' }
          }
        ]
      }
    });
  },

  onAuthorize: function(data, actions) {
    return actions.payment.execute().then(function(payment) {

      // The payment is complete!
      // You can now show a confirmation message to the customer
    });
  },

  onCancel: function(data, actions) {
    /*
     * Buyer cancelled the payment
     */
  },

  onError: function(err) {
    /*
     * An error occurred during the transaction
     */
  }
}, '#paypal-button');