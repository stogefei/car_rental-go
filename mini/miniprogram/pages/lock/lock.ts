const shareLocationKey = "share_location"
Page({
    carID: '',
    carRefresher: 0,
    data: {
        shareLocation: false,
        avatarURL: '',
    },

    async onLoad() {
    },

    bindGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            this.setData({
                avatarURL: userInfo.avatarUrl,
                shareLocation: wx.getStorageSync(shareLocationKey) || false,
            })
        }
    },

    onShareLocation(e: any) {
        this.data.shareLocation = e.detail.value
        wx.setStorageSync(shareLocationKey, this.data.shareLocation)
    },

    onUnlockTap() {
        wx.redirectTo({
            url: '/pages/driving/driving',
            complete: () => {
                wx.hideLoading()
            }
        })
        wx.getLocation({
            type: 'gcj02',
            success: async loc => {
                wx.showLoading({
                    title: '开锁中',
                    mask: true,
                })

                this.carRefresher = setInterval(async () => {
                    wx.redirectTo({
                        url: '/pages/driving/driving',
                        complete: () => {
                            wx.hideLoading()
                        }
                    })
                }, 2000)
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权位置信息',
                })
            }
        })
    },

    onUnload() {
        this.clearCarRefresher()
        wx.hideLoading()
    },

    clearCarRefresher() {
        if (this.carRefresher) {
            clearInterval(this.carRefresher)
            this.carRefresher = 0
        }
    },
})