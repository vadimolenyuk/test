<template>
    <div class="verify-notification">
        <article class="message is-warning">
            <div class="message-body">
                <div class="media">
                    <div class="media-left is-hidden-mobile">
                        <span class="icon is-large">
                            <i class="mdi mdi-alert-circle mdi-48px" />
                        </span>
                    </div>
                    <div class="media-content">
                        <h5 class="title is-5">
                            {{ $t("Interface.FiatWallet.AchNotReady.Title") }}
                        </h5>
                        <p>{{ $t("Interface.FiatWallet.AchNotReady.SubTitle") }}</p>
                        <kyc-button cclass="" />
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import KYCButton from "@/components/Shared/GoToKYC"

export default {
    name: "CreateAchAccount",
    components: {
        "kyc-button": KYCButton
    }
}
</script>