<template>
  <nav class="navbar navbar-expand-lg navbar-dark bar px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center" title="Tower Home">
        <img src="../assets/img/TowerT.png" alt="logo" />
        <img alt="logo" src="../assets/img/Vector (1).png" height="45" />
        <img src="../assets/img/TowerOwer.png" alt="logo" />

      </div>
    </router-link>



  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.bar {
  background-color: #2A2D3A;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
