import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../imports/ui/HomeView.vue';
import RegisterView from '../imports/ui/RegisterView.vue';
import LoginView from '../imports/ui/LoginView.vue';
import ResetPasswordView from '../imports/ui/ResetPasswordView.vue';
import ContactDetailsView from '../imports/ui/ContactDetailsView.vue';
import AddContactsView from '../imports/ui/AddContactsView.vue';
import EditContactsView from '../imports/ui/EditContactsView.vue';
import EditDonationsView from '../imports/ui/EditDonationsView.vue';
import AddDonationsView from '../imports/ui/AddDonationsView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: RegisterView,
        name: 'registedefaultr'
    },
    {
        path: '/home',
        component: HomeView,
        name: 'home'
    },
    {
        path: '/login',
        component: LoginView,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterView,
        name: 'register'
    },
    {
        path: '/resetpassword',
        component: ResetPasswordView,
        name: 'resetpassword'
    },
    {
        path: '/contactdetails/:_id',
        component: ContactDetailsView,
        name: 'contactdetails',
        props: true
    },
    {
        path: '/addcontacts',
        component: AddContactsView,
        name: 'addcontacts',
    },
    {
        path: '/editcontacts/:_id',
        component: EditContactsView,
        name: 'editcontacts',
        props: true
    },
    {
        path: '/editdonations/:_id',
        component: EditDonationsView,
        name: 'donationdetails',
        props: true
    },
    {
        path: '/adddonations/:_id',
        component: AddDonationsView,
        name: 'adddonations',
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;