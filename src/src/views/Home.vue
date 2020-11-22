<template>
  <div>
    <h1 v-if="seen">Hello Gugoo!</h1>
    <a-input v-model="yourname"></a-input>
    <a-button @click="handleRua">change</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    
  },
  data() {
    return {
      yourname:"wzk",
      seen: false,
    };
  },
  watch: {

  },
  updated() {},
  mounted() {

  },
  methods: {
    handleRua(){
      this.seen = true
    }
  },
};
</script>
<style>

</style>