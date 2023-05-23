/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const markmapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastInput, setLastInput] = useState("");

  const sanitizeFilename = (filename: string) => {
    return filename.replace(/[^a-z0-9_.-]/gi, "_");
  };
  const handleInputSubmit = (input: string) => {
    setLastSuccessfulInput(input);
  };
  const setLastSuccessfulInput = (inputData: string) => {
    setLastInput(inputData); // This is the correct function to use
  };

  const handleSvgContentUpdate = useCallback((newSvgContent: string) => {
    return setSvgContent(newSvgContent);
  }, []);
  const exportHTML = () => {
    console.log("exporting html");
    if (markmapRef.current) {
      const svgElem = markmapRef.current.querySelector("svg");
      if (svgElem) {
        const doc = document.implementation.createHTMLDocument("New Document");
        doc.body.innerHTML = `
          <div class="markmap">
            <script type="text/template">
              ---
              markmap:
                maxWidth: 100%
                maxHeight: 100%
                colorFreezeLevel: 2
              ---
  
              ${openAIResponse}
            </script>
          </div>
        `;
        doc.head.innerHTML = `
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mindmap</title>
  <style>
    html, body, div.markmap svg.markmap {
      position: absolute;
      font: 300 16px/20px sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.14.4"></script>
`;

        const filename = sanitizeFilename(
          lastInput ? `markmap-${lastInput}.html` : "mindmap.html"
        );

        const docString = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
        const blob = new Blob([docString], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        // revoke the Object URL
        URL.revokeObjectURL(url);
      }
    }
  };

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
              onInputSubmit={handleInputSubmit}
            />
          )}
        </div>

        {hasResponse && (
          <div
            ref={markmapRef}
            className="relative h-full min-h-screen w-full
    bg-gradient-to-br from-backgray to-albanypurp bg-cover
    bg-scroll text-sm sm:w-full md:w-1/2 lg:w-2/3"
          >
            <div className="absolute left-0 top-0 h-full w-full">
              <MarkmapOutput
                content={openAIResponse}
                key={requestKey}
                onNodeClick={handleNodeClick}
                onSvgContentUpdate={handleSvgContentUpdate}
                lastInput={lastInput}
              />
            </div>
            <div
              className="bg-black absolute right-4 top-4 
            flex flex-col items-start rounded bg-opacity-50 p-2 backdrop-opacity-75"
            >
              {showMessage && (
                <div className="mb-2 h-fit w-fit text-sm backdrop-opacity-100 sm:text-base md:text-lg">
                  <p> You can click on nodes to expand them!</p>
                </div>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 mt-2 
        cursor-pointer rounded px-4 py-2 font-bold text-white backdrop-opacity-100"
                onClick={exportHTML}
              >
                Download HTML Version
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapper;
