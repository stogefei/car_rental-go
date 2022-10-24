export interface IAppOption {
    globalData: {
        userInfo: Promise<WechatMiniprogram.UserInfo> | void
    }
    resolveUserInfo(userInfo: WechatMiniprogram.UserInfo): void
}