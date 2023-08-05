import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    organization:'org-mxHd0ydZIx3I4t0bblcwze4m',
    apiKey: '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'
})
const openai = new OpenAIApi(configuration);

export const generateCompletion = async (content) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    content
                }
            ],
            temperature: 0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        console.log(response.data.choices[0].message.content)
        return response.data.choices[0].message.content
    }
    catch (err) {
        console.error(err)
    }
}