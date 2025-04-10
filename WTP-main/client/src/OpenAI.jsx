import axios from "axios";

const API_URL = "https://api.openai.com/v1/completions"; // Exempel för OpenAI
const API_KEY = "DIN_OPENAI_API_NYCKEL"; // Lägg INTE hårdkodat här, använd .env!

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Fel vid hämtning av AI-svar:", error);
    return "Ett fel uppstod vid AI-förfrågan.";
  }
};
