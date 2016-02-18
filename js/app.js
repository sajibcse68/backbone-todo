const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;

require('todomvc-common/base');

global.ENTER_KEY = 13;
global.ESC_KEY = 27;
global.nunjucksEnv = new global.nunjucks.Environment(new global.nunjucks.PrecompiledLoader());


console.log('Hello World!!')

Backbone.history.start();

module.exports = new AppView({todos, filter});
