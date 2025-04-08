exports.handler = async function (event) {
    const { message, tone } = JSON.parse(event.body);

    const prompt = `Respond in a ${tone} tone. User says: "${message}"`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://jeremy-dev.netlify.app',
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful AI assistant.' },
                    { role: 'user', content: prompt }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Something went wrong.";

        return {
            statusCode: 200,
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
}
