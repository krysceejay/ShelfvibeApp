const axios = require('axios');
import Config from 'react-native-config';

const baseURL = Config.UPLOAD_URL;

export const fileUpload = async (photo, path) => {
    let data = new FormData();
    data.append("photo", {type: photo.type, uri: photo.uri, name: photo.name});
    let url = `${baseURL + path}`;
    const imgUpload = await axios({
        method: 'post',
        url,
        data,
        headers: {'Content-Type': 'multipart/form-data' }
        });

        return imgUpload;
    } 
    
export const removeFile = async (path, filename) => {
    let data = {filename}
    let url = `${baseURL}delete/${path}`;
    await axios({
        method: 'post',
        url,
        data
        });

     return true;
    }

