<template>
    <div class="flex">
        <div class="h-screen">
            <Sidebar />
        </div>
        <div class="flex-1 overflow-auto">
            <Navbar />
            <AppMain />
        </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from "./components/SideBar/index.vue";
import Navbar from "./components/NavBar/index.vue";
import AppMain from "./components/AppMain/index.vue";
</script>