import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from './firebase';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import './ImageUpload.css'



function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
       if(e.target.files[0]) {
        setImage(e.target.files[0]);
       }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
          () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              db.collection('post').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username
              });
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
        ) 
    }
    

  return (
    <div className='uploader'>
      <div className='upload'>
      <progress value={progress} max="100"/>
      <input type="file" onChange={handleChange}></input>
      <input type="text" placeholder="write caption..." onChange={event => setCaption(event.target.value)} value={caption}></input>
      </div>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
