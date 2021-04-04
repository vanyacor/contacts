<template>
  <div v-show="value" class="popup">
    <div class=" container">
      <slot>
        <div class="popup__mock">
          <span>
            There is nothing!
          </span>

          <button class="popup__button-close" @click="$emit('input', !value)">
            Close
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>
