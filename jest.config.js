// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  };