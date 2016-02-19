const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
   defaults: {
       title: '',
       completed: false
   },

   toggle() {
       this.save({
          completed: !this.get('completed')
       });
   }
    
});