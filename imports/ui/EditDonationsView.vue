<template>
    <div id="contain-all">
        <div class="bg"></div>

        <div class="userDetails"
            style="display: flex;position: absolute; bottom: 0; left: 0; height: 6vh;width: 100vw;justify-content: space-between;">
            <router-link :to="{ name: 'home' }" class="w-10 bg-white btn p-2">Home</router-link>
            <button class="w-10 bg-white btn p-2" @click="logout">Logout</button>
        </div>

        <main class="contain-middle">

            <div v-if="loggedIn">
                <div class="contacts" v-if="donationdetails">
                    <h1 class="h3">Edit Donations</h1>
                    <p v-if="editdonationErr" class="text-center text-white bg-danger">{{ editdonationErr }}</p>
                    <form @submit.prevent="editdonation">

                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Donor Id" required
                                disabled :value="contactdetails.name">
                            <label for="floatingInput">Donor</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingPassword" placeholder="Amount" required
                                v-model="amount">
                            <label for="floatingPassword">Amount</label>
                        </div>

                        <button class="w-100 btn btn-lg" type="submit" ref="editbutton">Edit Donations</button>

                    </form>
                    <div style="display: flex;justify-content: center;margin-bottom: 10px;">
                        <button class="w-50 btn btn-lg bg-danger" @click="deletedonation">Delete?</button>
                    </div>
                    <p class="copyright">&copy; 2021</p>
                </div>
                <div v-else>
                    <ul>
                        <li class="contactdetails" @click="handleClick">
                            Click me to add donations
                        </li>
                    </ul>
                </div>
            </div>

            <div class="error p-4" v-else>
                <div class="row mb-2">
                    <div class="col">
                        <p class="text-center">You are not logged in. Login to continue.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <router-link class="btn btn-lg" :to="{ name: 'login' }">Login</router-link>
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>

<style scoped>
#floatingInput {
    margin-bottom: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

#floatingPassword {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
  
<script>
import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../api/ContactsCollection';
import { DonationsCollections } from '../api/DonationsCollections';

export default {
    props: ['_id'],
    data() {
        return {
            donorid: null,
            amount: null,
            editdonationErr: null,
            contactdetails: null,
            donationdetails: null,
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
        }
    },
    methods: {
        logout() {
            this.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        },
        deletedonation() {
            Meteor.call('donations.delete', this._id);
            this.editdonationErr = "Successfully Deleted Information"
            this.$refs.editbutton.classList.add('disabled');
            setTimeout(()=>{
                this.$router.push({name: 'home'});
            }, 2000);
        },
        editdonation() {
            Meteor.call('donations.update', this._id, this.donorid, this.amount);
            this.editdonationErr = "Successfully Updated Information"
        },
        getContactDetails(id) {
            return ContactsCollection.find({ _id: id }).fetch()[0]
        },
        getDonationDetails() {
            return DonationsCollections.find({ _id: this._id }).fetch()[0]
        },
        handleClick() {
            this.donationdetails = this.getDonationDetails();
            console.log(this.donationdetails);
            this.donorid = this.donationdetails.donorid;
            this.amount = this.donationdetails.amount;
            this.contactdetails = this.getContactDetails(this.donationdetails.donorid);
        },
    },
    created() {
        this.donationdetails = this.getDonationDetails();
        console.log(this.donationdetails);
        this.donorid = this.donationdetails.donorid;
        this.amount = this.donationdetails.amount;
        this.contactdetails = this.getContactDetails(this.donationdetails.donorid);
    },
}

</script>