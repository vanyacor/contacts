import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 2,
    contacts: [
      { id: '0ivan', name: 'ivan', email: 'vanyakobernyk@gmail.com' },
      { id: '1stepan', name: 'stepan', email: 'lol@gmail.com' }
    ],
    lastContactsState: undefined
  },
  mutations: {
    deleteContact(state, payload) {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
    },
    addContact(state, { name, email } = {}) {
      state.contacts = [
        ...state.contacts,
        {
          id: state.count + name,
          name,
          email
        }
      ];

      state.count += 1;
    },
    assignAAield(state, { id, key, value }) {
      state.lastContactsState = state.contacts.map(item => ({ ...item }));

      state.contacts = state.contacts.map(contact => {
        return id === contact.id
          ? {
              ...contact,
              [key]: value
            }
          : contact;
      });
    },
    deleteContactField(state, { id, key } = {}) {
      state.lastContactsState = state.contacts.map(item => ({ ...item }));

      state.contacts = state.contacts.map((contact = {}) => {
        if (contact.id === id) delete contact[key];
        return contact;
      });
    },
    returnLastStep(state) {
      state.contacts = state.lastContactsState;
    }
  },
  getters: {
    getContacts: ({ contacts = [] }) => contacts,
    getContactById: ({ contacts = [] }) => id =>
      contacts.find(contact => contact.id === id) || false
  }
});
