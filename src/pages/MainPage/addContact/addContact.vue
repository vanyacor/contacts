<template>
  <popup v-model="showComponent">
    <div class="add-contact">
      <div class="add-contact__top"><h3>Add new contact</h3></div>
      <div class="add-contact__content">
        <div class="add-contact__content-field">
          <span>
            Name
            <span class="add-contact__warning">{{ nameWarning }}</span>
          </span>

          <input type="text" v-model="name" />
        </div>

        <div class="add-contact__content-field">
          <span>
            Email
            <span class="add-contact__warning">{{ emailWarning }}</span>
          </span>

          <input type="text" v-model="email" />
        </div>
      </div>

      <div class="add-contact__bottom">
        <button
          class="add-contact__button-cancel"
          @click="showComponent = false"
        >
          Cancel
        </button>
        <button class="add-contact__button-add" @click="addContact">Add</button>
      </div>
    </div>
  </popup>
</template>

<script>
import popup from '../../../components/popup';

export default {
  name: 'add-contact',
  components: {
    popup
  },
  data: () => ({
    name: undefined,
    email: undefined,
    nameWarning: undefined,
    emailWarning: undefined
  }),
  watch: {
    value(value) {
      if (!value) {
        this.name = undefined;
        this.email = undefined;
        this.nameWarning = undefined;
        this.emailWarning = undefined;
      }
    }
  },
  computed: {
    showComponent: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    checkData() {
      const { name = '', email = '' } = this;

      const message = 'is required';
      const nameField = name.trim();
      const emailField = email.trim();

      if (!nameField) this.nameWarning = 'Name ' + message;
      else this.nameWarning = undefined;

      if (!emailField) this.emailWarning = 'Email ' + message;
      else this.emailWarning = undefined;

      return !this.nameWarning && !this.emailWarning;
    },
    addContact() {
      if (this.checkData()) {
        const { name, email } = this;
        this.$store.commit('addContact', {
          name,
          email
        });

        this.name = undefined;
        this.email = undefined;
        this.showComponent = false;
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>
