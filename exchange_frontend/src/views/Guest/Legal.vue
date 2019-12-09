<template>
    <div id="legal">
        <section class="hero is-getcrypto">
            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="getcrypto-title">
                        <h5 class="title is-5 is-rectangle">
                            {{ $t("Guest.Legal.Title") }}
                        </h5>
                    </div>
                    <h5 class="subtitle is-5 has-text-centered">
                        Register of Economic Activities
                    </h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name of entrepreneu</td>
                                <td>
                                    <h6 class="subtitle is-5 has-text-weight-bold">
                                        Hermes Exchange O&Uuml;
                                    </h6>
                                </td>
                            </tr>
                            <tr>
                                <td>Registry code</td>
                                <td class="has-text-weight-bold">
                                    14626499
                                </td>
                            </tr>
                            <tr>
                                <td>Address of entrepreneu</td>
                                <td>Tornim&auml;e tn 7-132, Kesklinna linnaosa, Tallinn, Harju maakond, 10145</td>
                            </tr>
                            <tr>
                                <td>Telephone</td>
                                <td>+372 58461868</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td><a href="mailto:i58461868@gmail.com">i58461868@gmail.com</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <h5 class="subtitle is-6 has-text-centered has-text-weight-bold">
                        Operating licence
                    </h5>
                    <hr>
                    <hr>
                    <br>
                    <table>
                        <tbody>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Subject field, area of activity
                                </td>
                                <td class="has-text-weight-bold" style="text-decoration: underline;">
                                    Financial services, Providing a virtual currency wallet service
                                </td>
                            </tr>
                            <tr>
                                <td>Number</td>
                                <td class="has-text-weight-bold">
                                    FRK000542
                                </td>
                            </tr>
                            <tr>
                                <td>Start of validity</td>
                                <td>08.01.2019</td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Issuer of licence:
                                </td>
                                <td>Politsei- ja Piirivalveamet</td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold" style="text-decoration: underline;">
                                    Places of business
                                </td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Address:
                                </td>
                                <td><a href="https://hermesdex.com/" target="_blank">https://hermesdex.com/</a> Narva mnt 7 Kesklinna linnaosa Tallinn Harju maakond</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <br>
                    <hr>
                    <hr>
                    <br>
                    <table>
                        <tbody>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Subject field, area of activity
                                </td>
                                <td class="has-text-weight-bold" style="text-decoration: underline;">
                                    Financial services, Providing services of exchanging a virtual currency against a fiat currency
                                </td>
                            </tr>
                            <tr>
                                <td>Number</td>
                                <td class="has-text-weight-bold">
                                    FVR000633
                                </td>
                            </tr>
                            <tr>
                                <td>Start of validity</td>
                                <td>08.01.2019</td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Issuer of licence:
                                </td>
                                <td>Politsei- ja Piirivalveamet</td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold" style="text-decoration: underline;">
                                    Places of business
                                </td>
                            </tr>
                            <tr>
                                <td class="has-text-weight-bold">
                                    Address:
                                </td>
                                <td>Narva mnt 7 Kesklinna linnaosa Tallinn Harju maakond</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <br>
                    <hr>
                    <hr>
                    Web address of the register <a href="https://mtr.mkm.ee/" target="_blank">mtr.mkm.ee</a>
                    <br>
                    <hr>
                    <hr>
                    <br>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"

export default {
    name: "LegalPage",
    components: {
        navbar: Nav
    },
    methods: {
        getLink(FileName) {
            let Addr = process.env.VUE_APP_API_EXCHANGE_URL.substring(0, process.env.VUE_APP_API_EXCHANGE_URL.length - 4)
            return Addr + "staticfiles/" + FileName
        }
    },
    metaInfo() {
        return {
            title: this.$t("Guest.Legal.Title"),
            meta: [
                { name: "robots", content: process.env.VUE_APP_INDEX }
            ]
        }
    }
}
</script>