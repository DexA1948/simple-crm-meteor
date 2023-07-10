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
                <div class="contacts" v-if="contactdetails">
                    <h1 class="h3">Add Donations</h1>
                    <p v-if="adddonationErr" class="text-center text-white bg-danger">{{ adddonationErr }}</p>
                    <form @submit.prevent="adddonation">

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

                        <button class="w-100 btn btn-lg" type="submit" ref="addbutton">Add Donations</button>

                    </form>
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
import { Meteor } from "meteor/meteor"
import { ContactsCollection } from '../api/ContactsCollection';

export default {
    props: ['_id'],
    data() {
        return {
            amount: null,
            adddonationErr: null,
            contactdetails: null,
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
        }
    },
    methods: {
        logout() {
            this.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        },
        insertDonations(donorid, amount) {
            Meteor.call("donations.insert", donorid, amount);
            this.adddonationErr = "Donation Added Successfully";
            this.$refs.addbutton.classList.add('disabled');
            setTimeout(() => {
                this.$router.push({ name: 'home' });
            }, 2000);
        },
        adddonation(event) {
            this.insertDonations(this._id, this.amount)
        },
        getContactDetails() {
            return ContactsCollection.find({ _id: this._id }).fetch()[0]
        },
        handleClick() {
            this.contactdetails = this.getContactDetails();
            this.donorid = this._id;
        }
    },
    created() {
        this.contactdetails = this.getContactDetails();
        this.donorid = this._id;
    },

}

</script>