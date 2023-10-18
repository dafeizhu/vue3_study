import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
    LOGOUT_URL = '/user/logout'
}
// 登录接口
export const reqLogin = (data: loginForm) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口
export const reqUserInfo = () =>
    request.get<any, userResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
