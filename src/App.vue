<template>
  <h1>Hello App!</h1>
  <p>
    <!-- <strong>Current route path:</strong> {{ $route.fullPath }} -->
  </p>
  <nav>
    <RouterLink to="/home">Go to Home</RouterLink>
    <RouterLink to="/login">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>