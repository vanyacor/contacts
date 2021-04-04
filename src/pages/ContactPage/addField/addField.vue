<template>
  <popup v-model="showComponent">
    <div class="add-field">
      <div class="add-field__top"><h3>Add new Field</h3></div>
      <div class="add-field__content">
        <div class="add-field__content-field">
          <span>
            Field name
            <span class="add-field__warning">{{ nameWarning }}</span>
          </span>

          <input type="text" v-model="state.name" />
        </div>

        <div class="add-field__content-field">
          <span>
            Field value
            <span class="add-field__warning">{{ valueWarning }}</span>
          </span>

          <input type="text" v-model="state.value" />
        </div>
      </div>

      <div class="add-field__bottom">
        <button class="add-field__button-cancel" @click="showComponent = false">
          Cancel
        </button>
        <button class="add-field__button-add" @click="addField">Add</button>
      </div>
    </div>
  </popup>
</template>

<script>
import popup from '../../../components/popup';

export default {
  name: 'add-field',
  components: {
    popup
  },
  data: () => ({
    state: {
      name: undefined,
      value: undefined
    },
    nameWarning: undefined,
    valueWarning: undefined
  }),
  watch: {
    value(value) {
      if (!value) {
        this.state.name = undefined;
        this.state.value = undefined;
        this.nameWarning = undefined;
        this.valueWarning = undefined;
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
      const { state: { name = '', value = '' } = {} } = this;

      const message = 'is required';
      const nameField = name.trim();
      const valueField = value.trim();

      if (!nameField) this.nameWarning = 'Name ' + message;
      else this.nameWarning = undefined;

      if (!valueField) this.valueWarning = 'Value ' + message;
      else this.valueWarning = undefined;

      return !this.nameWarning && !this.valueWarning;
    },
    addField() {
      if (this.checkData()) {
        const { state: { name: key, value } = {}, id } = this;
        this.$store.commit('assignAAield', {
          id,
          key,
          value
        });

        this.state.name = undefined;
        this.state.value = undefined;
        this.showComponent = false;
        this.$emit('mutated');
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    }
  }
};
</script>
