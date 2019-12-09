<template>
    <div class="verify-notification">
        <article class="message is-danger">
            <div class="message-body">
                <div class="media">
                    <div class="media-left is-hidden-mobile">
                        <span class="icon is-large">
                            <i class="mdi mdi-alert-circle mdi-48px" />
                        </span>
                    </div>
                    <div class="media-content">
                        <h5 class="title is-5">
                            {{ $t("Interface.Dashboard.VerifyNotification.Phone.Title") }}
                        </h5>
                        <p>{{ $t("Interface.Dashboard.VerifyNotification.Phone.SubTitle") }}</p>
                        <button class="button" @click="verifyPhone">
                            {{ $t("Interface.Dashboard.VerifyNotification.Phone.Button") }}
                        </button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import Helpers from "@/utils/Helpers"

export default {
    name: "VerifyPhoneMessage",
    methods: {
        verifyPhone() {
            Helpers.redirectToAuthApp("verify", window.location.origin)
        }
    }
}
</script>