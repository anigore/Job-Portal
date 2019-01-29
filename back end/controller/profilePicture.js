// var multer = require('multer')

// var fileUpload = {
//     uploadPiture: function(req, res) {
     
//         var storage = multer.diskStorage({
//             destination: function (req, file, cb) {
//               cb(null, 'uploads/')
//             },
//             filename: function (req, file, cb) {
//               cb(null, file.fieldname + '-' + Date.now() + '.png')
//               console.log("uploaded file - ",file)
//             }
//           });

//           var upload = multer({ storage: storage }).single('photo');


//           upload(req, res, function (err) {
//             if (err) {
//                 res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
//             } else {

//                 res.status(200).json({ status: 'success', message: 'Picture is Successfully uploaded', docs: '' });
//             }

//         });
//     }
// }

// module.exports = fileUpload;
