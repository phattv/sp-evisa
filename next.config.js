// https://github.com/zeit/next.js#custom-configuration
// Configuration object for "next build" & "next export"

// // "yarn dev" doesn't run .babel, replicate logic from env-config.js here
// const isProd =
//   process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
//
// const assetPrefix = isProd ? '/pro' : ''
// console.log('next.config.js - assetPrefix:', assetPrefix)

module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/" }
      // '/pages/about.html': { page: '/about' },
    };
  }
};
