import { useState } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";

const MindMapper = () => {
  const [openAIResponse, setOpenAIResponse] = useState<any | null>(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [requestKey, setRequestKey] = useState(0);

  const handleOpenAIResponse = (response: any) => {
    if (typeof response === "object") {
      response = JSON.stringify(response);
    }
    setOpenAIResponse(response);
    setHasResponse(true);
    setRequestKey((requestKey) => requestKey + 1);
  };

  return (
    <div>
      <Nav />
      <div className=" flex  h-screen bg-cover  bg-scroll">
        <div
          className="border-gray-300 m-4 max-w-xs rounded-lg border-l 
        border-r border-t p-6 text-left text-white transition-colors duration-150 ease-in-out"
        >
          <h1 className="text-green-600 mb-4 text-center  text-lg  font-semibold text-nextblue">
            Welcome To The Mindmap Creator.
          </h1>{" "}
          <h1
            className="text-l text-gray-500 mb-4 text-center  text-lg 
          font-semibold leading-relaxed text-nextlightblueish"
          >
            {" "}
            Enter any subject you would like a map of in the box below. It can
            take a second to load!
          </h1>
          <h2 className="sr-only">A mind map of:</h2>
          <OpenAIInput onResponse={handleOpenAIResponse} />
        </div>
        {hasResponse && (
          <div className="flex-2 h-screen w-full text-sm">
            <MarkmapOutput content={openAIResponse} key={requestKey} />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapper;
