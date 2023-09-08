// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// SVG Import
config.resolver.sourceExts.push('svg');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => !config.resolver.sourceExts.includes(ext));

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = config;
