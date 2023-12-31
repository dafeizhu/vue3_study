import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件需要的代码
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入路由鉴权文件
import '@/router/permission'
import pinia from './store'
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})
    .use(globalComponent)
    .use(router)
    .use(pinia)
    .mount('#app')
