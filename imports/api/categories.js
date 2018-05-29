import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Categories = new Mongo.Collection('categories');

// name

if (Meteor.isServer) {
  Meteor.methods({
    addCategory: function(name){
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      Categories.insert({
        name,
        color
      });
    },
    deleteCategory: function(id){
      Categories.remove(id);
    }
  });

  Meteor.publish('categories', function() {
    return Categories.find();
  });
}
