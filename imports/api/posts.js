import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Posts = new Mongo.Collection('posts');

// title, text, tags

if (Meteor.isServer) {
  Meteor.methods({
    addPost: function(title, text){
      Posts.insert({
        // TODOS
      });
    },
    editPost: function(id, title, text){
      Posts.update({
        // TODOS
      });
    },
    deletePost: function(id){
      Posts.remove(id);
    }
  });

  Meteor.publish('userPosts', function() {
    return Stats.find({authorId: this.userId}, {limit: 30, sort: {createdAt: -1}});
  });
}
