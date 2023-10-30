<template>
    <el-card class="box-card">
        <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addTrademark"
        >
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
                        @click="updateTrademark(row)"
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
            @size-change="sizeChange"
            @current-change="getHasTrademark"
        />
    </el-card>

    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
             title:设置对话框左上角标题
        -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
        <el-form style="width: 80%" ref="formRef">
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input
                    placeholder="请您输入品牌名称"
                    v-model="trademarkParams.tmName"
                ></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="trademarkParams.logoUrl"
                        :src="trademarkParams.logoUrl"
                        class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 具名插槽:footer -->
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">
                取消
            </el-button>
            <el-button type="primary" size="default" @click="confirm">
                确定
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
    Records,
    TradeMarkResponseData,
    TradeMark
} from '@/api/product/trademark/type'
import { UploadProps, ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
let formRef = ref()
//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
onMounted(() => {
    getHasTrademark()
})
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(
        pageNo.value,
        limit.value
    )
    total.value = result.data.total
    trademarkArr.value = result.data.records
}
//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark()
}
//添加品牌按钮的回调
const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true
}
const updateTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true
}
const cancel = () => {
    //对话框隐藏
    dialogFormVisible.value = false
}
const confirm = () => {
    //对话框隐藏
    dialogFormVisible.value = false
}
const beforeAvatarUpload: UploadProps['befroeUpload'] = (rawFile) => {
    if (
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/gif'
    ) {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小应小于4M'
            })
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式务必PNG|JPG|GIF'
        })
        return false
    }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址,添加一个新的品牌的时候带给服务器
    trademarkParams.logoUrl = response.data
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl')
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
