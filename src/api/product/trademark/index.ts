//品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'

enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update'
}

export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(
        `${API.TRADEMARK_URL}/${page}/${limit}`
    )

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        // 修改
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        // 新增
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}
