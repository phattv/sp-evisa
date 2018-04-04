// https://github.com/zeit/next.js#custom-configuration
// Configuration object for "next build" & "next export"

module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/apply": { page: "/apply" },
      "/contact": { page: "/contact" },
      "/feedback": { page: "/feedback" },
      "/fees": { page: "/fees" },
      "/how": { page: "/how" },
      "/news": { page: "/news" },
      "/partners": { page: "/partners" },
      "/privacy": { page: "/privacy" },
      "/services": { page: "/services" },
      "/terms": { page: "/terms" },
    };
  }
};
