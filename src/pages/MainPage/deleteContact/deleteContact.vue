<template>
  <popup v-model="showComponent">
    <div class="delete-contact">
      <div class="delete-contact__header">
        Are you sure you want to delete contact with id: {{ contactIdToDelete }}
      </div>
      <div class="delete-contact__bottom">
        <button
          class="delete-contact__button-cancel"
          @click="showComponent = false"
        >
          Cancel
        </button>
        <button class="delete-contact__button-agree" @click="deleteContact">
          Agree
        </button>
      </div>
    </div>
  </popup>
</template>

<script>
import popup from '../../../components/popup';

export default {
  name: 'delete-contact',
  components: {
    popup
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
    deleteContact() {
      this.$store.commit('deleteContact', this.contactIdToDelete);
      this.$emit('clear');
      this.showComponent = false;
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    contactIdToDelete: {
      type: String,
      default: undefined
    }
  }
};
</script>
