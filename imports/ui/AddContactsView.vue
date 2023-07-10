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

                <h1 class="h3">Add Contacts</h1>
                <p v-if="addcontactErr" class="text-center text-white bg-danger">{{ addcontactErr }}</p>
                <form @submit.prevent="addcontact">

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

                    <button class="w-100 btn btn-lg" type="submit" ref="addbutton">Add Contacts</button>

                </form>
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

import { ContactsCollection } from '../api/ContactsCollection';
export default {
    data() {
        return {
            name: '',
            address: '',
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
            addcontactErr: null,
        };
    },
    methods: {

        insertContacts(contact) {
            ContactsCollection.insert(contact);
            this.addcontactErr = "Contact Added Successfully";
            this.$refs.addbutton.classList.add('disabled');
            setTimeout(()=>{
                this.$router.push({name: 'home'});
            }, 2000);
        },
        addcontact(event) {
            this.insertContacts({ name: this.name, address: this.address });
        },
        logout() {
            this.loggedIn = false;
            localStorage.setItem('loggedIn', false);
        }
    },
    mounted() {
        console.log(localStorage.getItem('loggedIn'));
        console.log(this.loggedIn);
    },

};
</script>