<template>
  <popup v-model="showComponent">
    <div class="return-step-popup">
      <div class="return-step-popup__header">
        Are you sure you want to reverse last step?
      </div>
      <div class="return-step-popup__bottom">
        <button
          class="return-step-popup__button-cancel"
          @click="showComponent = false"
        >
          Cancel
        </button>
        <button class="return-step-popup__button-agree" @click="returnLastStep">
          Agree
        </button>
      </div>
    </div>
  </popup>
</template>

<script>
import popup from '../../../components/popup';

export default {
  name: 'return-step-popup',
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
    returnLastStep() {
      this.$store.commit('returnLastStep');
      this.$emit('reversed');
      this.showComponent = false;
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
