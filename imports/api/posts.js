import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Posts = new Mongo.Collection('posts');

// title, text, tags

if (Meteor.isServer) {
  Meteor.methods({
    addPost: function(title, text, categories){
      Posts.insert({
        authorId: Meteor.userId(),
        title: title,
        text: text,
        viewCount: 0,
        categories: categories,
        createdAt: new Date()
      });
    },
    editPost: function(id, title, text, categories){
      Posts.update(id, {
        $set: {
          title: title,
          text: text,
          categories: categories
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

  Meteor.publish('postsWithCategory', function(category) {
    return Posts.find({'categories' : { $in : [category]}});
  });

  Meteor.publish('userPosts', function(id) {
    return Posts.find({authorId: id}, {limit: 10, sort: {createdAt: -1}});
  });
}
