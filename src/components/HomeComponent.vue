<script>
</script>

<template>
  <div class="container-fluid main-content">
    <section class="hero">
      <h1>Unleash Your Inner Titan</h1>
      <p>
        Track your workouts, monitor your progress, and dominate your fitness
        goals.
      </p>
      <router-link
        class="btn btn-cta"
        active-class="active-link"
        exact-active-class="exact-active-link"
        :to="{ name: 'Workout' }"
        >Start Training</router-link
      >
    </section>

    <!-- FEATURES -->
    <div class="container my-4">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="feature-card">
            <h3>Workout Tracking</h3>
            <img
              src="../assets/gym1.png"
              alt="Workout Tracking"
              style="width: 100%; border-radius: 10px; margin-bottom: 15px"
            />
            <p>Record reps, sets, and weight with ease.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="feature-card">
            <h3>Progress Charts</h3>
            <img
              src="../assets/gym2.png"
              alt="Progress Charts"
              style="width: 100%; border-radius: 10px; margin-bottom: 15px"
            />
            <p>Visualize your strength gains over time.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="feature-card">
            <h3>Titan Challenges</h3>
            <img
              src="../assets/gym3.png"
              alt="Titan Challenges"
              style="width: 100%; border-radius: 10px; margin-bottom: 15px"
            />
            <p>Crush monthly challenges and earn badges.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* HERO */
.hero {
  background: var(--offwhite-sand);
  color: var(--offwhite-sand);
  padding: 50px 20px 60px;
  text-align: center;
}
.hero h1 {
  font-family: var(--font-header);
  font-size: 3rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.hero p {
  font-size: 1.2rem;
  margin-top: 10px;
}
.hero .btn-cta {
  margin-top: 10px;
  background: var(--forge-orange);
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
}
.btn-cta:hover {
  background: var(--muscle-gold);
}

/* FEATURES */
.feature-card {
  padding: 30px;
  background: white;
  border-radius: 12px;
  border: 2px solid var(--titan-steel);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
}
.feature-card h3 {
  font-family: var(--font-header);
  margin-bottom: 10px;
  text-transform: uppercase;
}
</style>