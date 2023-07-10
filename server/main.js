import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-password';

import '../imports/api/userMethods';
import '../imports/api/donationMethods';

import { UsersCollections } from '../imports/api/UsersCollections';
import { ContactsCollection } from '../imports/api/ContactsCollection';
import { DonationsCollections } from '../imports/api/DonationsCollections';

const insertUsers = user => UsersCollections.insert(user);
const insertContacts = contact => ContactsCollection.insert(contact);
const insertDonations = donation => DonationsCollections.insert(donation);

Meteor.startup(() => {

  if (UsersCollections.find({}).count() === 0) {
    insertUsers({
      email: "user@example.com",
      password: "password"
    })
  }

  if (ContactsCollection.find({}).count() === 0) {
    [
      {
        name: "Deshant Devkota",
        address: "Bharatpur-2, Chitwan",
      },
      {
        name: "Rodan Ramdam",
        address: "Thamel-2, Kathmandu",
      },
      {
        name: "Ravi Tamang",
        address: "FortyTwoTech, Keela",
      },
      {
        name: "Rabindra Joshi",
        address: "RaPraPaa",
      },

    ].forEach(insertContacts)
  }


  if (DonationsCollections.find({}).count() === 0) {
    [
      {
        donorid: 'yDTQJzYin2jHHujPR',
        amount: 300
      },
      {
        donorid: 'yDTQJzYin2jHHujPR',
        amount: 600
      },
      {
        donorid: 'yDTQJzYin2jHHujPR',
        amount: 700
      },

    ].forEach(insertDonations)
  }
});