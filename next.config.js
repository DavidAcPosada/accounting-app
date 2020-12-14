const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack']
    })
    return config
  }
})