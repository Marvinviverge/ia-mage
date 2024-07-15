import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { generate, shareResult } from '../utils/api.service';
import { getToken, tokenDecode } from '../utils/account.service';
import { useAuth } from '../utils/AuthContext';
import Swal from 'sweetalert2'

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const { updateToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);

            try {
                await shareResult(form);
                navigate('/');
            } catch (error) {
                alert('Erreur lors du partage de l\'image.');
                console.error('Error in handleSubmit:', error);
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire({
                title: "Vous devez entrer un prompt et générer une image !",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'center',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
              })
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const [tokenData, setTokenData] = useState(tokenDecode(getToken()));
    
    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = tokenDecode(token);
            setTokenData(decodedToken);
        }
    }, [localStorage.getItem('token')]);
    
    const generateImageHandler = React.useCallback(
        async () => {
            if(tokenData.hasFreeTrial){
                if (form.prompt) {
                    setGeneratingImg(true);
                    try {
                        const imageData = await generate(form);
                        setForm({ ...form, photo: `data:image/jpeg;base64,${imageData.photo}` });
                        } catch (error) {
                            console.error('Error in generateImageHandler:', error);
                            Swal.fire({
                                title: "Erreur lors de la génération de l'image.",
                                icon: "error",
                                toast: true,
                                timer: 2000,
                                position: 'center',
                                timerProgressBar: true,
                                showConfirmButton: false,
                                showCancelButton: true,
                              })
                            } finally {
                                setGeneratingImg(false);
                                if(tokenData.role === 'user'){
                                    const updatedTokenData = await updateToken({tokenData})
                                    setTokenData(updatedTokenData)
                                }
                            }
                } else {
                    Swal.fire({
                        title: "Vous devez entrer un prompt !",
                        icon: "error",
                        toast: true,
                        timer: 2000,
                        position: 'center',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        showCancelButton: true,
                      })
                }
        } else {
            Swal.fire({
                title: "Désolé, vous avez déjà utilisé votre essai gratuit !",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'center',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
              })
        }
      },
      [form, tokenData],
    )   

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    Créer
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Créez des images visuellement époustouflantes grâce à notre intelligence artificielle et partagez-les avec notre communauté.
                </p>
            </div>

            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName="Votre nom"
                        type="text"
                        name="name"
                        placeholder="Entrez votre nom"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        labelName="Votre Prompt"
                        type="text"
                        name="prompt"
                        placeholder="ex: a pencil and watercolor drawing of a bright city in the future with flying cars"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImageHandler}
                        className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {generatingImg ? 'Génération en cours...' : 'Générer'}
                    </button>
                </div>

                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">** Une fois que vous avez créé l'image souhaitée, vous pouvez la partager avec notre communauté. **</p>
                    <button
                        type="submit"
                        className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {loading ? 'Partage en cours...' : 'Partagez avec la communauté'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreatePost;