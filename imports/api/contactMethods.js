import { check } from 'meteor/check';
import { ContactsCollection } from './ContactsCollection';
 
Meteor.methods({
  'contact.insert'(name, address, email) {
    check(name, String);
    check(address, String)
    ContactsCollection.insert({name: name, address:address, owner: email});
  },
  'contact.update'(id, name, address){
    ContactsCollection.update(id, { $set: { name: name, address: address } });
  },
  'contact.delete'(id){
    ContactsCollection.remove({ _id: id });
  }
});