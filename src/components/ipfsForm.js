import axios from 'axios';
import React, { useState } from 'react';
const JWT = process.env.JWT;
const gateway = process.env.GATEWAY;

function IpfsForm ()
{
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [cid, setCid] = useState('');

    const handleFileChange = (e) =>
    {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if(selectedFile)
        {
            pinFileToIpfs();
            console.log("success");
        }
        else
        {
            alert('Please select a file');
        }
    }

    const pinFileToIpfs = async () =>
    {
        const formData = new FormData();
        formData.append('file', selectedFile);
        try{
            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData,
                {
                    maxBodyLength: 'Infinity',
                    headers:{
                        'Content-Type': `multipart/form-data; boundry=${formData._Boundry}`,
                        'Authorization': `Bearer ${JWT}`
                    }
                });
            const newCid = res.data.IpfsHash;
            setCid(res.data.IpfsHash);

            const newImageURL = gateway + newCid;
            setImageURL(newImageURL);
            
            console.log(imageURL);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Upload to IPFS</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput">Choose a file:</label>
                    <input 
                        type='file'
                        id='fileInput'
                        accept=".pdf, .jpg, .png"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>

            {imageURL && (
                <div>
                    <h2>Uploaded Image</h2>
                    <img src={imageURL} alt='uploaded' />
                </div>
            )}
        </div>
    );
}


export default IpfsForm;