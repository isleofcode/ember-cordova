var CreateTask            = require('../tasks/create-cordova-project');
var UpdateGitIgnore       = require('../tasks/update-gitignore');
var UpdateWatchmanIgnore  = require('../tasks/update-watchman-config');
var camelize              = require('../utils/string.js').camelize;

var createProjectId = function(projectName) {
  return 'com.embercordova.' + projectName;
};

module.exports = function(options, project, ui) {
  options.projectName = camelize(project.name());

  var create = new CreateTask({
    id: options.cordovaid || createProjectId(options.projectName),
    name: options.name || options.projectName,
    project: project,
    ui: ui
  });

  var updateGitIgnore = new UpdateGitIgnore({
    project: project,
    ui: ui
  });

  var updateWatchmanIgnore = new UpdateWatchmanIgnore({
    project: project,
    ui: ui
  });

  return create.run(options.templatePath)
  .then(updateGitIgnore.prepare())
  .then(updateWatchmanIgnore.prepare());
};
