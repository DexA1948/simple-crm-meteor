import { check } from 'meteor/check';
import { UsersCollections } from './UsersCollections';
 
Meteor.methods({
  'users.insert'(email, password) {
    check(email, String);
    check(password, String);
 
    UsersCollections.insert({email: email, password: password});
  },
 
  'users.updatePassword'(id, newpassword) {
    check(id, String);
    check(newpassword, String);
 
    UsersCollections.update(id, { $set: { password: newpassword } });
  }
});