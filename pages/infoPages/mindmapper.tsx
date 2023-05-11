import { useState } from "react";
import OpenAIInput from "../../components/OpenAIInput";
import MarkmapOutput from "../../components/MarkmapOutput";
import Nav from "components/Nav";
import styles from "styles/Mindmap.module.css";

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
      <div
        className="from- flex  h-screen bg-gradient-to-r
   to-albanypurp bg-cover bg-scroll"
      >
        <div className={styles.card}>
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Welcome To The Mindmap Creator.
          </h1>{" "}
          <h1 className="text-l mb-4 text-center font-semibold">
            {" "}
            Enter a subject you would like a map of in the box below. It can
            take a second to load!
          </h1>
          <h2 className="sr-only">A mind map of:</h2>
          <OpenAIInput onResponse={handleOpenAIResponse} />
        </div>
        {hasResponse && (
          <div className="flex-2 h-full w-full">
            <MarkmapOutput content={openAIResponse} key={requestKey} />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapper;
