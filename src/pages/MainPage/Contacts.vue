<template>
  <div class="contacts">
    <div class="contacts__top">
      <h1>Contacts</h1>

      <button class="contacts__button-add" @click="isAddPopupDispaying = true">
        Add contact
      </button>
    </div>

    <div
      class="contacts__contact"
      v-for="({ id, name, email }, i) in contacts"
      :key="i"
    >
      <div
        class="contacts__contact-info"
        @click="$router.push({ path: `/contact/${id}` })"
      >
        <div>
          Name: <span>{{ name }}</span>
        </div>

        <div>
          Email: <span>{{ email }}</span>
        </div>
      </div>
      <button
        class="contacts__contact-button-delete"
        @click="showDeletePopup(id)"
      >
        Delete
      </button>
    </div>

    <delete-contact-popup
      v-model="isDeletePopupDisplaying"
      v-bind="{ contactIdToDelete }"
      @clear="contactIdToDelete = undefined"
    />

    <add-contact-popup v-model="isAddPopupDispaying" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import deleteContactPopup from './deleteContact';
import addContactPopup from './addContact';

export default {
  name: 'contacts',
  components: { deleteContactPopup, addContactPopup },
  data: () => ({
    isAddPopupDispaying: false,
    isDeletePopupDisplaying: false,
    contactIdToDelete: undefined
  }),
  computed: {
    ...mapGetters({
      contacts: 'getContacts'
    })
  },
  methods: {
    showDeletePopup(id) {
      this.contactIdToDelete = id;
      this.isDeletePopupDisplaying = true;
    }
  }
};
</script>
