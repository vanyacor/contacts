import Vue from 'vue';
import VueRouter from 'vue-router';

import Contacts from './pages/MainPage';
import Contact from './pages/ContactPage';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/contact/:id',
      name: 'Contact',
      component: Contact
    }
  ]
});
