export const getTime = () => {
    let hours = new Date().getHours()
    if (hours <= 9) {
        return '早上'
    } else if (hours <= 12) {
        return '上午'
    } else if (hours <= 18) {
        return '下午'
    } else {
        return '晚上'
    }
}
