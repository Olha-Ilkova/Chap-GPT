// Express
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-R67jLQYfezJgmOKouJiXD5lM",
    apiKey: "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",
})
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/',  async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: message
        }]
    })

    console.log(response)
    if (response.data.choices[0].message.content) {
        res.json({message: response.data.choices[0].message.content})
    }
})

app.listen(port, () => {
    console.log('OpenAI app listening');
});