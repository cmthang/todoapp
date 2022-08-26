<script>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
    <h2>Game Over !</h2>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}
</style>