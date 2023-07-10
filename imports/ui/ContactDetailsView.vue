<template>
    <div id="contain-all">
        <div class="bg"></div>

        <div class="userDetails"
            style="display: flex;position: absolute; bottom: 0; left: 0; height: 6vh;width: 100vw;justify-content: space-between;">
            <router-link :to="{ name: 'home' }" class="w-10 bg-white btn p-2">Home</router-link>
            <button class="w-10 bg-white btn p-2" @click="logout">Logout</button>
        </div>

        <main class="contain-middle" v-if="contactdetails">
            <div v-if="loggedIn">

                <h1 class="h1">
                    {{ contactdetails.name }}
                    <br>
                    <span class="h4">{{ contactdetails.address }}</span>
                    <span class="editButton" style="position: relative; bottom: 0; right: 0;">
                        <router-link :to="{ name: 'editcontacts', params: { _id: this._id } }"
                            class="w-10 bg-white btn p-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg></router-link>
                    </span>
                </h1>

                <div class="contacts">

                    <h3 class="h3">Donations</h3>

                    <ul type="1" v-for="donation in contactdonations" :key="donation._id" v-if="contactdonations.length">
                        <router-link :to="{ name: 'donationdetails',  params: {_id: donation._id} }"
                            style="text-decoration: none;">
                            <li class="contactdetails">{{ donation.amount }}</li>
                        </router-link>
                    </ul>

                    <div class="d-flex justify-center m-1 p-0">
                        <router-link :to="{ name: 'adddonations', params: {_id: this._id} }" class="btn btn-lg addbutton p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </router-link>
                    </div>
                </div>
                <p class="copyright">&copy; 2021</p>
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

        <div class="reload" v-else>

            <button class="contactdetails btn" @click="handleClick">
                Click me to load contacts
            </button>

        </div>
    </div>
</template>

<style scoped>
.contain-middle h3 {

    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 0px;
    color: #fff;
    padding: 15px;
    text-align: center;
}

.contain-middle {
    width: 100%;
    max-width: 600px;
    margin: auto;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.contain-middle div {
    padding: 15px;
    align-items: center;
}

.contactdetails {

    background: rgba(255, 255, 255, 0.365);
    padding: 10px;
    width: 80%;
    margin: auto;

    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    font-weight: bolder;
}

.contactdetails:hover {
    background-color: rgba(20, 78, 78, 0.397);
    box-shadow: none;
    color: #ceb1f3;
    font-weight: bold;
}

.addbutton {
    width: 10%;
    margin: auto;
    background: rgba(125, 188, 237, 0.428);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
    color: #fff;
}
</style>

<script>
import { ContactsCollection } from '../api/ContactsCollection';
import { DonationsCollections } from '../api/DonationsCollections';

export default {
    props: ['_id'],
    data() {
        return {
            contactdetails: null,
            contactdonations: [],
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
        }
    },
    methods: {
        logout() {
            this.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        },
        getContactDetails() {
            return ContactsCollection.find({ _id: this._id }).fetch()[0]
        },
        getContactDonations() {
            return DonationsCollections.find({ donorid: this._id }).fetch()
        },
        handleClick() {
            this.contactdetails = this.getContactDetails();
            this.contactdonations = this.getContactDonations();
        }
    },
    created() {
        this.contactdetails = this.getContactDetails();
        this.contactdonations = this.getContactDonations();
    },
}

</script>