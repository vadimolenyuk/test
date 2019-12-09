<template>
    <div id="kyc">
        <div v-if="isSessionReady && (!isPhoneVerified || !isEmailConfirmed)" class="columns is-desktop" style="margin-bottom:1.5rem;">
            <div v-if="!isPhoneVerified" class="column">
                <verify-phone />
            </div>
            <div v-if="!isEmailConfirmed" class="column">
                <verify-email />
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="nowebcam" viewBox="0 0 64 64">
                <path d="M57.7358665,0.4478199c-0.3740997-0.4062-1.0058975-0.4331-1.4130974-0.0586L48.0715675,7.98032  C43.859169,3.31352,37.7668686,0.37512,30.9999676,0.37512c-12.6821003,0-23,10.3177996-23,23  c0,6.0795002,2.3754997,11.6120014,6.2417002,15.7287006l-7.9189,7.2854004  c-0.4063001,0.3740005-0.4326,1.0063972-0.0585999,1.4130974c0.1973,0.2144012,0.4663,0.3227997,0.7363,0.3227997  c0.2416997,0,0.4843998-0.0873985,0.6767998-0.2641983l7.9955001-7.355999  c1.5681992,1.4048004,3.3288994,2.5976982,5.2381001,3.533699l-6.5201998,13.9053001  c-0.6128006,1.3065987-0.5044003,2.8081017,0.2889996,4.0166016c0.7862005,1.1987,2.1220999,1.9145966,3.5737009,1.9145966  h25.4931984c1.4517021,0,2.7876015-0.7158966,3.5732994-1.9140968c0.7939034-1.2089996,0.9023018-2.7105026,0.2895012-4.0171013  L41.0890694,44.03862c7.6380997-3.7445984,12.9109001-11.5988998,12.9109001-20.6634998  c0-5.1968002-1.7346001-9.9952002-4.6526031-13.8509007L57.677269,1.86092  C58.0834694,1.48692,58.1098671,0.85452,57.7358665,0.4478199z M9.9999676,23.3751202c0-11.5796003,9.4204006-21,21-21  c6.1855984,0,11.7376003,2.7043002,15.5842991,6.9735994l-7.1086998,6.54  c-2.1725006-2.1698999-5.169899-3.5135994-8.4755993-3.5135994c-6.6166992,0-12,5.3832989-12,12  c0,2.9471989,1.0725002,5.6455002,2.8418007,7.7364979l-6.1179008,5.6287003  C12.1857681,33.9800186,9.9999676,28.9334202,9.9999676,23.3751202z M35.7101669,19.3526192  c-0.3495979-0.5829983-0.9813004-0.977499-1.7101974-0.977499c-1.1040001,0-2.0000019,0.8959007-2.0000019,2  c0,0.6688995,0.3321018,1.2579994,0.8369007,1.6210003l-5.5230999,5.0812988  c-0.2352009-0.4811993-0.3250008-0.8612995-0.3348007-0.9074001c-0.1128006-0.5380993-0.6401005-0.8866997-1.1791992-0.7748985  c-0.5410004,0.1107998-0.8901005,0.6385994-0.7797012,1.1800995c0.1086006,0.532299,0.3579006,1.2164001,0.7737999,1.9006996  l-2.4825993,2.2838993c-1.4419003-1.7333984-2.3113003-3.9589996-2.3113003-6.3846989c0-5.5142002,4.4859009-10,10-10  c2.7244015,0,5.1950016,1.0978994,7.0002995,2.8708L35.7101669,19.3526192z M27.0890675,30.0020199  c0.9346008,0.7922001,2.2122002,1.3731003,3.9109001,1.3731003c0.5522995,0,1-0.4477997,1-1c0-0.5522995-0.4477005-1-1-1  c-1.0503998,0-1.8346996-0.3143005-2.419899-0.7446995l10.7050991-9.8488998  c1.0820007,1.5974998,1.7148018,3.5229988,1.7148018,5.5935993c0,5.5140991-4.4858017,9.9999981-10.0000019,9.9999981  c-2.3684006,0-4.5438995-0.8316002-6.2590008-2.2128983L27.0890675,30.0020199z M45.7988663,58.7935181  c0.315403,0.6724014,0.2587013,1.4458008-0.1513977,2.0703011c-0.4150009,0.6333008-1.1254997,1.0112991-1.9009018,1.0112991  H18.2533684c-0.775301,0-1.4857998-0.3779984-1.9013004-1.0117989c-0.4097004-0.6240005-0.4663-1.3973999-0.1508999-2.0698013  l6.5438995-13.9564972c2.5643005,0.9897003,5.3460007,1.5380974,8.2549,1.5380974c2.9089985,0,5.6906986-0.5483971,8.2549-1.5380974  L45.7988663,58.7935181z M51.9999695,23.3751202c0,11.5795002-9.4204025,20.9999981-21.0000019,20.9999981  c-5.3015003,0-10.1359997-1.9902992-13.8353996-5.2424965l6.0924988-5.6052017  c2.0919018,1.7727013,4.7927017,2.8476982,7.7429008,2.8476982c6.6167011,0,12.0000019-5.3832989,12.0000019-11.9999981  c0-2.5923004-0.8347015-4.9883003-2.2376022-6.9524002l7.0907021-6.5235004  C50.4457664,14.3924198,51.9999695,18.7002201,51.9999695,23.3751202z" />
            </symbol>
        </svg>
        <div v-if="!Webcam.SupportRecorder" class="notification is-danger">
            <b-icon icon="message-alert-outline" />&nbsp;{{ $t("Interface.KYC.Webcam.Error.BadBrowser") }}
        </div>
        <user-redirect />

        <form-wizard
            ref="wizard"
            step-size="sm"
            class=""
            transition="bounce"
            title=""
            subtitle=""
            :color="ColorPrimary"
            error-color="#ff3860"
            @on-change="setTitle"
        >
            <transition v-if="!KycComplete" name="fadeIn" mode="out-in">
                <h2 :key="StepTitle" class="wizard-current-title">
                    {{ StepTitle }}
                </h2>
            </transition>
            <tab-content :title="$t('Interface.KYC.Personal.Title')" :before-change="mainValidate" :additional-info="{ id: 0, title: 'Personal' }">
                <div class="columns is-desktop">
                    <div class="column">
                        <ul class="wizard-current-sublist" style="margin-bottom:25px;">
                            <li>{{ $t("Interface.KYC.Personal.Help") }}</li>
                        </ul>
                    </div>
                </div>
                <form data-vv-scope="Personal">
                    <div class="columns is-desktop is-multiline">
                        <b-field
                            :label="$t('Interface.KYC.Personal.FirstName')+'*'"
                            :message="errors.first('Personal.FirstName')"
                            :type="{ 'is-danger': errors.has('Personal.FirstName'), 'is-success': fields.$Personal && fields.$Personal.FirstName && fields.$Personal.FirstName.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|alpha_spaces'"
                                :value="FirstName"
                                name="FirstName"
                                type="text"
                                @change.native="FirstName = $event.target.value"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Personal.LastName')+'*'"
                            :message="errors.first('Personal.LastName')"
                            :type="{ 'is-danger': errors.has('Personal.LastName'), 'is-success': fields.$Personal && fields.$Personal.LastName && fields.$Personal.LastName.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|alpha_spaces'"
                                :value="LastName"
                                name="LastName"
                                type="text"
                                @change.native="LastName = $event.target.value"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Personal.MiddleName')"
                            :message="errors.first('Personal.MiddleName')"
                            :type="{ 'is-danger': errors.has('Personal.MiddleName'), 'is-success': fields.$Personal && fields.$Personal.MiddleName && fields.$Personal.MiddleName.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'alpha_spaces'"
                                :value="MiddleName"
                                name="MiddleName"
                                type="text"
                                @change.native="MiddleName = $event.target.value"
                            />
                        </b-field>
                        <b-field :label="$t('Interface.KYC.Personal.BirthDate')+'*'" class="column is-6">
                            <b-datepicker
                                v-model="BirthDate"
                                :max-date="new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())"
                                :date-formatter="(date) => date.toLocaleDateString('en-US')"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Personal.BirthPlace')+'*'"
                            :message="errors.first('Personal.BirthPlace')"
                            :type="{ 'is-danger': errors.has('Personal.BirthPlace'), 'is-success': fields.$Personal && fields.$Personal.BirthPlace && fields.$Personal.BirthPlace.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|utf8'"
                                :value="BirthPlace"
                                name="BirthPlace"
                                type="text"
                                @change.native="BirthPlace = $event.target.value"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Personal.Gender.Title')+'*'"
                            :message="errors.first('Personal.Gender')"
                            :type="{ 'is-danger': errors.has('Personal.Gender'), 'is-success': fields.$Personal && fields.$Personal.Gender && fields.$Personal.Gender.valid }"
                            class="column is-6"
                        >
                            <multiselect
                                v-model="Gender"
                                v-validate="'required'"
                                :options="Genders"
                                :allow-empty="false"
                                placeholder=""
                                data-vv-name="Gender"
                                data-vv-value-path="Gender"
                            >
                                <template slot="singleLabel" slot-scope="props">
                                    <template v-if="props.option === 'true'" class="option-title">
                                        <i class="mdi mdi-human-male" /> {{ $t("Interface.KYC.Personal.Gender.Male") }}
                                    </template>
                                    <template v-else class="option-title">
                                        <i class="mdi mdi-human-female" /> {{ $t("Interface.KYC.Personal.Gender.Female") }}
                                    </template>
                                </template>
                                <template slot="option" slot-scope="props">
                                    <template v-if="props.option === 'true'" class="option-title">
                                        <i class="mdi mdi-human-male" /> {{ $t("Interface.KYC.Personal.Gender.Male") }}
                                    </template>
                                    <template v-else class="option-title">
                                        <i class="mdi mdi-human-female" /> {{ $t("Interface.KYC.Personal.Gender.Female") }}
                                    </template>
                                </template>
                            </multiselect>
                        </b-field>
                    </div>
                </form>
            </tab-content>
            <tab-content :title="$t('Interface.KYC.Address.Title')" :before-change="mainValidate" :additional-info="{ id: 1, title: 'Address' }">
                <div class="columns is-desktop">
                    <div class="column">
                        <ul class="wizard-current-sublist" style="margin-bottom:25px;">
                            <li>{{ $t("Interface.KYC.Personal.Help") }}</li>
                        </ul>
                    </div>
                </div>
                <form data-vv-scope="Address">
                    <div class="columns is-desktop is-multiline">
                        <b-field
                            :label="$t('Interface.KYC.Address.ZipCode')+'*'"
                            :message="errors.first('Address.ZipCode')"
                            :type="{ 'is-danger': errors.has('Address.ZipCode'), 'is-success': fields.$Address && fields.$Address.ZipCode && fields.$Address.ZipCode.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|numeric'"
                                :value="ZipCode"
                                name="ZipCode"
                                type="text"
                                @change.native="ZipCode = $event.target.value"
                            />
                        </b-field>
                        <b-field
                            v-if="Countries"
                            :label="$t('Interface.KYC.Address.Country')+'*'"
                            :message="errors.first('Address.Country')"
                            :type="{ 'is-danger': errors.has('Address.Country'), 'is-success': fields.$Address && fields.$Address.Country && fields.$Address.Country.valid }"
                            class="column is-6"
                        >
                            <multiselect
                                v-model="Country"
                                v-validate="'required'"
                                :options="Countries"
                                :allow-empty="false"
                                track-by="code"
                                label="name"
                                data-vv-name="Country"
                                data-vv-value-path="Country"
                            />
                        </b-field>
                        <b-field
                            v-if="States"
                            :label="(Country && Country.code === 'us') ? $t('Interface.KYC.Address.State')+'*' : $t('Interface.KYC.Address.Region')+'*' "
                            :message="errors.first('Address.Region')"
                            :type="{ 'is-danger': errors.has('Address.Region'), 'is-success': fields.$Address && fields.$Address.Region && fields.$Address.Region.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-if="Country && Country.code !== 'us'"
                                v-validate="'required|utf8'"
                                :value="Region"
                                name="Region"
                                type="text"
                                @change.native="Region = $event.target.value"
                            />
                            <multiselect
                                v-else
                                v-model="State"
                                v-validate="'required'"
                                :options="States"
                                :allow-empty="false"
                                track-by="code"
                                label="name"
                                data-vv-name="Region"
                                data-vv-value-path="Region"
                            />
                        </b-field>
                        <b-field
                            v-if="Countries && Country && Country.code === 'us'"
                            :label="$t('Interface.KYC.ID.SSN')+'*'"
                            :message="errors.first('Address.SSN')"
                            :type="{ 'is-danger': errors.has('Address.SSN'), 'is-success': fields.$Address && fields.$Address.SSN && fields.$Address.SSN.valid }"
                            class="column is-6"
                        >
                            <cleave
                                v-validate="'required|min:9'"
                                class="input"
                                :class="{ 'is-danger': errors.has('Address.SSN'), 'is-success': fields.$Address && fields.$Address.SSN && fields.$Address.SSN.valid }"
                                :value="SSN"
                                name="SSN"
                                type="text"
                                :options="MaskSSN"
                                @change.native="SSN = $event.target.value"
                                @blur="saveSSN"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Address.City')+'*'"
                            :message="errors.first('Address.City')"
                            :type="{ 'is-danger': errors.has('Address.City'), 'is-success': fields.$Address && fields.$Address.City && fields.$Address.City.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|utf8'"
                                :value="City"
                                name="City"
                                type="text"
                                @change.native="City = $event.target.value"
                            />
                        </b-field>
                        <b-field
                            :label="$t('Interface.KYC.Address.Street')+'*'"
                            :message="errors.first('Address.Street')"
                            :type="{ 'is-danger': errors.has('Address.Street'), 'is-success': fields.$Address && fields.$Address.Street && fields.$Address.Street.valid }"
                            class="column is-6"
                        >
                            <b-input
                                v-validate="'required|utf8'"
                                :value="Street"
                                name="Street"
                                type="text"
                                @change.native="Street = $event.target.value"
                            />
                        </b-field>
                    </div>
                </form>
            </tab-content>
            <tab-content :title="$t('Interface.KYC.ID.Title')" :before-change="mainValidate" :additional-info="{ id: 2, title: 'Passport' }">
                <div class="columns is-desktop">
                    <div class="column">
                        <ul class="wizard-current-sublist">
                            <li>{{ $t("Interface.KYC.ID.Help") }}</li>
                        </ul>
                    </div>
                </div>
                <div class="columns is-mobile is-multiline is-centered kyc-passport">
                    <div class="column is-2-desktop is-6-mobile kyc-passport-example">
                        <figure class="kyc-passport-example-figure is-danger image is-3by2">
                            <img src="@/assets/kyc/KYC-PassportBad-Finger.jpg" class="img-responsive">
                        </figure>
                        <span class="has-text-danger">{{ $t("Interface.KYC.ID.Example1") }}</span>
                    </div>
                    <div class="column is-2-desktop is-6-mobile kyc-passport-example">
                        <figure class="kyc-passport-example-figure is-danger image is-3by2">
                            <img src="@/assets/kyc/KYC-PassportBad-FlashBlur.jpg" class="img-responsive">
                        </figure>
                        <span class="has-text-danger">{{ $t("Interface.KYC.ID.Example2") }}</span>
                    </div>
                    <div class="column is-2-desktop is-6-mobile kyc-passport-example">
                        <figure class="kyc-passport-example-figure is-danger image is-3by2">
                            <img src="@/assets/kyc/KYC-PassportBad-Angle.jpg" class="img-responsive">
                        </figure>
                        <span class="has-text-danger">{{ $t("Interface.KYC.ID.Example3") }}</span>
                    </div>
                    <div class="column is-2-desktop is-6-mobile kyc-passport-example">
                        <figure class="kyc-passport-example-figure is-success image is-3by2">
                            <img src="@/assets/kyc/KYC-PassportGood.jpg" class="img-responsive">
                        </figure>
                        <span class="has-text-success">{{ $t("Interface.KYC.ID.Example4") }}</span>
                    </div>
                </div>
                <form data-vv-scope="Passport">
                    <div class="columns is-desktop">
                        <div class="column is-6">
                            <b-field
                                :label="$t('Interface.KYC.ID.Type.Label')+'*'"
                                :message="errors.first('Passport.IDName')"
                                :type="{ 'is-danger': errors.has('Passport.IDName'), 'is-success': fields.$Passport && fields.$Passport.IDName && fields.$Passport.IDName.valid }"
                            >
                                <multiselect
                                    v-model="IDName"
                                    v-validate="'required'"
                                    :options="IDTypes"
                                    :allow-empty="false"
                                    data-vv-name="IDName"
                                    data-vv-value-path="IDName"
                                />
                            </b-field>
                            <b-field
                                :label="$t('Interface.KYC.ID.Number')+'*'"
                                :message="errors.first('Passport.Number')"
                                :type="{ 'is-danger': errors.has('Passport.Number'), 'is-success': fields.$Passport && fields.$Passport.Number && fields.$Passport.Number.valid }"
                            >
                                <b-input
                                    v-validate="'required|utf8'"
                                    :value="IDNumber"
                                    name="Number"
                                    type="text"
                                    @change.native="IDNumber = $event.target.value"
                                />
                            </b-field>
                            <b-field
                                v-if="Countries"
                                :label="$t('Interface.KYC.ID.Country')+'*'"
                                :message="errors.first('Passport.Country')"
                                :type="{ 'is-danger': errors.has('Passport.Country'), 'is-success': fields.$Passport && fields.$Passport.Country && fields.$Passport.Country.valid }"
                            >
                                <multiselect
                                    v-model="IdentityCountry"
                                    v-validate="'required'"
                                    :options="Countries"
                                    :allow-empty="false"
                                    track-by="code"
                                    label="name"
                                    data-vv-name="Country"
                                    data-vv-value-path="Country"
                                />
                            </b-field>
                            <b-field
                                v-if="IdentityCountry && IdentityCountry.code === 'us'"
                                :label="$t('Interface.KYC.ID.SSN')+'*'"
                                :message="errors.first('Passport.SSN')"
                                :type="{ 'is-danger': errors.has('Passport.SSN'), 'is-success': fields.$Passport && fields.$Passport.SSN && fields.$Passport.SSN.valid }"
                            >
                                <cleave
                                    v-validate="'required|min:9'"
                                    class="input"
                                    :class="{ 'is-danger': errors.has('Passport.SSN'), 'is-success': fields.$Passport && fields.$Passport.SSN && fields.$Passport.SSN.valid }"
                                    :value="SSN"
                                    name="SSN"
                                    type="text"
                                    :options="MaskSSN"
                                    @change.native="SSN = $event.target.value"
                                    @blur="saveSSN"
                                />
                            </b-field>
                            <b-field
                                :label="$t('Interface.KYC.ID.Authority')+'*'"
                                :message="errors.first('Passport.Authority')"
                                :type="{ 'is-danger': errors.has('Passport.Authority'), 'is-success': fields.$Passport && fields.$Passport.Authority && fields.$Passport.Authority.valid }"
                            >
                                <b-input
                                    v-validate="'required|utf8'"
                                    :value="Authority"
                                    name="Authority"
                                    type="text"
                                    @change.native="Authority = $event.target.value"
                                />
                            </b-field>
                            <b-field :label="$t('Interface.KYC.ID.DateOfIssue')+'*'">
                                <b-datepicker
                                    v-model="DateOfIssue"
                                    :max-date="new Date()"
                                    :date-formatter="(date) => date.toLocaleDateString('en-US')"
                                />
                            </b-field>
                            <b-field :label="$t('Interface.KYC.ID.DateOfExpire')+'*'">
                                <b-datepicker
                                    v-model="DateOfExpiry"
                                    :min-date="new Date()"
                                    :max-date="new Date(new Date().getFullYear() + 50, new Date().getMonth(), new Date().getDate())"
                                    :date-formatter="(date) => date.toLocaleDateString('en-US')"
                                />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field
                                :label="$t('Interface.KYC.ID.DocumentFile')+'*'"
                                :message="errors.first('Passport.IdentityDoc')"
                                :type="{ 'is-danger': errors.has('Passport.IdentityDoc'), 'is-success': fields.$Passport && fields.$Passport.IdentityDoc && fields.$Passport.IdentityDoc.valid }"
                            >
                                <upload-preview
                                    v-model="IdentityDoc"
                                    v-validate="'required'"
                                    name="IdentityDoc"
                                    :min-size="409600"
                                    :max-size="(KYCprovider === 'identitymind') ? 4194304 : 2097152"
                                    :min-resolution="(KYCprovider === 'identitymind') ? 600 : 1200"
                                    :formats="(KYCprovider === 'identitymind') ? '.jpg, .jpeg, .JPG, .JPEG' : '.jpg, .jpeg, .png, .JPG, .JPEG, .PNG'"
                                    :class="{ 'is-danger': errors.has('Passport.IdentityDoc'), 'is-success': fields.$Passport && fields.$Passport.IdentityDoc && fields.$Passport.IdentityDoc.valid }"
                                />
                            </b-field>
                            <b-field
                                :label="$t('Interface.KYC.ID.DocumentFileBack')+'*'"
                                :message="errors.first('Passport.IdentityDocBack')"
                                :type="{ 'is-danger': errors.has('Passport.IdentityDocBack'), 'is-success': fields.$Passport && fields.$Passport.IdentityDocBack && fields.$Passport.IdentityDocBack.valid }"
                            >
                                <upload-preview
                                    v-model="IdentityDocBack"
                                    v-validate="'required'"
                                    name="IdentityDocBack"
                                    :min-size="409600"
                                    :max-size="(KYCprovider === 'identitymind') ? 4194304 : 2097152"
                                    :min-resolution="(KYCprovider === 'identitymind') ? 600 : 1200"
                                    :class="{ 'is-danger': errors.has('Passport.IdentityDocBack'), 'is-success': fields.$Passport && fields.$Passport.IdentityDocBack && fields.$Passport.IdentityDocBack.valid }"
                                />
                            </b-field>
                            <small v-if="KYCprovider === 'identitymind'">{{ $t("Interface.KYC.Other.ImageUploadHelp") }}</small>
                            <small v-else>{{ $t("Interface.KYC.Other.ImageUploadHelpSynapse") }}</small>
                        </div>
                    </div>
                </form>
            </tab-content>
            <tab-content
                :title="$t('Interface.KYC.Webcam.Title')"
                :before-change="mainValidate"
                class="kyc-webcam"
                :additional-info="{ id: 3, title: 'Webcam' }"
            >
                <div class="columns is-desktop">
                    <img src="../assets/demo.gif" width="20%">
                    <div class="column">
                        {{ $t('Interface.KYC.ID.HelpVideo') }}
                    </div>
                </div>
                <div class="columns is-desktop">
                    <div class="column has-text-centered">
                        <b-button v-if="!video.stream" type="is-success" @click="permissionCamera">
                            Accept Permission
                        </b-button>
                        <div v-else>
                            <div>
                                <video
                                    ref="video"
                                    width="640"
                                    height="480"
                                    controls
                                    playsinline
                                />
                            </div>
                            <b-button v-if="!video.rec" type="is-success" @click="startVideo">
                                Start Record
                            </b-button>
                            <b-button v-else type="is-success" @click="stopVideo">
                                Stop Record
                            </b-button>
                        </div>
                    </div>
                </div>
            </tab-content>
            <!-- <tab-content
							:title="$t('Interface.KYC.Webcam.Title')"
							:before-change="mainValidate"
							class="kyc-webcam"
							:additional-info="{ id: 3, title: 'Webcam' }"
					>
							<div class="columns is-desktop">
									<div class="column">
											<ul class="wizard-current-sublist" style="margin-bottom:25px;">
													<li>{{ $t('Interface.KYC.Webcam.Help') }}</li>
											</ul>
									</div>
							</div>
							<div class="columns is-desktop">
									<template v-if="!Webcam.ErrorNotFound && !Webcam.ErrorNotAllowed && !Webcam.ErrorUnknown">
											<div class="column">
													<h5 class="kyc-webcam-title">
															{{ $t('Interface.KYC.Webcam.Movements.Title') }}:
													</h5>
													<ol class="kyc-webcam-list">
															<li>{{ $t('Interface.KYC.Webcam.Movements.FirstStep') }}</li>
															<li v-for="Screenpla in Screenplay" :key="Screenpla">
																	{{ Screenpla }}
															</li>
															<li>{{ $t('Interface.KYC.Webcam.Movements.LastStep') }}</li>
													</ol>
											</div>
											<div class="column kyc-webcam-video">
													<div class="kyc-webcam-video-wrapper">
															<div v-if="webcamRecordState === 'recording'" class="kyc-webcam-video-recordstate">
																	<div class="kyc-webcam-video-recordstate-badge">
																			<b-icon icon="record" size="is-small" type="is-danger" />
																			<span>{{ $t('Interface.KYC.Webcam.Indicator.Record') }}</span>
																	</div>
															</div>
															<div class="kyc-webcam-video-button">
																	<button v-if="webcamRecordState != 'recording' && Webcam.Stream" type="button" class="button is-danger" @click="webcamRecord()">
																			<b-icon icon="webcam" />&nbsp;{{ $t('Interface.KYC.Webcam.Button.Start') }}
																	</button>
																	<button v-else-if="(webcamRecordState != 'recording' && WebcamURL) || (webcamRecordState != 'recording' && !Webcam.Stream && Webcam.Blob)" type="button" class="button is-outline is-danger" @click="webcamInit(false)">
																			{{ $t('Interface.KYC.Webcam.Button.Restart') }}
																	</button>
																	<button v-if="webcamRecordState === 'recording'" type="button" class="button is-danger" @click="webcamStopRecord()">
																			<b-icon icon="stop" />&nbsp;{{ $t('Interface.KYC.Webcam.Button.Stop') }}
																	</button>
															</div>
															<video ref="video" preload="auto" poster="@/assets/kyc/webcam.svg" autoplay />
													</div>
											</div>
									</template>

									<div v-else-if="!Webcam.SupportRecorder" class="column kyc-webcam-disabled has-text-danger">
											<svg class="kyc-webcam-disabled-icon">
													<use xlink:href="#nowebcam" />
											</svg>
											<h3 class="kyc-webcam-disabled-title">
													{{ $t('Interface.KYC.Webcam.Error.NoSupportRecorder') }}
											</h3>
											<p>{{ $t('Interface.KYC.Webcam.Error.NoSupportRecorderText') }}</p>
									</div>
									<div v-else-if="Webcam.ErrorNotAllowed" class="column kyc-webcam-disabled has-text-warning">
											<svg class="kyc-webcam-disabled-icon warning">
													<use xlink:href="#nowebcam" />
											</svg>
											<h3 class="kyc-webcam-disabled-title">
													{{ $t('Interface.KYC.Webcam.Error.Disabled') }}
											</h3>
											<p>{{ $t('Interface.KYC.Webcam.Error.DisabledText') }}</p>
									</div>
									<div v-else-if="Webcam.ErrorNotFound" class="column kyc-webcam-disabled has-text-danger">
											<svg class="kyc-webcam-disabled-icon">
													<use xlink:href="#nowebcam" />
											</svg>
											<h3 class="kyc-webcam-disabled-title">
													{{ $t('Interface.KYC.Webcam.Error.NotFound') }}
											</h3>
											<p>{{ $t('Interface.KYC.Webcam.Error.NotFoundText') }}</p>
									</div>
									<div v-else-if="Webcam.ErrorUnknown" class="column kyc-webcam-disabled has-text-danger">
											<svg class="kyc-webcam-disabled-icon">
													<use xlink:href="#nowebcam" />
											</svg>
											<h3 class="kyc-webcam-disabled-title">
													{{ $t('Interface.KYC.Webcam.Error.Unknown') }}
											</h3>
											<p>{{ $t('Interface.KYC.Webcam.Error.UnknownText') }}</p>
									</div>
							</div>
					</tab-content> -->
            <!-- <tab-content :title="$t('Interface.KYC.Other.Title')" :before-change="mainValidate" :additional-info="{ id: 4, title: 'Other' }">
							<form data-vv-scope="Other">
									<div class="columns is-mobile is-multiline">
											<div class="column is-4-desktop is-12-mobile">
													<b-field
															:label="$t('Interface.KYC.Other.IDSelfie')+'*'"
															:message="errors.first('Other.IdConfirmationSelfiie')"
															:type="{ 'is-danger': errors.has('Other.IdConfirmationSelfiie'), 'is-success': fields.$Other && fields.$Other.IdConfirmationSelfiie && fields.$Other.IdConfirmationSelfiie.valid }"
													>
															<upload-preview
																	v-model="SelfieWithID"
																	v-validate="'required'"
																	name="IdConfirmationSelfiie"
																	:min-size="409600"
																	:max-size="4194304"
																	:min-resolution="600"
																	:class="{ 'is-danger': errors.has('Other.IdConfirmationSelfiie'), 'is-success': fields.$Other && fields.$Other.IdConfirmationSelfiie && fields.$Other.IdConfirmationSelfiie.valid }"
															/>
													</b-field>
													<small>{{ $t("Interface.KYC.Other.ImageUploadHelp") }}</small>
											</div>
											<div class="column is-4-desktop is-12-mobile">
													<b-field
															:label="$t('Interface.KYC.Other.ProofOfResidence')+'*'"
															:message="errors.first('Other.ProofOfResidence')"
															:type="{ 'is-danger': errors.has('Other.ProofOfResidence'), 'is-success': fields.$Other && fields.$Other.ProofOfResidence && fields.$Other.ProofOfResidence.valid }"
													>
															<upload-preview
																	v-model="ProofOfResidence"
																	v-validate="'required'"
																	name="ProofOfResidence"
																	:min-size="409600"
																	:max-size="4194304"
																	:min-resolution="600"
																	:class="{ 'is-danger': errors.has('Other.ProofOfResidence'), 'is-success': fields.$Other && fields.$Other.ProofOfResidence && fields.$Other.ProofOfResidence.valid }"
															/>
													</b-field>
													<small>{{ $t("Interface.KYC.Other.ImageUploadHelp") }}</small>
											</div>
											<div class="column is-4-desktop is-12-mobile">
													<b-field
															:label="$t('Interface.KYC.Other.InvestorCertificate')+'*'"
															:message="errors.first('Other.InvestorCertificate')"
															:type="{ 'is-danger': errors.has('Other.InvestorCertificate'), 'is-success': fields.$Other && fields.$Other.InvestorCertificate && fields.$Other.InvestorCertificate.valid }"
													>
															<upload-preview
																	v-model="InvestorCertificate"
																	v-validate="'required'"
																	name="InvestorCertificate"
																	:min-size="409600"
																	:max-size="4194304"
																	:min-resolution="600"
																	:class="{ 'is-danger': errors.has('Other.InvestorCertificate'), 'is-success': fields.$Other && fields.$Other.InvestorCertificate && fields.$Other.InvestorCertificate.valid }"
															/>
													</b-field>
													<small>{{ $t("Interface.KYC.Other.ImageUploadHelp") }}</small>
											</div>
									</div>
							</form>
					</tab-content> -->

            <template slot="footer" slot-scope="props">
                <div v-if="!KycComplete" class="wizard-footer-left">
                    <wizard-button v-if="props.activeTabIndex > 0" class="button is-theme is-outlined" @click.native="props.prevTab()">
                        <b-icon size="is-small" icon="chevron-left" />&nbsp;
                        {{ $t("Interface.KYC.Button.Back") }} {{ BackTitle }}
                    </wizard-button>
                </div>
                <div class="wizard-footer-right">
                    <!-- <button class="button is-theme is-outlined checkbutton" @click="sendToAgent">
                        <b-icon icon="account-check-outline" />&nbsp;
                        {{ $t("Interface.KYC.Button.CheckData") }}
                    </button> -->
                    <wizard-button v-if="!props.isLastStep" class="button is-theme is-outlined" @click.native="props.nextTab()">
                        {{ $t("Interface.KYC.Button.Next") }}
                        &nbsp;<b-icon size="is-small" icon="chevron-right " />
                    </wizard-button>
                    <wizard-button v-else class="button is-theme is-outlined" @click.native="complete">
                        {{ $t("Interface.KYC.Button.Complete") }}
                    </wizard-button>
                </div>
            </template>
        </form-wizard>
        <b-loading :is-full-page="false" :active.sync="IsLoading" />
    </div>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard"
