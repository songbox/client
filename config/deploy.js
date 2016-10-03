module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'songbox',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
