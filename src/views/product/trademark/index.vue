<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">
            添加品牌
        </el-button>

        <el-table style="margin: 10px 0px" border>
            <el-table-column
                label="序号"
                width="80px"
                align="center"
            ></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO"></el-table-column>
            <el-table-column label="品牌操作"></el-table-column>
        </el-table>

        <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
        <el-pagination
            :pager-count="9"
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="400"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
</script>

<style scoped></style>
