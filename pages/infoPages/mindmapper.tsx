import { useState } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";

const mindMapper = () => {
  const [openAIResponse, setOpenAIResponse] = useState<any | null>(null);

  const handleOpenAIResponse = (response: any) => {
    setOpenAIResponse(response);
  };

  return (
    <div>
      <Nav />
      <div className="flex h-screen flex-row">
        <div className="h-screen max-h-fit w-8 w-screen max-w-md flex-1 p-4">
          <h2 className="sr-only">A mind map of:</h2>
          <OpenAIInput onResponse={handleOpenAIResponse} />
        </div>
        {
          <div className="flex-2 h-screen w-screen">
            <MarkmapOutput content={openAIResponse} />
          </div>
        }
      </div>
    </div>
  );
};

export default mindMapper;
