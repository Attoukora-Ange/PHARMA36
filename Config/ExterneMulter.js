
    const multer = require('multer');
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) =>{
    //     cb(null, '/Public/images/mes_images');
    //     },
    //     filename: (req, file, cb) =>{
    //     const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    //     cb(null, file.fieldname.split(' ').join('_') + '_'+ uniqueSuffix)
    //     }
    // })
    const storage = multer.diskStorage({
        destination: '/Public/images/mes_images',
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now());
        }
    })
  
  const upload = multer({ storage: storage })
module.exports = upload;



