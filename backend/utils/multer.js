const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

const resumeStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'JobPortal/Resumes',
        resource_type: "auto",
        allowed_formats: ["pdf", "doc", "docx"],
        public_id: (req, file) => `${crypto.randomBytes(10).toString('hex')}`
    },
})

const resumeUpload = multer({ storage: resumeStorage })

module.exports = resumeUpload