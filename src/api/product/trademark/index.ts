//品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData } from './type'

enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}

export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(
        `${API.TRADEMARK_URL}/${page}/${limit}`
    )
