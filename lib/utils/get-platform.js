module.exports = function getPlatform(config, options) {
  var platform, defaultPlatform;
  defaultPlatform = config.cordovaPlatform;
  defaultPlatform? platform = defaultPlatform : platform = options.platform;

  return platform;
}
