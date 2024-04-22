app.post('/generate-resume', async (req, res) => {
    const { userData } = req.body;
    try {
        const apiResponse = await axios.post('https://api.yourgptservice.com/generate', {
            prompt: `Generate a detailed resume for ${userData.name} with skills in ${userData.skills}`,
            apiKey: process.env.GPT_API_KEY
        });
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error generating resume:', error);
        res.status(500).send('Failed to generate resume');
    }
});
