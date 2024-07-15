import {OpenAI} from 'openai'
import * as dotenv from 'dotenv';

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

export const test = (req, res) => {
    res.send('Hello from Dall-E !')
}

export const generate = async (req, res) => {
    try{
        const {prompt} = req.body

        const aiResponse = await openai.images.generate({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        })

        const image = aiResponse.data[0].b64_json
        res.status(200).json({photo: image})
        
    } catch (error){
        console.log(error)
    }
}