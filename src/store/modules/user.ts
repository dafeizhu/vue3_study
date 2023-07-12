import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm } from '@/api/user/type'
let useUserStore = defineStore('User', {
    state: () => {
        return {}
    },
    actions: {
        async userLogin(data: loginForm) {
            let result = await reqLogin(data)
            console.log(result)
        }
    },
    getters: {}
})

export default useUserStore
