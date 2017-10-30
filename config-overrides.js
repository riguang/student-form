const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
//const rewirePreact = require('react-app-rewire-preact');
const rewireMobX = require('react-app-rewire-mobx');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    // use the Preact rewire
    // if (env === "production") {
    //     console.log("⚡ Production build with Preact");
    //     config = rewirePreact(config, env);
    // }
    config = rewireLess(config, env, {
        modifyVars: { "@primary-color": "#1DA57A" },
    });
    // use the MobX rewire
    config = rewireMobX(config,env);
    return config;
  };