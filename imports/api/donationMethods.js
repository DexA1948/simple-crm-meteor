import { check } from 'meteor/check';
import { DonationsCollections } from './DonationsCollections';
 
Meteor.methods({
  'donations.insert'(donorid, amount) {
    check(donorid, String);
    check(amount, String)
    DonationsCollections.insert({donorid: donorid, amount:amount});
  },
  'donations.update'(donationid, donorid, amount){
    DonationsCollections.update(donationid, { $set: { donorid: donorid, amount: amount } });
  },
  'donations.delete'(donationid){
    DonationsCollections.remove({ _id: donationid });
  }
});