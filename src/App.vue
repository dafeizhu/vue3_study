<!--
 * @Author: huangzc
 * @Date: 2023-06-28 09:37:48
 * @LastEditors: huangzc
 * @LastEditTime: 2023-07-04 15:07:21
 * @Description: 
-->
<template>
  <div class="box">
    <h1>APP根组件2</h1>
    <el-button :icon="Plus">222</el-button>
    <Test></Test>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import Test from '@/components/Test.vue'
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  // background: #000;
  h1 {
    color: white;
  }
}
</style>
