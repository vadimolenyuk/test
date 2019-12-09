import Vue from "vue"
import { APPDB_GET_ID } from "@/store/actions/appdb"

export default {
    methods: {
        setFavicon(URL) {
            let favlink = document.querySelector("link[rel*='icon']") || document.createElement("link")
            favlink.type = "image/x-icon"
            favlink.rel = "shortcut icon"
            favlink.href = URL
            document.getElementsByTagName("head")[0].appendChild(favlink)
        },
        setWebFont(URL) {
            let head = document.getElementsByTagName("head")[0]
            let link = document.createElement("link")
            link.rel = "stylesheet"
            link.type = "text/css"
            link.href = URL
            link.media = "all"
            head.appendChild(link)
        }
        // setMeta(Name, Content) {
        //     let head = document.getElementsByTagName("head")[0]
        //     let meta = document.createElement("meta")
        //     meta.name = Name
        //     meta.content = Content
        //     head.appendChild(meta)
        // }
    },
    computed: {
        AppRegion: {
            get() {
                this.$store.dispatch(APPDB_GET_ID, process.env.VUE_APP_REGION)
                    .then( App => {
                        if (App && App.Settings) {
                            if (App.Settings.CSSC && Array.isArray(App.Settings.CSSC) && App.Settings.CSSC.length > 0) {
                                App.Settings.CSSC.forEach(element => {
                                    document.body.classList.add(element)
                                })
                            }
                            if (App.Settings.CSSCP && Array.isArray(App.Settings.CSSCP) && App.Settings.CSSCP.length > 0) {
                                App.Settings.CSSCP.forEach(element => {
                                    document.body.style.setProperty(element.Name, element.Value)
                                })
                            }
                            if (App.Settings.Favicon) this.setFavicon(App.Settings.Favicon)
                            if (App.Settings.WebFont) this.setWebFont(App.Settings.WebFont)
                            if (App.Settings.Logo) Vue.prototype.$ThemeLogoUrl = App.Settings.Logo
                        }
                        // if (App && App.Meta && Array.isArray(App.Meta) && App.Meta.length > 0) {
                        //     App.Meta.forEach(element => {
                        //         this.setMeta(element.Name, element.Value)
                        //     })
                        // }
                    })

                return this.$store.state.Login.AppRegion
            }
        }
    },
    watch: {
        AppRegion() {
            return this.AppRegion
        }
    }
}