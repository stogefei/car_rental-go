const app = getApp()
// const img = '../../image/car3.png'
const img = '../../image/location.png'

Page({
  data: {
    latitude: 22.548297793851543,// 经度
    longitude: 113.943375798378, // 纬度
    markers: [], // 标记
  },
  onLoad () {
    this.setMark();
  },
  init() {
  },
  setMark () {
    // 自定义标记点
    const markObj = {
      id: 1,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      iconPath: img,
      width: '89rpx',
      height: '100rpx',
      shopType: 1,
      zIndex: 1
    }
    this.setData({
      markers: [markObj],
    })
  }
})
