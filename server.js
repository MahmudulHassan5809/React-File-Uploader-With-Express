const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());



// Upload EndPoint
app.post('/upload',(req,res) => {
    if(req.files === null){
        return res.status(400).json({ msg: 'No File Is Uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err => {
        if(err){
            console.log(err);
            return res.status(400).send(err);
        }
        
        res.json({ fileName: file.name,filePath: `/uploads/${file.name}`});
    });
});




const port = process.env.PORT || 5000;
app.listen(port,() => {
	console.log(`Sever Started on port ${port}`);
});
