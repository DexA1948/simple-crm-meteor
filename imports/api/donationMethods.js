import { check } from 'meteor/check';
import { DonationsCollections } from './DonationsCollections';
 
Meteor.methods({
  'donations.insert'(donorid, amount) {
    DonationsCollections.insert({donorid: donorid, amount:amount});
  },
 
});