import Multiselect from "vue-multiselect"
import Cleave from "vue-cleave-component"
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import UploadPreview from "@/components/Form/UploadPreview"
import VerifyPhoneMessage from "@/components/User/VerifyPhoneMessage"
import VerifyEmail from "@/components/User/VerifyEmail"
import UserRedirect from "@/components/User/Redirect"

import { COUNTRIES_REQUEST, STATES_REQUEST } from "@/store/actions/country"
import {
    KYC_CHANGE_FIRSTNAME,
    KYC_CHANGE_MIDDLENAME,
    KYC_CHANGE_LASTNAME,
    KYC_CHANGE_GENDER,
    KYC_CHANGE_BIRTHDATE,
    KYC_CHANGE_BIRTHPLACE,
    KYC_GET_PERSONAL_REQUEST,
    KYC_SAVE_PERSONAL_REQUEST,

    KYC_CHANGE_ADDRESSCOUNTRY,
    KYC_CHANGE_REGION,
    KYC_CHANGE_ZIPCODE,
    KYC_CHANGE_CITY,
    KYC_CHANGE_STREET,
    KYC_GET_ADDRESS_REQUEST,
    KYC_SAVE_ADDRESS_REQUEST,

    KYC_CHANGE_IDENTITYCOUNTRY,
    KYC_CHANGE_NUMBER,
    KYC_CHANGE_AUTHORITY,
    KYC_CHANGE_DATEOFISSUE,
    KYC_CHANGE_DATEOFEXPIRE,
    KYC_CHANGE_IDNAME,
    KYC_GET_IDENTITY_REQUEST,
    KYC_SAVE_IDENTITY_REQUEST,
    KYC_GET_IDDOC_REQUEST,
    KYC_GET_IDDOC_REQUEST_BACK,
    KYC_SAVE_IDDOC_REQUEST,
    KYC_SAVE_IDDOC_REQUEST_BACK,

    KYC_CHANGE_SSN,
    KYC_GET_SSN_REQUEST,
    KYC_SAVE_SSN_REQUEST,

    KYC_GET_SCREENPLAY_REQUEST,
    KYC_GET_VIDEO_REQUEST,
    KYC_SAVE_VIDEO_REQUEST,

    KYC_GET_SELFIEWITHID_REQUEST,
    KYC_SAVE_SELFIEWITHID_REQUEST,
    KYC_GET_PROOFOFRESIDENCE_REQUEST,
    KYC_SAVE_PROOFOFRESIDENCE_REQUEST,
    KYC_GET_CERTIFICATE_REQUEST,
    KYC_SAVE_CERTIFICATE_REQUEST,

    KYC_CHECK_REQUEST
} from "@/store/actions/kyc"
import * as RecordRTC from "recordrtc"
export default {
    name: "KYCPage",
    components: {
        FormWizard,
        TabContent,
        WizardButton,
        Cleave,
        "multiselect": Multiselect,
        "upload-preview": UploadPreview,
        "verify-phone": VerifyPhoneMessage,
        "verify-email": VerifyEmail,
        "user-redirect": UserRedirect
    },
    mixins: [LoadingState],
    data () {
        return {
            MaskSSN: {
                delimiters: ["-", "-"],
                numericOnly: true,
                uppercase: true,
                blocks: [3, 2, 4]
            },
            Disabled: false,
            ColorPrimary: getComputedStyle(document.body).getPropertyValue("--color-theme"),
            Genders: ["true", "false"],
            KycComplete: false,
            StepTitles: {
                "Personal": this.$t("Interface.KYC.Personal.Title"),
                "Address": this.$t("Interface.KYC.Address.Title"),
                "Passport": this.$t("Interface.KYC.ID.Title"),
                "Webcam": this.$t("Interface.KYC.Webcam.Title")
                // "Other": this.$t("Interface.KYC.Other.Title")
            },
            IDTypes: [
                this.$t("Interface.KYC.ID.Type.Type1"),
                this.$t("Interface.KYC.ID.Type.Type2"),
                this.$t("Interface.KYC.ID.Type.Type3")
            ],
            StepTitle: "",
            BackTitle: "",
            Webcam: {
                Complete: false,
                Required: false,
                Blob: null,

                Stream: null,
                Recorder: null,
                Chunks: [],

                SupportRecorder: true,
                ErrorNotFound: false,
                ErrorNotAllowed: false,
                ErrorUnknown: false
            },
            video: {
                rec: false,
                recorder: null,
                stream: null
            }
        }
    },
    computed: {
        webcamRecordState() { // Возвращает состояние вебкам рекордера
            if (this.Webcam.Recorder) return this.Webcam.Recorder.state
            else return null
        },

        Countries: {
            get() {
                return this.$store.state.Country.ListCountries
            }
        },
        States: {
            get() {
                return this.$store.state.Country.ListStates
            }
        },

        FirstName: {
            get() {
                return this.$store.state.KYCpersonal.FirstName
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_FIRSTNAME, value)
            }
        },
        MiddleName: {
            get() {
                return this.$store.state.KYCpersonal.MiddleName
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_MIDDLENAME, value)
            }
        },
        LastName: {
            get() {
                return this.$store.state.KYCpersonal.LastName
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_LASTNAME, value)
            }
        },
        Gender: {
            get() {
                return this.$store.state.KYCpersonal.Gender
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_GENDER, value)
            }
        },
        BirthDate: {
            get() {
                return this.$store.state.KYCpersonal.BirthDate
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_BIRTHDATE, value)
            }
        },
        BirthPlace: {
            get() {
                return this.$store.state.KYCpersonal.BirthPlace
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_BIRTHPLACE, value)
            }
        },

        Country: {
            get() {
                return (this.Countries && this.$store.state.KYCaddress.Country) ? this.Countries.find(Countries => (Countries.code === this.$store.state.KYCaddress.Country || Countries.name === this.$store.state.KYCaddress.Country)) : null
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_ADDRESSCOUNTRY, this.Countries.find(Countries => Countries.code === value.code).code)
            }
        },
        State: {
            get() {
                return (this.States && this.$store.state.KYCaddress.Region) ? this.States.find(States => (States.code === this.$store.state.KYCaddress.Region || States.name === this.$store.state.KYCaddress.Region)) : null
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_REGION, this.States.find(States => States.code === value.code).code)
            }
        },
        Region: {
            get() {
                return this.$store.state.KYCaddress.Region
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_REGION, value)
            }
        },
        ZipCode: {
            get() {
                return this.$store.state.KYCaddress.ZipCode
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_ZIPCODE, value)
            }
        },
        City: {
            get() {
                return this.$store.state.KYCaddress.City
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_CITY, value)
            }
        },
        Street: {
            get() {
                return this.$store.state.KYCaddress.Street
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_STREET, value)
            }
        },

        IdentityCountry: {
            get() {
                return (this.Countries && this.$store.state.KYCidentitydoc.Country) ? this.Countries.find(Countries => (Countries.code === this.$store.state.KYCidentitydoc.Country || Countries.name === this.$store.state.KYCidentitydoc.Country)) : null
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_IDENTITYCOUNTRY, this.Countries.find(Countries => Countries.code === value.code).code)
            }
        },
        IDName: {
            get() {
                return this.$store.state.KYCidentitydoc.Name
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_IDNAME, value)
            }
        },
        IDNumber: {
            get() {
                return this.$store.state.KYCidentitydoc.Number
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_NUMBER, value)
            }
        },
        Authority: {
            get() {
                return this.$store.state.KYCidentitydoc.Authority
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_AUTHORITY, value)
            }
        },
        DateOfIssue: {
            get() {
                return this.$store.state.KYCidentitydoc.DateOfIssue
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_DATEOFISSUE, value)
            }
        },
        DateOfExpiry: {
            get() {
                return this.$store.state.KYCidentitydoc.DateOfExpiry
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_DATEOFEXPIRE, value)
            }
        },
        SSN: {
            get() {
                return this.$store.state.KYCSSN.SSN
            },
            set(value) {
                this.$store.commit(KYC_CHANGE_SSN, value)
            }
        },
        IdentityDoc: {
            get() {
                return this.$store.state.KYCidentitydoc.Doc.Url
            },
            set(value) {
                this.switchLoading()
                this.$store.dispatch(KYC_SAVE_IDDOC_REQUEST, value)
                    .finally(() => this.switchLoading())
            }
        },
        IdentityDocBack: {
            get() {
                return this.$store.state.KYCidentitydoc.DocBack.Url
            },
            set(value) {
                this.switchLoading()
                this.$store.dispatch(KYC_SAVE_IDDOC_REQUEST_BACK, value)
                    .finally(() => this.switchLoading())
            }
        },

        Screenplay: {
            get() {
                return this.$store.state.KYCwebcam.Screenplay
            }
        },
        WebcamURL: {
            get() {
                return this.$store.state.KYCwebcam.Url
            }
        },

        SelfieWithID: {
            get() {
                return this.$store.state.KYCother.SelfieWithID.Url
            },
            set(value) {
                this.switchLoading()
                this.$store.dispatch(KYC_SAVE_SELFIEWITHID_REQUEST, value)
                    .finally(() => this.switchLoading())
            }
        },
        ProofOfResidence: {
            get() {
                return this.$store.state.KYCother.ProofOfResidence.Url
            },
            set(value) {
                this.switchLoading()
                this.$store.dispatch(KYC_SAVE_PROOFOFRESIDENCE_REQUEST, value)
                    .finally(() => this.switchLoading())
            }
        },
        InvestorCertificate: {
            get() {
                return this.$store.state.KYCother.InvestorCertificate.Url
            },
            set(value) {
                this.switchLoading()
                this.$store.dispatch(KYC_SAVE_CERTIFICATE_REQUEST, value)
                    .finally(() => this.switchLoading())
            }
        },
        ExternalLoginFrom: {
            get() {
                return (this.$store.state.AppDBSet.ID) ? this.$store.state.AppDB.find(x => x.Id === this.$store.state.AppDBSet.ID).URL : null
            }
        },
        isPhoneVerified() {
            return this.$store.getters.IS_PHONE_VERIFIED
        },
        isEmailConfirmed() {
            return this.$store.getters.IS_EMAIL_CONFIRMED
        },
        isSessionReady() {
            return this.$store.getters.IS_SESSION_READY
        },
        KYCprovider() {
            return process.env.VUE_APP_FEATURE_KYC_PROVIDER
        }
    },
    async mounted() {
        this.$store.dispatch(COUNTRIES_REQUEST)
        this.$store.dispatch(STATES_REQUEST)

        this.setTitle(0, 0) //Установка первого заголовка
        // this.$refs.wizard.changeTab(0, 3) // переход на нужную вкладку

        // if (this.$store.state.KYC.KYC_PERSONAL_COMPLETE) {
        //     this.setTitle(0, 1)
        //     this.$refs.wizard.changeTab(0, 1)
        // }
        // else if (this.$store.state.KYC.KYC_ADDRESS_COMPLETE) {
        //     this.setTitle(0, 2)
        //     this.$refs.wizard.changeTab(0, 2)
        // }
        // else if (this.$store.state.KYC.KYC_IDENTITY_COMPLETE) {
        //     this.setTitle(0, 3)
        //     this.$refs.wizard.changeTab(0, 3)
        // }
        // else {
        //
        // }

        //Провека возможности записи видео с вебкамеры
        if (this.Webcam.Required && window.MediaRecorder === undefined) this.Webcam.SupportRecorder = false
        if (!this.Webcam.Required) delete this.StepTitles.Webcam

        if (this.KycComplete) {
            this.$refs.wizard.activateAll()  // включает перемещение по вкладкам
            this.$refs.wizard.shape = "tab" // меняет форму вкладок
        }
        //console.log(this.$refs.wizard)

        // Отображение уведомления о подтверждении почты
        if (
            this.$route &&
            this.$route.query &&
            this.$route.query.Notification &&
            this.$route.query.Notification === "EmailConfirmed"
        ) {
            Helpers.notify("is-success", this.$t("Message.Verify.EmailConfirmed"))
        }
    },
    beforeDestroy() {
        this.Disabled = true
    },
    methods: {
        async permissionCamera(videoUrl) {
            this.video.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            this.$nextTick(() => {
                if (videoUrl) {
                    this.$refs.video.src = videoUrl
                }
            })
        },
        async startVideo() {
            this.video.rec = true
            this.$refs.video.muted = true
            this.$refs.video.controls = false
            this.$refs.video.volume = 0
            this.$refs.video.srcObject = this.video.stream
            this.$refs.video.play()
            this.video.recorder = RecordRTC(this.video.stream, {
                type: "video",
                disableLogs: true,
                mimeType: "video/webm",
                canvas: {
                    width: 640,
                    height: 480
                }
            })
            this.video.recorder.startRecording()
            setTimeout(() => {
                this.stopVideo()
            }, 6000)
        },
        async stopVideo() {
            if (!this.video.rec) {
                return
            }
            await this.video.recorder.stopRecording()
            this.$refs.video.src = this.$refs.video.srcObject = null
            this.$refs.video.muted = false
            this.$refs.video.controls = true
            this.$refs.video.volume = 1
            setTimeout(() => {
                this.$refs.video.src = URL.createObjectURL(this.video.recorder.getBlob())
                this.$store.dispatch(KYC_SAVE_VIDEO_REQUEST, this.video.recorder.getBlob())
                    .then(() => {
                        Helpers.notify("is-success", this.$t("Message.KYC.Webcam.SaveSuccess"))
                        this.webcamInitUserVideo(this.WebcamURL)
                    })
                    .catch(() => {
                        Helpers.notify("is-danger", this.$t("Message.KYC.Webcam.SaveError"))
                    }).finally(() => {
                        this.video.rec = false
                    })
            }, 2000)
        },
        // Возвращает свойства указанной вкладки, иначе текущей
        getTab(index) {
            var DestinationTabNumber = Number()
            if (typeof (index) != "undefined" && index && index >= 0)
                DestinationTabNumber = index
            else
                DestinationTabNumber = this.$refs.wizard.activeTabIndex

            return this.$refs.wizard.$children[DestinationTabNumber].additionalInfo
        },
        setTitle: function (prevIndex, nextIndex) {
            if (!this.Disabled) {
                this.getInfo(nextIndex) // Получение данных для вкладки
                this.StepTitle = this.StepTitles[Object.keys(this.StepTitles)[this.getTab(nextIndex).id]] //Переключение заголовка
                this.BackTitle = (nextIndex - 1 >= 0) ? this.StepTitles[Object.keys(this.StepTitles)[this.getTab(nextIndex).id - 1]] : "" //Установка текста кнопки "Назад"
            }
        },
        getInfo(index) {
            this.switchLoading()
            switch (this.getTab(index).title) {
            case "Personal": {
                this.$store.dispatch(KYC_GET_PERSONAL_REQUEST)
                    .finally(() => {
                        this.switchLoading()
                    })
                break
            }
            case "Address": {
                this.$store.dispatch(KYC_GET_SSN_REQUEST)
                this.$store.dispatch(KYC_GET_ADDRESS_REQUEST)
                    .finally(() => this.switchLoading())
                break
            }
            case "Passport": {
                this.$store.dispatch(KYC_GET_SSN_REQUEST)
                this.$store.dispatch(KYC_GET_IDENTITY_REQUEST)
                this.$store.dispatch(KYC_GET_IDDOC_REQUEST)
                this.$store.dispatch(KYC_GET_IDDOC_REQUEST_BACK)
                    .finally(() => this.switchLoading())
                break
            }
            case "Webcam": {
                this.switchLoading()
                this.$store.dispatch(KYC_GET_SCREENPLAY_REQUEST)
                this.$store.dispatch(KYC_GET_VIDEO_REQUEST)
                    .then(() => {
                        if (this.WebcamURL) {
                            // this.webcamInitUserVideo(this.WebcamURL)
                            this.permissionCamera(this.WebcamURL)
                        }
                        else this.webcamInit()
                    })
                break
            }
            case "Other": {
                this.$store.dispatch(KYC_GET_SELFIEWITHID_REQUEST)
                this.$store.dispatch(KYC_GET_PROOFOFRESIDENCE_REQUEST)
                this.$store.dispatch(KYC_GET_CERTIFICATE_REQUEST)
                    .finally(() => this.switchLoading())
                break
            }
            }
        },
        mainValidate() {
            //return true // FOR DEVELOPMENT
            this.switchLoading()

            var TabValid = true //Проверка специфических для вкладки полей
            var StoreAction = null
            switch (this.getTab().title) {
            case "Personal": {
                StoreAction = KYC_SAVE_PERSONAL_REQUEST
                break
            }
            case "Address": {
                StoreAction = KYC_SAVE_ADDRESS_REQUEST
                break
            }
            case "Passport": {
                StoreAction = KYC_SAVE_IDENTITY_REQUEST
                break
            }
            case "Webcam": {
                TabValid = this.webcamValidate()
                break
            }
            case "Other": {
                break
            }
            }

            // Проверка обычных текстовых полей возвращает Promise, поэтому дожидаемся его и проверяем условия. Используем эту функцию как return для главной функции валидации.
            return this.$validator.validateAll(this.getTab().title)
                .then(result => {
                    //Если всё норм, то возвращаем правду
                    if (result === true && TabValid === true) {
                        if (StoreAction) {
                            return this.$store.dispatch(StoreAction)
                                .then((response) => {
                                    if (response.data) return true // Именно этот return вышибает сквозь эти два промиса на выход функции валидации
                                })
                                .catch(() => {
                                    return false
                                })
                        }
                        else return true
                    }
                    else if (result === false && TabValid === true) {
                        Helpers.notify("is-danger", this.$t("Validation.KYC.Text"))
                        return false
                    }
                    else return false
                })
                .catch(() => {
                    return false
                })
                .finally(() => this.switchLoading())
        },
        complete() {
            this.mainValidate()
                .then(result => {
                    if (result) {
                        // Helpers.notify("is-success", this.$t("Message.KYC.General.Complete"))
                        this.switchLoading()
                        this.$store.dispatch(KYC_CHECK_REQUEST)
                            .then(() => {
                                if (this.$store.getters.IS_APPID_SET && this.ExternalLoginFrom)
                                    window.location.href = this.ExternalLoginFrom
                                // else
                                //     this.$router.push({ name: "KYC" })
                            })
                            .finally(() =>  {
                                this.$router.push({ name: "KYC" })
                                this.switchLoading()
                            })
                    }
                    else return false
                })
        },
        sendToAgent() {
            this.$store.dispatch(KYC_CHECK_REQUEST)
                .then(() => {
                    Helpers.notify("is-success", this.$t("Message.KYC.SendToAgent.Success"))
                })
                .finally(() => {
                    this.$router.push({ name: "KYC" })
                })
        },
        webcamInit() {
            //Инициализация стрима с вебкамеры на странице
            var VideoElement = this.$refs.video
            VideoElement.removeAttribute("controls")
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        this.Webcam.Stream = stream
                        VideoElement.srcObject = stream
                        VideoElement.play()
                        //this.webcamRecord() // Переход к записи
                    })
                    .catch(reason => {
                        if (reason.name === "NotAllowedError") this.Webcam.ErrorNotAllowed = true // Пользователь запретил использование вебкамеры в браузере
                        else if (reason.name === "NotFoundError") this.Webcam.ErrorNotFound = true // Вебкамера не найдена
                        else this.Webcam.ErrorUnknown = true // Любая другая ошибка
                        // console.error(reason.name + ": " + reason.message)
                    })
            }
        },
        webcamRecord: function () {
            this.Webcam.Blob = null
            try {
                this.Webcam.Recorder = new MediaRecorder(this.Webcam.Stream, {
                    mimeType: "video/webm",
                    videoBitsPerSecond: 5000000 // 5Mbps
                })
            }
            catch (e) {
                // console.error("Exception while creating MediaRecorder: " + e)
                return
            }
            this.Webcam.Recorder.ondataavailable =
                (event) => {
                    this.Webcam.Chunks.push(event.data)
                }
            this.Webcam.Recorder.start(100) // Начинаем записывать видеопоток в массив блобов
            // console.info("Record started")
        },
        webcamStopRecord: function () {
            this.switchLoading()
            //Остановка записи видеопотока
            this.Webcam.Recorder.stop()
            this.Webcam.Stream.getTracks().forEach(track => {
                track.stop()
            })
            // console.info("Record stoped")

            // Собираем блоб из чанков
            this.Webcam.Blob = new Blob(this.Webcam.Chunks, { type: "video/webm" })
            this.$store.dispatch(KYC_SAVE_VIDEO_REQUEST, this.Webcam.Blob)
                .then(() => {
                    Helpers.notify("is-success", this.$t("Message.KYC.Webcam.SaveSuccess"))
                    this.webcamInitUserVideo(this.WebcamURL)
                })
                .catch(() => {
                    Helpers.notify("is-danger", this.$t("Message.KYC.Webcam.SaveError"))
                })
                .finally(() => {
                    // Очистка
                    this.Webcam.Chunks = []
                    this.Webcam.Stream = null
                    this.Webcam.Recorder = null
                    this.switchLoading()
                })
        },
        webcamInitUserVideo: function (url) {
            var VideoElement = this.$refs.video
            VideoElement.srcObject = null
            VideoElement.setAttribute("controls", "controls")
            VideoElement.src = url
            VideoElement.load()
            // VideoElement.play()
        },
        webcamValidate: function () {
            if (this.webcamRecordState === "recording") this.webcamStopRecord()
            // Если видео требуется, но не записано
            if (!this.WebcamURL) {
                Helpers.notify("is-danger", this.$t("Validation.KYC.Webcam"))
                return false
            }
            else
                return true
        },
        saveSSN() {
            if (this.SSN && this.SSN !== "" && this.SSN.length === 11)
                this.$store.dispatch(KYC_SAVE_SSN_REQUEST)
        }
    }
}
</script>
