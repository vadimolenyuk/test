import { CURRENCIES_LOCALORDER_RESTORE } from "@/store/actions/currencies"

export default function CurrenciesRestore() {
    return store => {
        if (localStorage.getItem("Order") !== null) {
            store.subscribe(mutation => {
                if (mutation.type === "CURRENCIES_LIST_SUCCESS") {
                    store.dispatch(CURRENCIES_LOCALORDER_RESTORE)
                }
            })
        }
    }
}