import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Posts = new Mongo.Collection('posts');

// title, text, tags

if (Meteor.isServer) {
  Meteor.methods({
    addPost: function(title, text){
      Posts.insert({
        ownerId: Meteor.userId(),
        username: Meteor.users.findOne(Meteor.userId()).username,
        title: title,
        text: text,
        viewCount: 0,
        createdAt: new Date()
      });
    },
    editPost: function(id, title, text){
      Posts.update(id, {
        $set: {
          title: title,
          text: text
        }
      });
    },
    addTag: function(id, tag){
      Posts.update(id, {
        $set: {
          tag: tag
        }
      });
    },
    deletePost: function(id){
      Posts.remove(id);
    }
  });

  Meteor.publish('posts', function() {
    return Posts.find({});
  });

  Meteor.publish('userPosts', function() {
    return Posts.find({ownerId: this.userId}, {limit: 10, sort: {createdAt: -1}});
  });
}
