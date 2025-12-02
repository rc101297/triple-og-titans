<template>
  <nav class="navbar navbar-expand-lg titan-navbar">
    <div class="container-fluid">
      <router-link
        class="navbar-brand d-flex align-items-center"
        active-class="active-link"
        exact-active-class="exact-active-link"
        :to="{ name: 'Home' }"
      >
        <img
          src="../assets/triple-og-titans-logo.png.png"
          alt="Triple OG Titans Logo"
          class="brand-logo me-2"
        />
        <span class="brand-text">TRIPLE O.G TITANS</span>
      </router-link>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Workout' }"
              >Workouts</router-link
            >
          </li>

          <!-- Auth Buttons - Show Login/Register when NOT logged in -->
          <li
            v-if="!user.token"
            class="nav-item d-flex align-items-center ms-lg-3"
          >
            <router-link
              class="btn-login me-2"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Login' }"
              >Login</router-link
            >
            <router-link
              class="btn-register"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li>

          <!-- Logout - Show only when logged in -->
          <li v-else class="nav-item ms-lg-3">
            <router-link
              class="nav-link logout-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Logout' }"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useGlobalStore } from "../stores/global.js";

const { user } = useGlobalStore();

// Navbar scroll state
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scroll > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>
/* NAVBAR BRAND COLORS */
.titan-navbar {
  background-color: var(--titan-navy);
  padding: 12px 20px;
}
.titan-navbar .navbar-brand span {
  font-family: var(--font-header);
  color: var(--offwhite-sand);
  letter-spacing: 1px;
  font-size: 1.3rem;
}
.titan-navbar .nav-link {
  color: var(--offwhite-sand) !important;
}
.titan-navbar .nav-link:hover {
  color: var(--forge-orange) !important;
}

/* LOGO IMAGE SIZE */
.brand-logo {
  height: 45px;
  width: auto;
}

/* BUTTONS */
.btn-login {
  padding: 6px 16px;
  border: 2px solid var(--forge-orange);
  border-radius: 8px;
  color: var(--forge-orange);
  font-weight: bold;
  text-transform: uppercase;
}

.btn-login:hover {
  background-color: var(--forge-orange);
  color: var(--offwhite-sand);
}

.btn-register {
  padding: 6px 16px;
  background-color: var(--forge-orange);
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-register:hover {
  background-color: var(--muscle-gold);
}

/* MOBILE TOGGLE BUTTON */
.navbar-toggler {
  border-color: var(--forge-orange) !important;
  background-color: transparent;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem rgba(215, 121, 34, 0.25) !important;
}

.navbar-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23d77922' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

.navbar-toggler:hover .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23f7a846' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e%3cpath stroke='%23f7a846' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

/* MOBILE */
@media (max-width: 992px) {
  .btn-login,
  .btn-register {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
