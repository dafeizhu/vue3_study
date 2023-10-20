<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">
            添加品牌
        </el-button>

        <el-table style="margin: 10px 0px" border :data="trademarkArr">
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <!-- table-column:默认展示数据用div -->
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row }">
                    <img
                        :src="row.logoUrl"
                        style="width: 100px; height: 100px"
                    />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row }">
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                    ></el-button>
                    <!-- <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <template #reference> -->
                    <el-button
                        type="primary"
                        size="small"
                        icon="Delete"
                    ></el-button>
                    <!-- </template> 
                         </el-popconfirm> -->
                </template>
            </el-table-column>
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
            :total="total"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
    Records,
    TradeMarkResponseData
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
onMounted(() => {
    getHasTrademark()
})
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(
        pageNo.value,
        limit.value
    )
    total.value = result.data.total
    trademarkArr.value = result.data.records
}
</script>

<style scoped></style>
