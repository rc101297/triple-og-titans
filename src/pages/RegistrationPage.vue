<template>
  <div class="container-fluid bg-light main-content">
    <h1 class="mb-5 pt-4 text-center fw-bold text-uppercase text-brown">
      🏋️‍♂️ Be a Titan!
    </h1>

    <div class="row d-flex justify-content-center">
      <div
        class="col-md-5 shadow-lg bg-white rounded-4 p-5 border border-2 form-container"
      >
        <form v-on:submit="handleSubmit">
          <div class="mb-3">
            <label
              for="emailInput"
              class="form-label fw-semibold mt-3 text-brown"
            >
              Email Address
            </label>
            <input
              type="email"
              class="form-control border-2 border-light-brown"
              :class="{ 'is-invalid': emailError }"
              id="emailInput"
              v-model="email"
              placeholder="Enter your email"
            />
            <div v-if="emailError" class="invalid-feedback">
              {{ emailError }}
            </div>
          </div>

          <div class="mb-3">
            <label
              for="passwordInput"
              class="form-label fw-semibold text-brown"
            >
              Password
            </label>
            <input
              type="password"
              class="form-control border-2 border-light-brown"
              :class="{ 'is-invalid': passwordError }"
              id="passwordInput"
              v-model="password"
              placeholder="Enter your password"
            />
            <div v-if="passwordError" class="invalid-feedback">
              {{ passwordError }}
            </div>
          </div>

          <div class="d-grid mt-5" id="regButton">
            <router-link
              type="submit"
              class="btn btn-lg text-white fw-semibold btn-brown"
              id="btn-active"
              v-if="isEnabled"
            >
              Join the Forge 💪
            </router-link>
            <router-link
              type="submit"
              class="btn btn-lg fw-semibold text-white btn-gray"
              id="btn-disabled"
              v-else
              disabled
            >
              Join the Forge 💪
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";

import { Notyf } from "notyf";

import api from "../api";

const email = ref("");
const password = ref("");

const isEnabled = ref(false);
const router = useRouter();
const { user } = useGlobalStore();

const notyf = new Notyf();

const emailError = ref("");
const passwordError = ref("");

watch([email, password], () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Email validation - must contain "@"
  if (emailValue === "") {
    emailError.value = "";
  } else if (!emailValue.includes("@")) {
    emailError.value = "Email must contain '@' symbol";
  } else {
    emailError.value = "";
  }

  // Password validation - must be at least 8 characters
  if (passwordValue === "") {
    passwordError.value = "";
  } else if (passwordValue.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
  } else {
    passwordError.value = "";
  }

  // Enable button only if all fields are filled and no errors
  isEnabled.value =
    emailValue !== "" &&
    passwordValue !== "" &&
    emailError.value === "" &&
    passwordError.value === "";
});

async function handleSubmit(e) {
  e.preventDefault();

  try {
    let res = await api.post("/users/register", {
      email: email.value,
      password: password.value,
    });

    if (res.data.message == "Registered Successfully") {
      notyf.success("Registered Successfully");
      email.value = "";
      password.value = "";
      router.push({ path: "/login" });
    }
  } catch (err) {
    // Check first if the error has a response (server replied)
    if (err.response) {
      if (err.response.status === 409) {
        // Email already exists
        notyf.error(err.response.data.message);
      } else if (err.response.status === 400) {
        // Bad request - validation errors
        notyf.error(err.response.data.message);
      } else if (err.response.status === 404 || err.response.status === 401) {
        notyf.error("Authentication failed. Please try again.");
      } else {
        notyf.error("Registration failed. Please contact administrator");
      }
    } else if (err.request) {
      // Request was sent but no response from server
      notyf.error("No response from server. Please check your connection.");
    } else {
      // Something else went wrong setting up the request
      notyf.error("Unexpected error occurred.");
    }
  }
}
</script>

<style scoped>
/* ---------- Colors & Typography ---------- */
.text-brown {
  color: var(--titan-navy);
}

.border-light-brown {
  border-color: var(--titan-steel) !important;
}

.btn-brown {
  background-color: var(--forge-orange) !important;
  color: var(--offwhite-sand) !important;
  border: none;
  font-family: var(--font-body);
  transition: background 0.3s ease;
}

.btn-brown:hover {
  background-color: var(--muscle-gold) !important;
}

.btn-gray {
  background-color: var(--titan-steel) !important;
  color: var(--offwhite-sand) !important;
  border: none;
  font-family: var(--font-body);
}

.btn-gray:hover {
  background-color: var(--titan-navy) !important;
}

/* ---------- Form Container ---------- */
.form-container {
  border-radius: 1.3rem;
  font-family: var(--font-body);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }

  .form-container {
    padding: 1.5rem !important;
  }

  .registration-form .mb-3 {
    margin-bottom: 1rem !important;
  }
}

/* ---------- Headings ---------- */
h1 {
  font-family: var(--font-header);
  color: var(--titan-navy);
}

/* Inputs & Textareas */
input {
  border: 2px solid var(--titan-steel) !important;
  font-family: var(--font-body);
}

/* Page Background */
.container-fluid {
  background-color: var(--offwhite-sand);
  min-height: 100vh;
}

/* Submit Button Grid */
#regButton {
  margin-top: 2rem;
}
</style>
