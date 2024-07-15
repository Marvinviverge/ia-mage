import Axios from './caller.service';
import Swal from 'sweetalert2'

export const shareResult = async (form) => {
    try {
        const response = await Axios.post('/api/v1/post', form);
        Swal.fire({
            title: "Image partagée avec succès !",
            icon: "success",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
        return response.data;
    } catch (error) {
        console.error('Error in shareResult:', error);
        throw error;
    }
};

export const generate = async (form) => {
    try {
        const response = await Axios.post('/api/v1/dalle', { prompt: form.prompt });
        Swal.fire({
            title: "Image générée !",
            icon: "success",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
        return response.data;
    } catch (error) {
        console.error('Error in generate:', error);
        throw error;
    }
};

export const getAllPosts = async () => {
    const response = await Axios.get('/api/v1/post')
    return response.data
}