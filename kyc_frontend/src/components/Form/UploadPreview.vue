<template>
    <b-upload
        v-model="File"
        :accept="formats"
        drag-drop
        @input="onFileSelect"
    >
        <section v-if="!Image" class="section">
            <div class="content has-text-centered">
                <p><b-icon icon="upload" size="is-large" /></p>
                <p>{{ $t("Interface.UploadPreview.Drop") }}</p>
            </div>
        </section>
        <div v-if="Image && Image.length > 0" class="preview">
            <div class="preview-container">
                <img class="preview-container-image" :src="Image">
            </div>
            <div class="preview-info">
                <div class="preview-info-inner">
                    <p class="preview-filename">
                        <span class="preview-filename-inner">{{ Name }}</span>
                    </p>
                    <p class="preview-info-message">
                        {{ $t("Interface.UploadPreview.Replace") }}
                    </p>
                </div>
            </div>
        </div>
    </b-upload>
</template>

<script>
import Helpers from "@/utils/Helpers"

export default {
    name: "UploadPreview",
    props: {
        value: {
            type: String,
            default: null
        },
        minSize: {
            type: Number,
            default: null
        },
        maxSize: {
            type: Number,
            default: null
        },
        minResolution: {
            type: Number,
            default: null
        },
        formats: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            File: null,
            Image: null,
            Name: null
        }
    },
    watch: {
        value() {
            if (this.value)
                this.Image = this.value
        }
    },
    mounted() {
        if (this.value)
            this.Image = this.value
    },
    methods: {
        onFileSelect() {
            var input = event.target
            // Проверка, что файл существует
            if (input.files && input.files[0]) {

                // Проверка размера файла
                if (this.minSize && input.files[0].size < this.minSize) {
                    Helpers.notify("is-danger", this.$tc("Validation.UploadPreview.SizeSmall", 777, { size: (this.minSize / 1024) }))
                    return
                }
                else if (this.maxSize && input.files[0].size > this.maxSize) {
                    Helpers.notify("is-danger", this.$tc("Validation.UploadPreview.SizeBig", 777, { size: (this.maxSize / 1024) / 1024 }))
                    return
                }

                // Если это изображение
                if (input.files[0].type.match("image.*")) {
                    var THIS = this
                    var Name = input.files[0].name
                    var MinResolution = this.minResolution
                    var reader = new FileReader()

                    reader.onload = (e) => {
                        var img = new Image
                        img.onload = function() {
                            // Проверка разрещения изображения
                            if (MinResolution && (Math.min(img.width, img.height) < MinResolution)) {
                                Helpers.notify("is-danger", THIS.$tc("Validation.UploadPreview.ResolutionSmall", 777, { size: MinResolution }))
                                return false
                            }
                            else {
                                THIS.Image = img.src
                                THIS.Name = Name
                                // Синхронизация v-model
                                THIS.$emit("input", THIS.File)
                            }
                        }
                        img.src = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0])
                }
            }
        }
    }
}
</script>