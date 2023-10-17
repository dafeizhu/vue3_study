import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoute: constantRoute,
            userName: '',
            avatar: ''
        }
    },
    actions: {
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code === 200) {
                this.token = result.data.token as string
                SET_TOKEN(result.data.token as string)
                // 能保证当前async函数返回成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        async userInfo() {
            let result = await reqUserInfo()
            if (result.code == 200) {
                this.userName = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
            } else {
            }
        }
    },
    getters: {}
})

export default useUserStore
