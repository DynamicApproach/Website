import { useEffect, useRef, useState } from "react";
import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";
import "markmap-view/";
import PropTypes from "prop-types";

interface MarkmapOutputProps {
  content: string;
}
const MarkmapOutput: React.FC<MarkmapOutputProps> = ({ content }) => {
  const markmapRef = useRef<HTMLDivElement>(null);
  const markmapInstanceRef = useRef<Markmap>();
  const [uploadedContent, setUploadedContent] = useState<string | null>(null);

  useEffect(() => {
    if (!markmapRef.current) return;

    const transformer = new Transformer();
    let root;

    try {
      root = JSON.parse(uploadedContent ? uploadedContent : content);
    } catch (error) {
      root = transformer.transform(
        uploadedContent ? uploadedContent : content
      ).root;
    }

    let svgElement = markmapRef.current.querySelector("svg");

    // Create svg element only if it doesn't exist
    if (!svgElement) {
      svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      markmapRef.current.appendChild(svgElement);

      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");
      svgElement.setAttribute("preserveAspectRatio", "xMinYMin meet");
      svgElement.setAttribute("viewBox", "0 0 1000 1000");
    }

    if (markmapInstanceRef.current) {
      markmapInstanceRef.current.destroy();
    }

    markmapInstanceRef.current = Markmap.create(svgElement, {}, root);

    return () => {
      if (markmapInstanceRef.current) {
        markmapInstanceRef.current.destroy();
      }
    };
  }, [content, uploadedContent]);

  const handleDownload = () => {
    const blob = new Blob([uploadedContent || content], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markmap.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      // If no file, reset uploadedContent to null
      setUploadedContent(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result?.toString();
      if (text) {
        setUploadedContent(text);
      }
    };
    reader.readAsText(file);
  };

  // MarkmapOutput.tsx
  return (
    <div className="relative flex h-full flex-col">
      <div ref={markmapRef} className="absolute z-0 h-auto w-full" />
      <div className="z-10 mt-4 flex items-center justify-start space-x-2">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 font-bold text-white"
        >
          Download
        </button>
        {
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="uploadInput"
            />
            <label
              htmlFor="uploadInput"
              className="bg-blue-500 hover:bg-blue-700 cursor-pointer rounded px-4 py-2 font-bold text-white"
            >
              Choose file
            </label>
          </div>
        }
      </div>
    </div>
  );
};

MarkmapOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkmapOutput;
