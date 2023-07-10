<template>
    <div id="contain-all">
        <div class="bg"></div>

        <main class="contain-middle">

            <div v-if="loggedIn">

                <h1 class="h3">Reset Password</h1>
                <p v-if="resetErr" class="text-center text-white bg-danger">{{ resetErr }}</p>
                <form @submit.prevent="reset">

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required
                            v-model="email">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Old Password"
                            required v-model="password">
                        <label for="floatingPassword">Old Password</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="New Password"
                            required v-model="newpassword">
                        <label for="floatingPassword">New Password</label>
                    </div>

                    <button class="w-100 btn btn-lg" type="submit" ref="editbutton">Reset Password</button>
                    <hr />
                    <router-link :to="{ name: 'home' }" class="w-100 btn btn-lg">Home</router-link>

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
  
<script>

import { UsersCollections } from '../api/UsersCollections';
export default {
    data() {
        return {
            email: '',
            password: '',
            newpassword: '',
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
            resetErr: null,
        };
    },
    methods: {
        getUser(email) {
            let user = UsersCollections.find({ email: email }).fetch();
            console.log(user);
            return user;
        },
        reset(event) {
            let user = this.getUser(this.email);
            console.log(user);

            if (user.length) {
                let password = user[0].password;
                console.log(password);
                if (this.password == password) {
                    UsersCollections.update({ _id: user[0]._id }, { $set: { password: this.newpassword } });
                    this.resetErr = "Password Reset Successful";

                    this.$refs.editbutton.classList.add('disabled');
                    setTimeout(() => {
                        this.$router.push({ name: 'home' });
                    }, 2000);
                } else {
                    this.resetErr = "Old password doesn't match, please enter correct old password";
                }
            } else {
                this.resetErr = "User doesn't exist, please enter correct email";
            }
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