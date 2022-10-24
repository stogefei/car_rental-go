import { formatDuration, formatFee } from "../../utils/format"

function durationStr(sec: number) {
    const dur = formatDuration(sec)
    return `${dur.hh}:${dur.mm}:${dur.ss}`
}
const updateIntervalSec = 5
const initialLat = 30
const initialLng = 120
Page({
    timer: undefined as number|undefined,
    tripID: '',
    data: {
        location: {
            latitude: initialLat,
            longitude: initialLng,
        },
        scale: 12,
        elapsed: '00:00:00',
        fee: '0.00',
        markers: [
            {
                iconPath: "/image/car.png",
                id: 0,
                latitude: initialLat,
                longitude: initialLng,
                width: 20,
                height: 20,
            },
        ],
    },

    onLoad() {
        this.setupLocationUpdator()
        this.setupTimer()
    },

    onUnload() {
        wx.stopLocationUpdate()
        if (this.timer) {
            clearInterval(this.timer)
        }
    },

    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        })
        wx.onLocationChange(loc => {
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            })
        })
    },

    async setupTimer() {
        let seconds = 0;
        this.timer = setInterval(() => {
            seconds++;
            this.setData({
                fee: formatFee(seconds),
            })
            this.setData({
                elapsed: durationStr(seconds),
            })
        }, 1000)
    },

    onEndTripTap() {
    }
})