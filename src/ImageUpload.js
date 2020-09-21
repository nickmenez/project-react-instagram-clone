import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import { storage, db } from './firebase.js';
import './ImageUpload.css';

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);

            },
            (error) => {
                // Error function
                alert(error.message);
            },
            () => {
                // Complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Post image in db
                        db.collection("posts").add({
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
        );
    };

    return (
        <div className="imageupload">
            <div className="imageupload__container">
                <progress className="imageupload__progress" value={progress} max="100" />
                <input className="imageupload__upload" type="file" onChange={handleChange} />
                <input className="imageupload__caption" type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
                <Button className="imageupload__submit" onClick={handleUpload}>
                    Upload
            </Button>
            </div>
        </div>
    )
}

export default ImageUpload
