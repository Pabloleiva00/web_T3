import axios from 'axios'

const API = axios.create({
  baseURL: 'https://random-d.uk/api'
})

/**
 * GET /random
 * Devuelve JSON { url, message }
 * @param {'GIF'|'JPG'} [type='JPG']
 */
export function fetchRandomDuck(type = 'JPG') {
  return API.get('/random', { params: { type: type.toUpperCase() } })
}

/**
 * GET /quack
 * Idéntico a /random
 * @param {'GIF'|'JPG'} [type='JPG']
 */
export function fetchQuack(type = 'JPG') {
  return API.get('/quack', { params: { type: type.toUpperCase() } })
}

/**
 * GET /randomimg
 * Devuelve directamente el archivo de imagen (blob)
 * @param {'GIF'|'JPG'} [type='JPG']
 */
export function fetchRandomImageFile(type = 'JPG') {
  return API.get('/randomimg', {
    params: { type: type.toUpperCase() },
    responseType: 'blob'
  })
}

/**
 * GET /list
 * Lista todos los nombres de archivos disponibles
 * Respuesta JSON: { images: [...], gifs: [...], http: [...], image_count, gif_count }
 */
export function fetchImageList() {
  return API.get('/list')
}

/**
 * GET /:num.jpg  ó /:num.gif
 * Devuelve un archivo de imagen específico (blob)
 * @param {number|string} num  Número de la imagen
 * @param {'jpg'|'gif'} [ext='jpg']
 */
export function fetchImageByNumber(num, ext = 'jpg') {
  return API.get(`/${num}.${ext}`, { responseType: 'blob' })
}

/**
 * GET /http/:code(.jpg)
 * Imagen de duck para un código HTTP (blob)
 * @param {number|string} code  Código HTTP (p.ej. 404)
 * @param {'jpg'|'gif'} [ext='jpg']
 */
export function fetchHttpStatusImage(code, ext = 'jpg') {
  return API.get(`/http/${code}.${ext}`, { responseType: 'blob' })
}

/**
 * POST https://random-d.uk/add[?format=json]
 * Subir imágenes (multipart/form-data)
 * Devuelve JSON con estado de la subida si usas ?format=json
 * Docs: https://random-d.uk/add :contentReference[oaicite:1]{index=1}
 * @param {FormData} formData  FormData con la imagen bajo la clave "file"
 * @param {boolean} [formatJson=false] Añade ?format=json para recibir JSON
 */
export function uploadDuckImage(formData, formatJson = false) {
  const url = `https://random-d.uk/add${formatJson ? '?format=json' : ''}`
  return axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
