<template>
    <div id="contain-all">
        <div class="bg"></div>

        <div class="userDetails"
            style="display: flex;position: absolute; bottom: 0; left: 0; height: 6vh;width: 100vw;justify-content: space-between;">
            <router-link :to="{ name: 'home' }" class="w-10 bg-white btn p-2">Home</router-link>
            <button class="w-10 bg-white btn p-2" @click="logout">Logout</button>
        </div>

        <main class="contain-middle" v-if="contactdetails">
            <div class="m-0 p-0" v-if="loggedIn">

                <h1 class="h3">Edit Contacts</h1>
                <p v-if="editcontactErr" class="text-center text-white bg-danger">{{ editcontactErr }}</p>
                <form @submit.prevent="editcontact">

                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Contacts Name" required
                            v-model="name">
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingPassword" placeholder="Contact Address" required
                            v-model="address">
                        <label for="floatingPassword">Address</label>
                    </div>

                    <button class="w-100 btn btn-lg" type="submit" ref="editbutton">Submit</button>

                </form>
                <div style="display: flex;justify-content: center;margin-bottom: 10px;">
                    <button class="w-50 btn btn-lg bg-danger" @click="deletecontact">Delete?</button>
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
            name: null,
            address: null,
            editcontactErr: null,
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
        deletecontact() {
            Meteor.call('contact.delete', this._id);
            this.editcontactErr = "Successfully Deleted Information";
            this.$refs.editbutton.classList.add('disabled');
            setTimeout(()=>{
                this.$router.push({name: 'home'});
            }, 2000);
        },
        editcontact() {
            Meteor.call('contact.update', this._id, this.name, this.address);
            this.editcontactErr = "Successfully Updated Information"
        },
        getContactDetails() {
            return ContactsCollection.find({ _id: this._id }).fetch()[0]
        },
        handleClick() {
            this.contactdetails = this.getContactDetails();
            this.name = this.contactdetails.name;
            this.address = this.contactdetails.address;
        }
    },
    created() {
        this.contactdetails = this.getContactDetails();
        this.name = this.contactdetails.name;
        this.address = this.contactdetails.address;
    },
}

</script>