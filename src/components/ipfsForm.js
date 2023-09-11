import axios from 'axios';
import React, { useState } from 'react';
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNjgzNDBjNi1mODNmLTQ5M2EtODA2NS1iYjNhZTQ1ZWYwZWIiLCJlbWFpbCI6ImRyZXduaHVuaWFrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYjk5YjZmYjBiOTBiYmNjZjJlNiIsInNjb3BlZEtleVNlY3JldCI6IjI0MDgwZmEzOWRhODhjZGMwYWJlODkwZDhjNGUyNzgyOWUxYjg1Y2EwYThlMzJkNWEyOGFlZjQ4ZmM1OTc2NjMiLCJpYXQiOjE2OTQ0NDkwMjl9.gq-pmzARyWpd4eBwNuzB69jxQ5p-VPDrQbdUU2lkh4I';
const gateway = 'https://teal-unusual-bandicoot-751.mypinata.cloud/ipfs/';

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