import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
const allGlobalComponent: { [name: string]: Component } = { SvgIcon }
export default {
  // 务必叫做install方法
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  }
}
