import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
const allGlobalComponent: { [name: string]: Component } = { SvgIcon }

//引入element-plus全部图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
    // 务必叫做install方法
    install(app: App) {
        Object.keys(allGlobalComponent).forEach((key) => {
            app.component(key, allGlobalComponent[key])
        })
        // 将element-plus提供的图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
