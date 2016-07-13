module.exports = function isCordovaLiveReload() {
  return process.env.CORDOVA_RELOAD_ADDRESS !== undefined;
};
