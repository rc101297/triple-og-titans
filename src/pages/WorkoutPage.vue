<script setup>
import { watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import { Notyf } from "notyf";
import api from "../api";
import AddWorkoutComponent from "../components/AddWorkoutComponent.vue";
import MyWorkoutsComponent from "../components/MyWorkoutsComponent.vue";

const router = useRouter();
const store = useGlobalStore();
const notyf = new Notyf();

// Check authentication
onMounted(() => {
  if (!store.user.token) {
    router.push({ name: "Login" });
    return;
  }
});
</script>

<template>
  <div class="container-fluid bg-light main-content">
    <!-- HEADER -->
    <div class="text-center py-5">
      <h1 class="display-4 fw-bold text-uppercase mb-3 titan-text">
        🏋️‍♂️ Forge Your Workouts
      </h1>
      <p class="lead text-muted">
        Track your strength, build your legacy, become unbreakable.
      </p>
    </div>

    <!-- ADD WORKOUT SECTION -->
    <div class="row justify-content-center mb-5">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm titan-card mb-4">
          <div class="card-header titan-header">
            <h3 class="mb-0 text-light">
              <span class="me-2">⚡</span>Add New Workout
            </h3>
          </div>
          <div class="card-body">
            <AddWorkoutComponent />
          </div>
        </div>
      </div>
    </div>

    <!-- MY WORKOUTS SECTION -->
    <div class="row justify-content-center py-5">
      <div class="col-lg-10">
        <div class="card border-0 shadow-sm titan-card">
          <div class="card-header titan-header">
            <h3 class="mb-0 text-light">
              <span class="me-2">📋</span>My Titan Workouts
            </h3>
          </div>
          <div class="card-body">
            <MyWorkoutsComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* BRAND COLORS */
.titan-text {
  color: var(--titan-navy);
  font-family: var(--font-header);
  letter-spacing: 1px;
}

.titan-card {
  border: 2px solid var(--titan-steel) !important;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.titan-header {
  background: var(--titan-navy);
  color: var(--offwhite-sand);
  border-bottom: 2px solid var(--forge-orange);
}

.lead {
  color: var(--titan-steel) !important;
}

/* PAGE BACKGROUND */
.container-fluid {
  background-color: var(--offwhite-sand);
  min-height: 100vh;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }

  .display-4 {
    font-size: 2.5rem;
  }

  .card-body {
    padding: 1.5rem !important;
  }
}
</style>
