<template>
    <div>
        <h1>登录</h1>
        <el-button type="primary" @click="counter.increment()">Primary</el-button>
        <div>current counter: {{ counter.count }}</div>
    </div>
</template>

<script setup lang='ts'>
import { useCounterStore } from '../../stores/counter.ts'
const counter = useCounterStore()

</script>

<style></style>