let express = require('express');
let excel = require('xlsx');    // npm install xlsx
const ab = require('multer');
let app = express();
let port = 4000;

const fleStore = ab.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }

})

const upload = ab({ storage: fleStore })

app.post("/single",upload.single("excel"),(req,res)=>{
    // let file =req.file
let idea = excel.readFile(`./upload/${req.file.originalname}`);
    let sheet = idea.SheetNames
    let data = [];
    for(let i = 0; i< sheet.length; i++){
        let sheetName = sheet[i]
        let shee = idea.Sheets[sheetName]
        let sheetData = excel.utils.sheet_to_json(shee)
        sheetData.forEach(a => {
            data.push(a)
            
        });
        
    }
    res.send(data)
})

// app.get('/',(req,res)=>{
//     let sheet = file.SheetNames
//     let data = [];
//     for(let i = 0; i< sheet.length; i++){
//         let sheetName = sheet[i]
//         let shee = file.Sheets[sheetName]
//         let sheetData = excel.utils.sheet_to_json(shee)
//         sheetData.forEach(a => {
//             data.push(a)
            
//         });
        
//     }
//     res.send(data)
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
