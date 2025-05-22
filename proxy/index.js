import express from 'express'
import cors from 'cors'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'

const app = express()
const upload = multer()

app.use(cors()) // ✅ Permitir CORS desde cualquier origen

app.post('/upload-duck', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  try {
    const formData = new FormData()
    formData.append('file', req.file.buffer, req.file.originalname)

    const response = await axios.post(
      'https://random-d.uk/add?format=json',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    )

    res.status(response.status).json(response.data)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Upload failed' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Duck proxy server running on port ${PORT}`)
})
