<template>
    <div id="contain-all">
        <div class="bg"></div>

        <div class="userDetails" style="display: flex;position: absolute; bottom: 0; left: 0; height: 6vh;width: 100vw;justify-content: space-between;">
            <router-link :to="{ name: 'resetpassword' }" class="w-10 bg-white btn p-2">Reset Password</router-link>
            <button class="w-10 bg-white btn p-2" @click="logout">Logout</button>
        </div>

        <main class="contain-middle">

            <h1 class="h3">Contacts</h1>
            <p v-if="loginErr" class="text-center text-white bg-danger">{{ loginErr }}</p>

            <div v-if="loggedIn">
                <div class="d-flex justify-center m-1 p-0">
                    <router-link :to="{ name: 'addcontacts' }" class="btn btn-lg addbutton p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                            class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </router-link>
                </div>
                <hr />

                <div class="contacts" v-if="contacts.length !== 0">

                    <ul>
                        <router-link v-for="contact in contacts"
                            :to="{ name: 'contactdetails', params: { _id: contact._id } }" style="text-decoration: none;">
                            <li class="contactdetails">{{ contact.name }}</li>
                        </router-link>
                    </ul>

                </div>

                <div class="contacts" v-else>

                    <ul>
                        <li class="contactdetails" @click="handleClick">
                            Click me to load contacts
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

            <p class="copyright">&copy; 2021</p>
        </main>
    </div>
</template>

<style scoped>
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
    margin-bottom: 10px;
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
import { ContactsCollection } from "../api/ContactsCollection";

export default {
    data() {
        return {
            email: localStorage.getItem('email'),
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
            contacts: [],
        }
    },
    methods: {
        getContacts() {
            return ContactsCollection.find().fetch();
        },
        saveContacts() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
        },
        retrieveContacts() {
            const contacts = localStorage.getItem('contacts');
            if (contacts) {
                this.contacts = JSON.parse(contacts);
            }
        },
        handleClick() {
            console.log("Created");
            this.retrieveContacts();
            this.contacts = this.getContacts();
            console.log(this.contacts);
        },
        logout() {
            this.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        }
    },
    created() {
        console.log("Created");
        this.retrieveContacts();
        this.contacts = this.getContacts();
        console.log(this.contacts);
    },
    beforeDestroy() {
        console.log("Before Destroy");
        this.saveContacts();
    }
}
</script>