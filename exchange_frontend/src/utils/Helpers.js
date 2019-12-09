/* eslint-disable no-unused-vars */
import router from "@/router"

const Helpers = {

    toBridgePay: function (OrderID, Token, Amount, UserID) {
        var form = document.createElement("form")
        form.method = "POST"
        form.action = process.env.VUE_APP_BRIDGEPAY_ENDPOINT
        var element1 = document.createElement("input")
        var element2 = document.createElement("input")
        var element3 = document.createElement("input")
        var element4 = document.createElement("input")
        var element5 = document.createElement("input")
        var element6 = document.createElement("input")
        var element7 = document.createElement("input")
        var element10 = document.createElement("input")
        var element11 = document.createElement("input")
        var element12 = document.createElement("input")
        var element13 = document.createElement("input")
        // var element14 = document.createElement("input")
        var element15 = document.createElement("input")
        var element16 = document.createElement("input")
        var element17 = document.createElement("input")
        var element18 = document.createElement("input")
        // var element19 = document.createElement("input")
        // var element20 = document.createElement("input")
        // var element21 = document.createElement("input")
        // var element22 = document.createElement("input")

        element1.value = "PaymentForm"
        element1.name = "mode"
        form.appendChild(element1)

        element2.value = Token
        element2.name = "purchasetoken"
        form.appendChild(element2)

        element3.value = Amount
        element3.name = "TotalAmt"
        form.appendChild(element3)

        element4.value = OrderID
        element4.name = "InvoiceNum"
        form.appendChild(element4)

        element5.value = process.env.VUE_APP_BRIDGEPAY_COMPLETE_URL
        element5.name = "CompleteURL"
        form.appendChild(element5)

        element6.value = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/orders"
        element6.name = "ReturnReceiptUrl"
        form.appendChild(element6)

        element7.value = UserID
        element7.name = "CustomerAccountCode"
        form.appendChild(element7)

        element10.value = process.env.VUE_APP_BRIDGEPAY_LOGO_URL
        element10.name = "ReceiptLogoUrl"
        form.appendChild(element10)

        element11.value = "none"
        element11.name = "Style_Page_BackgroundImage"
        form.appendChild(element11)

        element12.value = "#ffffff"
        element12.name = "Style_Page_BackgroundColor"
        form.appendChild(element12)

        element13.value = "#f9f6f3"
        element13.name = "Style_Form_BackgroundColor"
        form.appendChild(element13)

        // element14.value = "BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important"
        // element14.name = "Style_FontFamily"
        // form.appendChild(element14)

        element15.value = "#73695E"
        element15.name = "Style_Heading_FontColor"
        form.appendChild(element15)

        element16.value = "#ffffff"
        element16.name = "Style_Heading_BackgroundColor"
        form.appendChild(element16)

        element17.value = "#504941"
        element17.name = "Style_Label_FontColor"
        form.appendChild(element17)

        element18.value = "#504941 !important"
        element18.name = "Style_Field_FontColor"
        form.appendChild(element18)

        document.body.appendChild(form)

        form.submit()
    },

    linkToBlockchainExplorer: function(Currency) {
        switch (Currency) {
        case "BTC":
            return "https://www.blockchain.com/btc/address/"
        case "ETH":
            return "https://etherscan.io/address/"
        default:
            break
        }
    },

    linkToBlockchainTx: function(Currency) {
        switch (Currency) {
        case "BTC":
            return "https://www.blockchain.com/btc/tx/"
        case "ETH":
            return "https://etherscan.io/tx/"
        default:
            return null
        }
    },

    checkAllowedURL: function (URL) {
        let AllowedUrls = process.env.VUE_APP_EXTLOGIN_ALLOWED_URLS.split(",")
        let count = 0
        AllowedUrls.forEach(element => {
            if (URL.startsWith(element))
                count++
        })
        return count !== 0
    },

    redirectToExternalApp: function(URL) {
        if (URL && URL.length > 0 && URL !== window.location.href)
            window.location.href = `${URL}`
        else 
            router.push({ name: "Login" })
    }
    
}

export default Helpers