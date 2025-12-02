<script setup>
import { watch, ref, onBeforeMount } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();
const store = useGlobalStore();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();

watch([email, password], (currentValue, oldValue) => {
  if (currentValue.every((input) => input !== "")) {
    isEnabled.value = true;
  } else {
    isEnabled.value = false;
  }
});

async function handleSubmit(e) {
  e.preventDefault();

  try {
    let res = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    if (res.data.message == "User logged in successfully") {
      notyf.success("Login Successfully");

      localStorage.setItem("token", res.data.access);
      await store.getUserDetails(res.data.access);

      email.value = "";
      password.value = "";

      router.push({ path: "/" });
    }
  } catch (err) {
    if (
      err.response.status === 404 ||
      err.response.status === 401 ||
      err.response.status === 400
    ) {
      notyf.error(err.response.data.message);
    } else {
      notyf.error("Login failed. Please contact administrator");
    }
  }
}

onBeforeMount(() => {
  if (store.user.token) {
    router.push({ path: "/workouts" });
  }
});
</script>

<template>
  <div class="container-fluid bg-light main-content">
    <h1 class="mb-5 pt-4 text-center fw-bold text-uppercase heading-text">
      🏋️‍♂️ Welcome Back, Titan!
    </h1>

    <div class="row d-flex justify-content-center">
      <div
        class="col-md-5 shadow-lg bg-white rounded-4 p-5 border border-2 mb-5 login-form"
      >
        <form v-on:submit="handleSubmit">
          <div class="mb-3">
            <label for="emailInput" class="form-label fw-semibold label-text">
              Email Address
            </label>
            <input
              type="email"
              class="form-control border-2 input-field"
              id="emailInput"
              v-model="email"
              placeholder="Enter your email"
            />
          </div>

          <div class="mb-3">
            <label
              for="passwordInput"
              class="form-label fw-semibold label-text"
            >
              Password
            </label>
            <input
              type="password"
              class="form-control border-2 input-field"
              id="passwordInput"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>

          <div class="d-grid mt-5">
            <button
              type="submit"
              class="btn btn-lg text-white fw-semibold btn-active"
              v-if="isEnabled"
            >
              Login 💪
            </button>
            <button
              type="submit"
              class="btn btn-lg fw-semibold text-white btn-disabled"
              v-else
              disabled
            >
              Login 💪
            </button>
          </div>

          <p class="text-center mt-4 text-text">
            Not a Titan yet?
            <router-link
              class="join-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Register' }"
              >Join the Forge
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Headings ---------- */
.heading-text {
  color: var(--titan-navy);
  font-family: var(--font-header);
}

/* Labels */
.label-text {
  color: var(--titan-navy);
  font-family: var(--font-body);
}

/* Inputs */
.input-field {
  border: 2px solid var(--titan-steel) !important;
  font-family: var(--font-body);
}

.input-field:focus {
  border-color: var(--forge-orange);
  box-shadow: 0 0 4px rgba(215, 121, 34, 0.4);
}

/* Page background */
.container-fluid {
  background-color: var(--offwhite-sand);
  min-height: 100vh;
}

/* Form container */
.login-form {
  border-radius: 1.3rem;
  font-family: var(--font-body);
}

/* Active Login button */
.btn-active {
  background-color: var(--forge-orange) !important;
  color: var(--offwhite-sand) !important;
  border: none;
  font-family: var(--font-body);
  transition: background 0.3s ease;
}

.btn-active:hover {
  background-color: var(--muscle-gold) !important;
}

/* Disabled Login button */
.btn-disabled {
  background-color: var(--titan-steel) !important;
  color: var(--offwhite-sand);
  border: none;
}

.btn-disabled:hover {
  background-color: var(--titan-navy) !important;
}

/* "Join the Forge" link */
.join-link {
  color: var(--forge-orange);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.join-link:hover {
  color: var(--muscle-gold);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }

  .login-form {
    padding: 1.5rem !important;
  }

  .mb-3 {
    margin-bottom: 1rem !important;
  }

  h1 {
    font-size: 2rem;
    padding-top: 2rem;
  }
}
</style>
