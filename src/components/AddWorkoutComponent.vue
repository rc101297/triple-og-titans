<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import api from "../api";
import { useGlobalStore } from "../stores/global";

const store = useGlobalStore();
const notyf = new Notyf();

const name = ref("");
const duration = ref("");
const isLoading = ref(false);
const showModal = ref(false);

const openModal = () => {
  if (!name.value.trim() || !duration.value.trim()) {
    notyf.error("Please fill in all fields");
    return;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const confirmAddWorkout = async () => {
  try {
    isLoading.value = true;
    closeModal();

    const res = await api.post("/workouts/addWorkout", {
      name: name.value.trim(),
      duration: duration.value.trim(),
    });

    if (res.status === 201 || res.status === 200) {
      notyf.success("Workout added successfully!");
      name.value = "";
      duration.value = "";
      // Emit event to refresh workouts list
      window.dispatchEvent(new CustomEvent("workoutAdded"));
    }
  } catch (err) {
    notyf.error("Failed to add workout. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Input Form -->
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label fw-semibold" style="color: var(--titan-navy)"
          >Workout Name</label
        >
        <input
          type="text"
          class="form-control border-2"
          v-model="name"
          placeholder="e.g. Chest Day, Leg Day"
          :style="{ borderColor: 'var(--titan-steel) !important' }"
        />
      </div>
      <div class="col-md-4">
        <label class="form-label fw-semibold" style="color: var(--titan-navy)"
          >Duration</label
        >
        <input
          type="text"
          class="form-control border-2"
          v-model="duration"
          placeholder="e.g. 45 mins"
          :style="{ borderColor: 'var(--titan-steel) !important' }"
        />
      </div>
      <div class="col-md-2 align-self-end">
        <button
          id="addWorkout"
          @click="openModal"
          class="btn w-100 py-2 fw-semibold text-white titan-btn"
          :disabled="isLoading"
        >
          <span class="me-2">⚡</span>
          Add Workout
        </button>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header titan-modal-header">
            <h5 class="modal-title fw-bold">⚡ Confirm Workout Addition</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body text-center">
            <div class="mb-4">
              <p class="mb-2 text-muted">Ready to forge this workout?</p>
              <div
                class="workout-summary border rounded-3 p-3"
                style="background-color: var(--offwhite-sand)"
              >
                <h6
                  class="workout-name mb-2 fw-bold"
                  style="color: var(--titan-navy)"
                >
                  {{ name }}
                </h6>
                <p
                  class="workout-duration mb-0"
                  style="color: var(--titan-steel)"
                >
                  <i class="bi bi-clock me-2"></i>{{ duration }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center gap-2">
            <button
              type="button"
              class="btn btn-secondary px-4"
              @click="closeModal"
            >
              <i class="bi bi-x-circle me-2"></i>Cancel
            </button>
            <button
              type="button"
              class="btn titan-confirm-btn px-4"
              :disabled="isLoading"
              @click="confirmAddWorkout"
            >
              <span v-if="isLoading" class="me-2">⏳</span>
              <span v-else class="me-2">💪</span>
              {{ isLoading ? "Adding..." : "Confirm Add" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div
      v-if="showModal"
      class="modal-backdrop fade show"
      @click="closeModal"
    ></div>
  </div>
</template>

<style scoped>
.form-label {
  color: var(--titan-navy);
}

.titan-btn {
  background-color: var(--forge-orange) !important;
  border: none;
  transition: background-color 0.3s ease;
}

.titan-btn:hover {
  background-color: var(--muscle-gold) !important;
}

.titan-btn:disabled {
  background-color: var(--titan-steel) !important;
}

/* Modal Styling */
.modal-content {
  border-radius: 1rem !important;
  overflow: hidden;
}

.titan-modal-header {
  background: var(--titan-navy);
  color: var(--offwhite-sand);
  border-bottom: 2px solid var(--forge-orange);
}

.workout-summary {
  border-color: var(--titan-steel) !important;
}

.titan-confirm-btn {
  background-color: var(--forge-orange) !important;
  border-color: var(--forge-orange) !important;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.titan-confirm-btn:hover {
  background-color: var(--muscle-gold) !important;
  border-color: var(--muscle-gold) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(247, 166, 70, 0.3);
}

.titan-confirm-btn:disabled {
  background-color: var(--titan-steel) !important;
  border-color: var(--titan-steel) !important;
  transform: none;
  box-shadow: none;
}

.modal-backdrop {
  background-color: rgba(14, 42, 57, 0.8) !important;
}

@media (max-width: 768px) {
  .col-md-2 {
    margin-top: 1rem;
  }

  .workout-summary {
    padding: 1.5rem !important;
  }

  .modal-footer .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .modal-footer .btn:last-child {
    margin-bottom: 0;
  }
}
</style>
