// import { padString } from "../../utils/format"

// function formatDate(millis: number) {
//     const dt = new Date(millis)
//     const y = dt.getFullYear()
//     const m = dt.getMonth() + 1
//     const d = dt.getDate()
//     return `${padString(y)}-${padString(m)}-${padString(d)}`
// }

Page({
    redirectURL: '',
    profileRefresher: 0,

    data: {
        licNo: '',
        name: '',
        genderIndex: 0,
        genders: ['未知', '男', '女'],
        birthDate: '1990-01-01',
        licImgURL: '',
        state: 'UNSUBMITTED',
    },

    renderProfile() {
    },

    renderIdentity() {
    },

    onLoad(opt: Record<'redirect', string>) {
    },

    onUploadLic() {
        wx.chooseImage({
            success: async res => {
                if (res.tempFilePaths.length === 0) {
                    return
                }
                this.setData({
                    licImgURL: res.tempFilePaths[0]
                })
            }
        })
    },

    onGenderChange(e: any) {
        this.setData({
            genderIndex: parseInt(e.detail.value),
        })
    },

    onBirthDateChange(e: any) {
        this.setData({
            birthDate: e.detail.value,
        })
    },

    onSubmit() {

    },

    onUnload() {
        this.clearProfileRefresher()
    },

    scheduleProfileRefresher() {

    },

    clearProfileRefresher() {
        if (this.profileRefresher) {
            clearInterval(this.profileRefresher)
            this.profileRefresher = 0
        }
    },

    onResubmit() {
    },

    onLicVerified() {
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            })
        }
    }
})