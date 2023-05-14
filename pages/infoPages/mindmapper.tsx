/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";

const MindMapper = () => {
  const [openAIResponse, setOpenAIResponse] = useState<any | null>(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [clickedNode, setClickedNode] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const handleOpenAIResponse = (response: any) => {
    if (typeof response === "object") {
      response = JSON.stringify(response);
    }
    setOpenAIResponse(response);
    setHasResponse(true);
    setRequestKey((requestKey) => requestKey + 1);
  };

  const handleNodeClick = useCallback((clickedNodeTitle: string) => {
    console.log("handleNodeClick called with:", clickedNodeTitle); // Add this line
    setClickedNode(clickedNodeTitle);
  }, []);

  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br 
    from-backgray to-albanypurp bg-cover bg-scroll bg-blend-difference"
    >
      <Nav />
      <div className="flex  min-h-screen bg-cover  bg-scroll">
        <div
          className="border-gray-300 m-4 max-w-xs rounded-lg 
        border-l border-r border-t p-6 text-left  transition-colors duration-150 ease-in-out"
        >
          <h1 className="text-green-600 mb-4 text-center  text-lg  font-semibold text-nextblue">
            Welcome To The Mindmap Creator.
          </h1>
          <h1
            className="text-l text-gray-500 mb-4 text-center 
           text-lg font-semibold leading-relaxed text-nextlightblueish"
          >
            Enter any subject you would like a map of in the box below. It can
            take a second to load!
          </h1>
          <h2 className="sr-only">A mind map of:</h2>
          <OpenAIInput
            onResponse={handleOpenAIResponse}
            nodeData={clickedNode}
            existingMarkdown={openAIResponse || ""} // Add this prop
          />
        </div>
        {hasResponse && (
          <div
            className="bg-grad  h-full min-h-screen w-full
           bg-gradient-to-br from-backgray to-albanypurp bg-cover bg-scroll text-sm bg-blend-difference"
          >
            <MarkmapOutput
              content={openAIResponse}
              key={requestKey}
              onNodeClick={handleNodeClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapper;
