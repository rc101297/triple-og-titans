<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const notyf = new Notyf();
const workouts = ref([]);
const isLoading = ref(true);
const editingWorkout = ref(null);
const editName = ref("");
const editDuration = ref("");

const fetchWorkouts = async () => {
  try {
    const res = await api.get("/workouts/getMyWorkouts");
    workouts.value = res.data.workouts || [];
  } catch (err) {
    if (err.response?.status === 404) {
      workouts.value = [];
    } else {
      notyf.error("Failed to load workouts");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteWorkout = async (id) => {
  if (!confirm("Are you sure you want to delete this workout?")) return;

  try {
    await api.delete(`/workouts/deleteWorkout/${id}`);
    notyf.success("Workout deleted successfully!");
    await fetchWorkouts();
  } catch (err) {
    notyf.error("Failed to delete workout");
  }
};

const completeWorkout = async (id) => {
  try {
    await api.patch(`/workouts/completeWorkoutStatus/${id}`, {
      status: "completed",
    });
    notyf.success("Workout marked as completed! 💪");
    await fetchWorkouts();
  } catch (err) {
    notyf.error("Failed to update workout status");
  }
};

const startEditing = (workout) => {
  editingWorkout.value = workout._id;
  editName.value = workout.name;
  editDuration.value = workout.duration;
};

const cancelEditing = () => {
  editingWorkout.value = null;
  editName.value = "";
  editDuration.value = "";
};

const updateWorkout = async (id) => {
  if (!editName.value.trim() || !editDuration.value.trim()) {
    notyf.error("Please fill in all fields");
    return;
  }

  try {
    await api.patch(`/workouts/updateWorkout/${id}`, {
      name: editName.value.trim(),
      duration: editDuration.value.trim(),
    });
    notyf.success("Workout updated successfully!");
    cancelEditing();
    await fetchWorkouts();
  } catch (err) {
    notyf.error("Failed to update workout");
  }
};

const handleWorkoutAdded = () => {
  fetchWorkouts();
};

onMounted(() => {
  fetchWorkouts();
  window.addEventListener("workoutAdded", handleWorkoutAdded);
});

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};

onUnmounted(() => {
  window.removeEventListener("workoutAdded", handleWorkoutAdded);
});
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center py-5">
      <div
        class="spinner-border"
        style="color: var(--forge-orange)"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2" style="color: var(--titan-steel)">
        ⏳ Forging your workout list...
      </p>
    </div>

    <div v-else-if="workouts.length === 0" class="text-center py-5">
      <p class="mb-4" style="color: var(--titan-steel); font-size: 1.1rem">
        🏋️‍♂️ No workouts yet. Start your journey by adding your first workout
        above!
      </p>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="workout in workouts"
        :key="workout._id"
        class="col-md-6 col-lg-4"
      >
        <div
          class="workout-card"
          :class="{ completed: workout.status === 'completed' }"
        >
          <div class="card-header">
            <h5 class="card-title mb-0">{{ workout.name }}</h5>
            <span class="duration-badge">{{ workout.duration }}</span>
          </div>

          <div class="card-body">
            <!-- Date Added -->
            <div class="date-display text-muted mb-2">
              <small>
                <i class="bi bi-calendar me-1"></i>
                Added on
                {{
                  formatDate(
                    workout.dateAdded || workout.createdAt || workout.date
                  )
                }}
              </small>
            </div>

            <!-- Edit Form (when editing) -->
            <div v-if="editingWorkout === workout._id" class="edit-form">
              <div class="mb-3">
                <label
                  class="form-label fw-semibold"
                  style="color: var(--titan-navy)"
                  >Workout Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="editName"
                  :style="{ borderColor: 'var(--titan-steel) !important' }"
                />
              </div>
              <div class="mb-3">
                <label
                  class="form-label fw-semibold"
                  style="color: var(--titan-navy)"
                  >Duration</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="editDuration"
                  :style="{ borderColor: 'var(--titan-steel) !important' }"
                />
              </div>
              <div class="edit-actions">
                <button
                  @click="updateWorkout(workout._id)"
                  class="btn btn-success btn-sm me-2"
                >
                  💾 Save
                </button>
                <button @click="cancelEditing" class="btn btn-secondary btn-sm">
                  ❌ Cancel
                </button>
              </div>
            </div>

            <!-- View Mode (when not editing) -->
            <div v-else>
              <div class="status-indicator">
                <span
                  class="status-text"
                  :class="{
                    'text-success': workout.status === 'completed',
                    'text-warning': workout.status !== 'completed',
                  }"
                >
                  <i
                    class="me-1"
                    :class="
                      workout.status === 'completed'
                        ? 'bi bi-check-circle-fill'
                        : 'bi bi-clock'
                    "
                  ></i>
                  {{ workout.status === "completed" ? "Completed" : "Pending" }}
                </span>
              </div>

              <div class="action-buttons mt-3">
                <div class="d-flex gap-1 flex-wrap">
                  <button
                    v-if="workout.status !== 'completed'"
                    @click="completeWorkout(workout._id)"
                    class="btn btn-success btn-sm"
                  >
                    ✅ Complete
                  </button>

                  <button
                    @click="startEditing(workout)"
                    :disabled="workout.status === 'completed'"
                    class="btn btn-primary btn-sm"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    @click="deleteWorkout(workout._id)"
                    class="btn btn-danger btn-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workout-card {
  background: white;
  border: 2px solid var(--titan-steel);
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.workout-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.workout-card.completed {
  opacity: 0.8;
}

.card-header {
  background: var(--titan-navy);
  color: var(--offwhite-sand);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-family: var(--font-header);
  font-size: 1.2rem;
  margin: 0;
}

.duration-badge {
  background: var(--forge-orange);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-body {
  padding: 1rem;
}

.date-display {
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.status-indicator .status-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.action-buttons .btn {
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
}

.btn-success {
  background-color: var(--forge-orange) !important;
  border-color: var(--forge-orange) !important;
}

.btn-success:hover {
  background-color: var(--muscle-gold) !important;
  border-color: var(--muscle-gold) !important;
}

.btn-danger {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

.btn-danger:hover {
  background-color: #c82333 !important;
  border-color: #c82333 !important;
}

.btn:disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
}

.btn-success:disabled {
  background-color: var(--titan-steel) !important;
  border-color: var(--titan-steel) !important;
}

.btn-primary:disabled {
  background-color: var(--titan-steel) !important;
  border-color: var(--titan-steel) !important;
}

@media (max-width: 768px) {
  .col-md-6 {
    margin-bottom: 1rem;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-buttons .btn {
    width: 100%;
  }
}
</style>
