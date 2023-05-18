/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";
import { logEvent, logException } from "utils/ana"; // adjust the path as needed

const MindMapper = () => {
  const [openAIResponse, setOpenAIResponse] = useState<any | null>(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [clickedNode, setClickedNode] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(true);

  const handleOpenAIResponse = (response: any) => {
    try {
      if (typeof response === "object") {
        response = JSON.stringify(response);
      }
      setOpenAIResponse(response);
      setHasResponse(true);
      setRequestKey((requestKey) => requestKey + 1);
    } catch (err) {
      if (err instanceof Error) {
        logException(err.message);
      } else {
        logException("An unexpected error occurred in handleOpenAIResponse");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000); // Show the message after 3 seconds

    return () => clearTimeout(timer); // This will clear the timer if the component unmounts before the time expires
  }, []);

  const handleNodeClick = useCallback((clickedNodeTitle: string) => {
    console.log("handleNodeClick called with:", clickedNodeTitle);
    logEvent("Node Expanded", "Click");
    setClickedNode(clickedNodeTitle);
  }, []);

  return (
    <div
      className="min-w-screen bg-grad min-h-screen bg-gradient-to-br 
      from-backgray to-albanypurp bg-cover bg-scroll bg-blend-difference"
    >
      <Nav />
      <div
        className="flex 
      min-h-screen flex-col bg-gradient-to-br from-backgray to-albanypurp bg-cover bg-scroll md:flex-row"
      >
        <div
          className="border-gray-300 m-4 rounded-lg 
    border-l border-r border-t p-6 text-left transition-colors duration-150 ease-in-out 
    sm:w-full md:w-1/2 lg:w-1/3"
        >
          <h1
            className="text-green-600 mb-4 text-center font-semibold
   text-nextblue sm:text-base md:text-lg lg:text-xl"
          >
            Welcome To The Mindmap Creator.
          </h1>
          <h1
            className="text-l text-gray-500 mb-4 text-center 
     font-semibold leading-relaxed text-nextlightblueish sm:text-base md:text-lg lg:text-xl"
          >
            Enter any subject you would like a map of in the box below. It can
            take a second to load!
          </h1>
          {openAIResponse && (
            <button
              onClick={() => setShowMarkdown(!showMarkdown)}
              className="bg-blue-500 hover:bg-blue-700 m-4 rounded px-4 py-2 font-bold text-white"
            >
              {showMarkdown ? "Hide" : "Show"} Menu
            </button>
          )}
          <h2 className="sr-only">A mind map of:</h2>

          {showMarkdown && (
            <OpenAIInput
              onResponse={handleOpenAIResponse}
              nodeData={clickedNode}
              existingMarkdown={openAIResponse || ""}
            />
          )}
        </div>

        {hasResponse && (
          <div
            className="bg-grad h-full min-h-screen w-full
    bg-gradient-to-br from-backgray to-albanypurp bg-cover
    bg-scroll text-sm bg-blend-difference sm:w-full md:w-1/2 lg:w-2/3"
          >
            {showMessage && (
              <p className="text-sm sm:text-base md:text-lg">
                You can click on nodes to expand them!
              </p>
            )}

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
