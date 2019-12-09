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
    },
    computed: {
        ExternalAppName: {
            get() {
                if (this.$store.getters.IS_APPID_SET) {
                    this.$store.dispatch(APPDB_GET_ID, this.$store.state.AppDBSet.ID)
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
                                if (App.Settings.Logo) Vue.prototype.$ThemeLogoUrl = App.Settings.Logo
                                if (App.Settings.Favicon) this.setFavicon(App.Settings.Favicon)
                                if (App.Settings.WebFont) this.setWebFont(App.Settings.WebFont)
                            }
                        })
                }

                return this.$store.state.Login.ExternalAppName
            }
        }
    },
    watch: {
        ExternalAppName() {
            return this.ExternalAppName
        }
    }
}