import { SetStateAction, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import PropTypes from "prop-types";

interface OpenAIInputProps {
  onResponse: (response: string) => void;
}

const NEXT_PUBLIC_deploymentKey = process.env.DEPLOYMENT_KEY;
console.log(NEXT_PUBLIC_deploymentKey);
const OpenAIInput: React.FC<OpenAIInputProps> = ({ onResponse }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true); // set loading state
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_deploymentKey
      });
      const openai = new OpenAIApi(configuration);
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "A detailed mind map of a " + input + " in markdown format",
        temperature: 0.5,
        max_tokens: 4000,
        n: 1,
        stop: null
      });
      const choices = result.data.choices;
      const text = choices[0].text ?? "";
      setResponse(text);
      onResponse(text);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
    setIsLoading(false); // unset loading state
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label className="min-w-fit" htmlFor="input">
          I would like a mindmap of a(n):
        </label>
        <input
          type="text"
          id="input"
          name="input"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? <div>Loading...</div> : response}
    </div>
  );
};

OpenAIInput.propTypes = {
  onResponse: PropTypes.func.isRequired
};

export default OpenAIInput;
