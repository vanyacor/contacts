<template>
  <div class="app container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

button,
input {
  outline: none;
}

.app {
  height: 100vh;
  width: 100vw;
}

.container {
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 720px) {
    max-width: 700px;
  }
}
</style>
