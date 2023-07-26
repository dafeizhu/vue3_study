<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let fold = ref(false)
const changeIcon = () => {
    fold.value = !fold.value
}
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>

<style scoped></style>
