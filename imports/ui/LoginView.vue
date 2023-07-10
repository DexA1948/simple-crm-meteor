<template>
    <div id="contain-all">
        <div class="bg"></div>

        <main class="contain-middle">

            <div v-if="!loggedIn">

                <h1 class="h3">Login</h1>
                <p v-if="loginErr" class="text-center text-white bg-danger">{{ loginErr }}</p>
                <form @submit.prevent="login">

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required
                            v-model="email">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required
                            v-model="password">
                        <label for="floatingPassword">Password</label>
                    </div>

                    <button class="w-100 btn btn-lg" type="submit">Login</button>
                    <hr />
                    <router-link :to="{ name: 'register' }" class="w-100 btn btn-lg">Register</router-link>

                </form>
                <p class="copyright">&copy; 2021</p>
            </div>

            <div class="error p-4" v-else>
                <div class="row mb-2">
                    <div class="col">
                        <p class="text-center">You are already logged in.</p>
                        <button class="w-100 btn btn-lg" @click="logout">Logout</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <router-link class="btn btn-lg" :to="{ name: 'home' }">Home</router-link>
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
            email: 'user@example.com',
            password: 'password',
            loggedIn: localStorage.getItem('loggedIn') == 'true' ? true : false,
            loginErr: null,
        };
    },
    methods: {
        getUser(email, password) {
            let user = UsersCollections.find({ email: email, password: password }).fetch();
            console.log(user);
            return user;
        },
        login(event) {
            if (this.getUser(this.email, this.password).length) {
                this.loggedIn = true;
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('email', this.email);
                console.log(localStorage.getItem('loggedIn'));
                this.$router.push({ name: 'home' });
            } else {
                this.loginErr = "Login Failed, Please Retry";
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