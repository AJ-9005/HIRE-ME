const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/resumes')),
    filename: (req, file, cb) => cb(null, `${crypto.randomBytes(10).toString('hex')}${path.extname(file.originalname)}`)
})

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/avatars')),
    filename: (req, file, cb) => cb(null, `${crypto.randomBytes(10).toString('hex')}${path.extname(file.originalname)}`)
})

const resumeUpload = multer({ storage: resumeStorage })
const avatarUpload = multer({ storage: avatarStorage })

module.exports = { resumeUpload: resumeUpload, avatarUpload: avatarUpload }