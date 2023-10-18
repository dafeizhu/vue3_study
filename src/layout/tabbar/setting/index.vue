<template>
    <el-button
        size="small"
        icon="Refresh"
        circle
        @click="updateRefresh"
    ></el-button>
    <el-button
        size="small"
        icon="FullScreen"
        circle
        @click="fullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
        :src="userStore.avatar"
        style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.userName }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
let $router = useRouter()
let layOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
const updateRefresh = () => {
    layOutSettingStore.refresh = !layOutSettingStore.refresh
}
const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//退出登录点击回调
const logout = async () => {
    //第一件事情:需要向服务器发请求[退出登录接口]******
    //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
    //第三件事情:跳转到登录页面
    await userStore.userLogout()
    //跳转到登录页面
    $router.push({ path: '/login' })
}
</script>
<script lang="ts">
export default {
    name: 'Setting'
}
</script>

<style scoped></style>
