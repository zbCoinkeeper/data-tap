module.exports = {
    assetsDir:"label_dist",
    devServer: {
      proxy: {
          //配置跨域
          '/label': {
            target: "http://106.52.211.35:8089",
            ws:true,
            changOrigin:true,
            pathRewrite: {}
        }
      }
    }
  };
