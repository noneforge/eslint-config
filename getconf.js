import baseConfig from './dist/index_2.js';

const test = [...baseConfig];

test.forEach((config) => {
  if (config.languageOptions?.parser) {
    config.languageOptions.parser = 'unknown parser';
  };

  if (config.plugins) {
    config.plugins = Object.keys(config.plugins).reduce((acc, key) => {

      const info = config.plugins[key];
      if (info && typeof info === 'object') {
        acc[key] = Object.keys(info).reduce((rAcc, rKey) => {
          rAcc[rKey] = 'unknown';
          return rAcc;
        }, {});
    
        return acc;
      }

      return acc;
    }, {});
  }
});

console.dir(test, { depth: null });
