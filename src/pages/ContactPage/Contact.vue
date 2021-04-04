<template>
  <div class="contact">
    <div class="contact__wrapper">
      <div class="contact__top">
        <button class="contact__top-button-back" @click="$router.push('/')">
          Back
        </button>

        <h3>Contact</h3>
      </div>

      <div v-if="contact" class="contact__content">
        <div
          class="contact__content-field"
          v-for="(key, i) in Object.keys(contact)"
          :key="i"
        >
          <div>
            <span>{{ key }}:</span>

            <span v-if="!fieldsForChange[key]"> {{ contact[key] }}</span>

            <input
              v-else
              class="contact__content-field-input"
              type="text"
              :value="contact[key]"
              @blur="onBlur($event, key)"
            />
          </div>

          <div v-if="key !== 'id'">
            <button
              class="contact__content-button-delete"
              @click="deleteField(key)"
            >
              delete
            </button>
            <button
              class="contact__content-button-edit"
              @click="fieldsForChange[key] = true"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        Contact does not exist. Go back!
      </div>
    </div>

    <div class="contact__bottom">
      <button class="contact__button-add" @click="isAddFieldDisplaying = true">
        Add field
      </button>
      <button
        class="contact__button-return"
        :disabled="!isMutated"
        @click="isReversePopupDisplaying = true"
      >
        Return one step
      </button>
    </div>

    <add-field-popup
      v-model="isAddFieldDisplaying"
      v-bind="{
        id
      }"
      @mutated="isMutated = true"
    />

    <reverse-step-popup
      v-model="isReversePopupDisplaying"
      @reversed="isMutated = false"
    />
  </div>
</template>

<script>
import addFieldPopup from './addField';
import reverseStepPopup from './returnStepPopup';

export default {
  name: 'contact',
  components: { addFieldPopup, reverseStepPopup },
  data: () => ({
    fieldsForChange: undefined,
    isAddFieldDisplaying: false,
    isReversePopupDisplaying: false,
    isMutated: false
  }),
  watch: {
    isMutated(value) {
      if (value) this.setFieldsStatus();
    }
  },
  computed: {
    contact: ({ $store = {}, $route: { params: { id } = {} } = {} }) =>
      $store.getters.getContactById(id),
    id: ({ contact: { id } = {} }) => id
  },
  methods: {
    setFieldsStatus() {
      this.fieldsForChange = Object.keys(this.contact).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false
        }),
        {}
      );
    },
    onBlur({ target: { value } = {} }, key) {
      const { contact, id } = this;

      if (contact[key] === value) {
        this.fieldsForChange[key] = false;
      } else {
        this.$store.commit('assignAAield', {
          id,
          key,
          value
        });

        this.fieldsForChange[key] = false;
        this.isMutated = true;
      }
    },
    deleteField(key) {
      this.$store.commit('deleteContactField', {
        id: this.id,
        key
      });

      this.isMutated = true;
    }
  },
  beforeMount() {
    this.setFieldsStatus();
  }
};
</script>
