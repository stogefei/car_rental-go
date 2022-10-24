
import { routing } from "../../utils/routing"

interface Trip {
    id: string
    shortId: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
    inProgress: boolean
}

interface MainItem {
    id: string
    navId: string
    navScrollId: string
    data: Trip
}

interface NavItem {
    id: string
    mainId: string
    label: string
}

interface MainItemQueryResult {
    id: string
    top: number
    dataset: {
        navId: string
        navScrollId: string
    }
}

const tripStatusMap = new Map([
    ['IN_PROGRESS', '进行中'],
    ['FINISHED', '已完成'],
])

const licStatusMap = new Map([
    ['UNSUBMITTED', '未认证'],
    ['PENDING', '未认证'],
    ['VERIFIED', '已认证'],
])

Page({
    scrollStates: {
        mainItems: [] as MainItemQueryResult[],
    },

    layoutResolver: undefined as (()=>void)|undefined,

    data: {
        promotionItems: [
            {
                img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
                promotionID: 1,
            },            
            {
                img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
                promotionID: 2,
            },
            {
                img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
                promotionID: 3,
            },
            {
                img: 'https://img.mukewang.com/5f7141ad0001b36418720764.jpg',
                promotionID: 4,
            },
        ],
        licStatus: licStatusMap.get('UNSUBMITTED'),
        avatarURL: '',
        tripsHeight: 0,
        navCount: 0,
        mainItems: [] as MainItem[],
        mainScroll: '',
        navItems: [] as NavItem[],
        navSel: '',
        navScroll: '',
    },

    onLoad() {
        const trips:any = [];
        const navItems:any = [];
        for (let i = 0; i <100 ; i ++) {
            trips.push({
                id: 'main-' + i,
                navId: 'nav-' + i,
                data: {
                    id: 1000 + 1,
                    start: '东方明珠',
                    end: '迪士尼',
                    distance: '28.0公里',
                    duration: '28时33分',
                    fee: '190.00元',
                }
            })
            navItems.push({
                id: 'nav-' + i,
                mainId: 'main-' + i,
                label: '东方明珠',
            })
        }
        this.setData({
            mainItems: trips,
            navItems: navItems,
        })
    },

    onShow() {
    },

    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect => {
                const height = wx.getSystemInfoSync().windowHeight - rect.height
                this.setData({
                    tripsHeight: height,
                    navCount: Math.round(height/50),
                }, () => {
                    if (this.layoutResolver) {
                        this.layoutResolver()
                    }
                })
            }).exec()
    },

    populateTrips() {
    },

    prepareScrollStates() {
        wx.createSelectorQuery().selectAll('.main-item')
            .fields({
                id: true,
                dataset: true,
                rect: true,
            }).exec(res => {
                this.scrollStates.mainItems = res[0]
            })
    },

    onPromotionItemTap(e: any) {
        const promotionID:number = e.currentTarget.dataset.promotionId
        if (promotionID) {
            console.log('claiming promotion', promotionID)
        }
    },

    onGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            this.setData({
                avatarURL: userInfo.avatarUrl,
            })
        }
    },

    onRegisterTap() {
        wx.navigateTo({
            url: routing.register(),
        })
    },

    onNavItemTap(e: any) {
        const mainId: string = e.currentTarget?.dataset?.mainId
        const navId: string = e.currentTarget?.id
        if (mainId && navId) {
            this.setData({
                mainScroll: mainId,
                navSel: navId,
            })
        }
    },

    onMainScroll(e: any) {
        const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
        if (top === undefined) {
            return
        }

        const selItem = this.scrollStates.mainItems.find(
            v => v.top >= top)
        if (!selItem) {
            return
        }

        this.setData({
            navSel: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,
        })
    },

    onMianItemTap(e: any) {
        if (!e.currentTarget.dataset.tripInProgress) {
            return
        }
        const tripId = e.currentTarget.dataset.tripId
        if (tripId) {
            wx.redirectTo({
                url: routing.drving({
                    trip_id: tripId,
                }),
            })
        }
    }
})
