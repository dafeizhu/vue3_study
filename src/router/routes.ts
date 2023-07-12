export const constantRoute = [
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'
    },
    {
        // 登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'layout'
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/404/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any'
    }
]
