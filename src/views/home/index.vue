<template>
    <div>首页</div>
</template>

<script setup lang="ts">
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
onMounted(() => {
    userStore.userInfo()
})
</script>

<style scoped></style>
