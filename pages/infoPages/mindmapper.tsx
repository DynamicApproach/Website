import { useState } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";

const MindMapper = () => {
  const [openAIResponse, setOpenAIResponse] = useState<any | null>(null);
  const [hasResponse, setHasResponse] = useState(false);

  const handleOpenAIResponse = (response: any) => {
    setOpenAIResponse(response);
    setHasResponse(true);
  };

  return (
    <div>
      <Nav />
      <div className="flex h-screen flex-row bg-backgray bg-gradient-to-r ">
        <div className="h-screen max-h-fit w-8 w-screen max-w-md flex-1 p-4">
          <h1 className="border-spacing-48 text-center text-xl font-semibold ">
            Welcome To The Mindmap Creator. Enter a subject you would like a map
            of:
          </h1>

          <h2 className="sr-only">A mind map of:</h2>
          <OpenAIInput onResponse={handleOpenAIResponse} />
        </div>
        {hasResponse && (
          <div className="flex-2 h-screen w-screen">
            <MarkmapOutput content={openAIResponse} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapper;
