const axios = require('axios');
import Config from 'react-native-config';

const baseURL = Config.UPLOAD_URL;

const fileUpload = async (photo, path) => {
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

export default fileUpload;

