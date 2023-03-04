module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // crucial 
    plugins: ['react-native-reanimated/plugin'],
  };
};
