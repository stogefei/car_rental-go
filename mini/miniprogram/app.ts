// app.ts
import {IAppOption} from "./appoption";
import {coolcar} from "./service/proto_gen/_pb";
let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
  },
  async onLaunch() {
    // 登录
    // Coolcar.login()
    wx.request({
      url: 'http://localhost:8080/trip/123',
      method: 'GET',
      success: (res) => {
        console.log(res, 'res')
        console.log(coolcar.TripStatus, 'TripStatus')
      },
      fail: (err) => {
        console.log(err, 'err')

      }
    })
    // 获取用户信息
    try {
      // const setting = null
      // if (setting.authSetting['scope.userInfo']) {
      //   const userInfoRes = null
      //   resolveUserInfo(userInfoRes.userInfo)
      // }
    } catch (err) {
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  }
})