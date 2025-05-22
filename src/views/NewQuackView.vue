<template>
    <v-container class="py-10">
      <h2 class="text-h4 mb-6">Upload a New Quack</h2>
  
      <v-form @submit.prevent="handleSubmit" ref="formRef">
        <v-file-input
          v-model="file"
          label="Select a duck image"
          accept="image/*"
          prepend-icon="mdi-image"
          :rules="[fileRequired]"
          show-size
          @change="handleFileChange"
        />
  
        <!-- Contenedor para el editor -->
        <div
          v-if="previewUrl"
          ref="editorContainer"
          style="height: 500px; max-width: 700px; margin: 20px auto; border: 1px solid #ccc;"
        ></div>
  
        <v-btn
          color="yellow darken-2"
          class="mt-4"
          :loading="isUploading"
          type="submit"
        >
          Upload Edited Image
        </v-btn>
  
        <v-alert
          v-if="uploadMessage"
          class="mt-4"
          type="success"
          border="start"
          variant="outlined"
          prominent
        >
          {{ uploadMessage }}
        </v-alert>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
  import ImageEditor from 'tui-image-editor'  
  import 'tui-image-editor/dist/tui-image-editor.css'
  import { uploadDuckImage } from '@/services/api'
  
  const file = ref(null)
  const previewUrl = ref(null)
  const isUploading = ref(false)
  const uploadMessage = ref('')
  const formRef = ref(null)
  const editorContainer = ref(null)
  let imageEditorInstance = null
  
  const fileRequired = (v) => !!v || 'Please select a file'
  
  const handleFileChange = () => {
    if (file.value) {
      previewUrl.value = URL.createObjectURL(file.value)
    } else {
      previewUrl.value = null
    }
  }
  
  // Inicializar editor cuando previewUrl
  watch(previewUrl, async (newUrl) => {
    if (!newUrl) {
      if (imageEditorInstance) {
        imageEditorInstance.destroy()
        imageEditorInstance = null
      }
      return
    }
  
    await nextTick()
  
    if (editorContainer.value) {
      if (imageEditorInstance) {
        imageEditorInstance.destroy()
        imageEditorInstance = null
      }
  
      imageEditorInstance = new ImageEditor(editorContainer.value, {
        includeUI: {
          loadImage: {
            path: newUrl,
            name: 'duck-image',
          },
          theme: {},
          menu: ['draw', 'text', 'filter', 'shape', 'icon', 'crop'],
          initMenu: '',
          uiSize: {
            width: '700px',
            height: '500px',
          },
          menuBarPosition: 'bottom',
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
      })
    }
  })
  
  onBeforeUnmount(() => {
    if (imageEditorInstance) {
      imageEditorInstance.destroy()
      imageEditorInstance = null
    }
  })
  
  const handleSubmit = async () => {
  if (!imageEditorInstance) return

  isUploading.value = true
  uploadMessage.value = ''

  try {
    const dataUrl = imageEditorInstance.toDataURL()
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const formData = new FormData()
    formData.append('file', blob, file.value.name)

    const uploadRes = await uploadDuckImage(formData, true)

    if (uploadRes.data && uploadRes.data.success) {
      uploadMessage.value = 'Your duck has been submitted successfully!'
      file.value = null
      previewUrl.value = null
      imageEditorInstance.destroy()
      imageEditorInstance = null
      formRef.value.resetValidation()
    } else {
      uploadMessage.value = 'Upload failed, but no error was thrown.'
    }
  } catch (err) {
    uploadMessage.value = 'Error uploading image. Try again later.'
    console.error(err)
  } finally {
    isUploading.value = false
  }
}
  </script>  