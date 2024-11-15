import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

interface MarkmapOutputProps {
  content: string;
  key: number;
  onNodeClick: (clickedNodeTitle: string) => void;
  onSvgContentUpdate: (svgContent: string) => void;
  lastInput?: string;
}
const sanitizeFilename = (input: string) => {
  return input.replace(/[/\\?%*: |"<>]/g, "-");
};

const MarkmapOutput: React.FC<MarkmapOutputProps> = ({
  content,
  onNodeClick,
  onSvgContentUpdate,
  lastInput
}) => {
  const markmapRef = useRef<HTMLDivElement>(null);
  const markmapInstanceRef = useRef<Markmap>();
  const [uploadedContent, setUploadedContent] = useState<string | null>(null);
  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: { target: any }) => {
      if (event.target) {
        const targetData = event.target.__data__;
        if (targetData && targetData.data) {
          onNodeClick(targetData.data);
        }
      }
    },
    [onNodeClick]
  );

  useEffect(() => {
    if (!markmapRef.current) return;

    const transformer = new Transformer();
    let root;

    try {
      const rawContent = uploadedContent || content;
      const lines = rawContent
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "");
      if (lines.length === 0) throw new Error("Content is empty or invalid.");

      const rootTitle = lines.shift()?.trim() || "Root Node";
      const formattedContent = `${rootTitle}\n${lines.join("\n")}`;
      root = transformer.transform(formattedContent).root;
    } catch (error) {
      root = transformer.transform(
        uploadedContent ? uploadedContent : content
      ).root;
      console.error("Error parsing JSON:", error);
    }

    let svgElement = markmapRef.current.querySelector("svg");

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
      svgElement.style.display = "block";
    }

    const style = document.createElement("style");
    style.textContent = ".markmap-foreign div { color: white !important; }";
    document.head.appendChild(style);

    if (svgElement) {
      if (markmapInstanceRef.current) {
        markmapInstanceRef.current.destroy();
      } else {
        markmapInstanceRef.current = Markmap.create(svgElement, {}, root);
      }
      markmapInstanceRef.current = Markmap.create(svgElement, {}, root);

      // Reattach the click listener
      svgElement.addEventListener("click", handleClick, false);

      const svgString = new XMLSerializer().serializeToString(svgElement);
      onSvgContentUpdate(svgString);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("click", handleClick, false);
        if (markmapInstanceRef.current) {
          markmapInstanceRef.current.destroy();
        }
      }
    };
  }, [content, uploadedContent, handleClick, onSvgContentUpdate]);

  const handleDownload = () => {
    const blob = new Blob([uploadedContent || content], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const sanitizedLastInput = sanitizeFilename(lastInput || "markmap");
    const filename = `${sanitizedLastInput}.json`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setUploadedContent(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result;
      if (typeof contents === "string") {
        setUploadedContent(contents);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="backdrop-opacity-100 h-full w-full flex flex-col">
      <div style={{ display: "inline-block" }}>
        <div>
          <label
            htmlFor="fileUpload"
            className="hover:bg-blue-700 w-min cursor-pointer 
            rounded px-4 py-2 font-bold text-white backdrop-opacity-100"
          >
            Upload Json Version
          </label>
          <input
            id="fileUpload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            title="Upload"
            type="file"
            accept=".json"
          />
        </div>
        <button
          className="hover:bg-blue-700 w-min cursor-pointer rounded px-4 py-2 font-bold text-white backdrop-opacity-100"
          onClick={handleDownload}
        >
          Download Json Version
        </button>
      </div>
      <div
        ref={markmapRef}
        className="relative z-0 mt-4 flex-grow h-full w-full 
        flex flex-col items-center justify-start space-x-2 backdrop-opacity-100"
      ></div>
    </div>
  );
};

MarkmapOutput.propTypes = {
  content: PropTypes.string.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  onSvgContentUpdate: PropTypes.func.isRequired,
  lastInput: PropTypes.string
};
export default MarkmapOutput;
