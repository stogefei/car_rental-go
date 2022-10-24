import { IAppOption } from "../../appoption";
import { routing } from "../../utils/routing";

interface Marker {
  iconPath: string
  id: number
  latitude: number
  longitude: number
  width: number
  height: number
}

const defaultAvatar = '/image/car.png'
const initialLat = 29.761267625855936
const initialLng = 121.87264654736123

Page({
  isPageShowing: false,
  socket: undefined as WechatMiniprogram.SocketTask | undefined,

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'), // 能否获取权限
    avatarURL: '',
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: initialLat,
      longitude: initialLng,
    },
    scale: 16,
    markers: [] as Marker[],
  },

  async onLoad() {
    const that = this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res:any) => {
              console.log(res, 'res')
              const userInfo = res.userInfo;
              that.setData({
                avatarURL: userInfo.avatarUrl,
              })
            }
          })
        }
      }
    })
  },

  async bindGetUserInfo() {
    const userInfo:any = await getApp<IAppOption>().globalData.userInfo;
    if(userInfo) {
      this.setData({
        avatarURL: userInfo.avatarUrl,
      })
    }
  },

  onMyTripsTap() {
    wx.navigateTo({
      url: routing.mytrips(),
    })
  },

  onMyLocationTap() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res, 'res--');
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        })
      }, 
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权',
        })
      }
    })
  },

  async onScanTap() {
    wx.navigateTo({
      url: '/pages/lock/lock',
    })
    // wx.scanCode({
    //   success: async () => {
    //     // 跳转到注册页面
    //     wx.navigateTo({
    //       url: '/pages/register/register',
    //     })
    //     // TODO: get car id from scan result
    //   },
    //   fail: console.error,
    // })
  },
})
