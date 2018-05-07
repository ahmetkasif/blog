import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Posts = new Mongo.Collection('posts');

// title, text, tags

if (Meteor.isServer) {
  Meteor.methods({
    addPost: function(title, text){
      Posts.insert({
        authorId: Meteor.userId(),
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

  Meteor.publish('users', function() {
    let users = Meteor.users.find({}, { fields: { profile:1, username: 1, emails: 1 }});
    return users;
  });

  Meteor.publish('userProfile', function(username) {
    let user = Meteor.users.find({username: username}, { fields: { profile:1, username: 1, emails: 1 }});
    return user;
  });

  Meteor.publish('post', function(id) {
    return Posts.find({_id: id});
  });

  Meteor.publish('posts', function() {
    return Posts.find({});
  });

  Meteor.publish('userPosts', function(id) {
    return Posts.find({authorId: id}, {limit: 10, sort: {createdAt: -1}});
  });
}
