import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据store类型
export interface UserState {
    token: string | null
    menuRoute: RouteRecordRaw[]
}
