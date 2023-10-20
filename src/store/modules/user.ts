import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('UserStore', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoute: constantRoute,
            userName: '',
            avatar: ''
        }
    },
    actions: {
        async userLogin(data: any) {
            let result: any = await reqLogin(data)
            if (result.code === 200) {
                this.token = result.data as string
                SET_TOKEN(result.data as string)
                // 能保证当前async函数返回成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        async userInfo() {
            let result: any = await reqUserInfo()
            if (result.code == 200) {
                this.userName = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {
            let result: any = await reqLogout()
            if (result.code == 200) {
                this.token = ''
                this.userName = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {}
})

export default useUserStore
