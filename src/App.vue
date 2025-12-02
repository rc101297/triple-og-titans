<script>
import FooterComponent from "./components/FooterComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
import { useGlobalStore } from "./stores/global.js";
import { onBeforeMount } from "vue";

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  setup() {
    const { getUserDetails } = useGlobalStore();

    onBeforeMount(() => getUserDetails(localStorage.getItem("token")));
  },
};
</script>

<template>
  <NavbarComponent />

  <router-view />

  <FooterComponent />
</template>

<style scoped>
</style>
