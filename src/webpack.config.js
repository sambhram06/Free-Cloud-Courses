module.exports = {
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/"),
        "global": require.resolve("global/"), 
      },
    },
  };
  