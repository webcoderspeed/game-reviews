module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/reviews/:slug',
      handler: 'review.findOne',
      config: {
        auth: false,
      }
    }
  ]
}