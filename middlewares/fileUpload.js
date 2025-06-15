const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileTypes = {
  cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  applicantImage: ['image/jpeg', 'image/png', 'image/jpg'],
  companyLogo: ['image/jpeg', 'image/png', 'image/jpg']
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/others';
    switch (file.fieldname) {
      case 'cv':
        folder = 'assets/cv';
        break;
      case 'applicantImage':
        folder = 'assets/applicant-images';
        break;
      case 'companyLogo':
        folder = 'assets/company-logos';
        break;
    }
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${timestamp}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = fileTypes[file.fieldname];
  if (allowed && allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}`), false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).fields([
  { name: 'cv', maxCount: 1 },
  { name: 'applicantImage', maxCount: 1 },
  { name: 'companyLogo', maxCount: 1 }
]);

module.exports = upload;
