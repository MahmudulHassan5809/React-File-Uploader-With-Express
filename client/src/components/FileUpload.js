import React,{ Fragment, useState } from 'react';
import axios from 'axios';

import Message  from './Message';
import Progress  from './Progress';

const FileUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedPercentage, setUploadedPercentage] = useState(0);

  const [message, setMessage] = useState('');

  const onChange = e => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',file);

    try {
      const res = await axios.post('/upload',formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            setUploadedPercentage(parseInt(Math.round((progressEvent.loaded * 100) /progressEvent.total)));

            // Clear Percentage
           setTimeout(() => setUploadedPercentage(0),10000);
          },
      });
      const { fileName,filePath } = res.data;

      setUploadedFile({fileName,filePath});

      setMessage('File Uploaded');

    } catch (err) {
      if(err.response.status === 500){
        setMessage('There Was A problem With The Server');

      }else{
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
        {message ? <Message msg={message}/> : null}
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                <label className="custom-file-label">{filename}</label>
           </div>

           <Progress percentage={uploadedPercentage}/>

          <input type="submit" value="upload" className="btn btn-primary btn-block mt-4"/>

        </form>

        { uploadedFile ? <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <h3 className="text-center">
                    {uploadedFile.fileName}
                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt=""/>
                </h3>
            </div>
        </div> : null }
    </Fragment>
  )
}

export default FileUpload
