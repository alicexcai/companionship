import { Message } from "../components/MessageList";
import axios from "axios";
import _ from 'lodash';
const GPTService = {
    async getAIResponse(messages: Message[], option: string): Promise<string> {
        const prompt = getPrompt(messages, option);
        const result = await getCompletion(prompt, option);
        return result;
    }
};

export function trimLinesHelper(additional: number, lines: string[], hardMax: number): string[] {
  let characterCount = additional;
  const trimmedLines = _.takeRightWhile(lines, (line) => {
    characterCount += line.length;
    return characterCount <= hardMax;
  });
  return trimmedLines;
}

function trimLines(additional: number, lines: string[]): string[] {
  // As the chat continues, there's a tradeoff:
  // More lines == higher cost + better result
  // 2048 - 300 is upper bound for tokens.
  // We will assume 1 token ~= 4 characters and keep a window of ~500 tokens.
  const maxPromptLength = 500 * 4;
  // Davinci costs 0.06 per 1k tokens, so this is roughly 3 cents per completion at the upper end.
  return trimLinesHelper(additional, lines, maxPromptLength);
}

type ConversationPrompt = { speaker: string, prompt: string };
let speakerDict = new Map<string, ConversationPrompt>();
speakerDict.set("Intellectual Conversation", { speaker: "Professor:", prompt: "The following is a conversation with a professor. The professor is intelligent, inquisitive, and wise.\n" });
speakerDict.set("Theraputic Conversation", { speaker: "Therapist:", prompt: "The following is a conversation with a therapist. The therapist is kind, compassionate, and helpful.\n" });
speakerDict.set("Reflective Conversation", { speaker: "Self:", prompt: "The following is a conversation with yourself. You are truthful, and you are trying to reflect on your life.\n" });
speakerDict.set("Problem-solving Conversation", { speaker: "Counselor:", prompt: "The following is a conversation with a counselor. The counselor is helpful and tries to help you solve a problem.\n" });
speakerDict.set("Open-ended Conversation", { speaker: "Friend:", prompt: "The following is a conversation with a friend. The friend is nice, playful, and casual.\n" });


function getPrompt(messages: Message[], option: string): string {

  const start = speakerDict.get(option)!.prompt;
  const additionalPrompt = speakerDict.get(option)!.speaker;

  const lines = messages.map((m) => `${m.author}: ${m.message}\n`);
  const trimmed = trimLines(start.length + additionalPrompt.length, lines);
  const combinedLines = trimmed.join("");
  
  return start + combinedLines + additionalPrompt;
}

const RESPONSE_TOKEN_MAXIMUM = 300;

// IMPORTANT: Please only use this for local testing. If you are deploying
// your app onto the internet, you should route requests through your own
// backend server to avoid exposing your OpenAI API key in your client
// side code.
async function getCompletion(prompt: string, option: string): Promise<string> {
  const data = {
    prompt,
    max_tokens: RESPONSE_TOKEN_MAXIMUM,
    temperature: 0.9,
    n: 1,
    stop: [speakerDict.get(option)!.speaker, `Me:`],
  };
  const result = await axios({
    method: "post",
    url: "https://api.openai.com/v1/engines/davinci/completions",
    data,
    headers: {
      Authorization: "Bearer <your-token>",
    },
  });
  return result.data.choices[0].text;
}

export default GPTService;
