import nprogress from 'nprogress'
import router from '@/router'
import setting from '@/setting'
//引入进度条样式
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
nprogress.configure({ showSpinner: false })
router.beforeEach(async (to: any, from: any, next: any) => {
    nprogress.start()
    let userStore = useUserStore()
    let token = userStore.token
    let userName = userStore.userName
    if (token) {
        if (to.path === '/login') {
            // 登录成功 访问login 指向首页
            next({ path: '/' })
        } else {
            // 访问其他页面
            if (userName) {
                // 有用户信息
                next()
            } else {
                // 没有用户信息
                try {
                    //获取用户信息
                    await userStore.userInfo()
                    //放行
                    //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
                    next()
                } catch (error) {
                    //token过期:获取不到用户信息了
                    //用户手动修改本地存储token
                    //退出登录->用户相关的数据清空
                    await userStore.userLogout()
                    next({ path: '/login' })
                }
            }
        }
    } else {
        //用户未登录判断
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

router.afterEach((to: any, from: any) => {
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.done()
})
