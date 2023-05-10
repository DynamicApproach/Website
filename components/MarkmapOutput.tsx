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
  const [root, setRoot] = useState<any>();

  useEffect(() => {
    if (content && markmapRef.current) {
      const transformer = new Transformer();
      const { root: newRoot } = transformer.transform(content);
      if (newRoot !== root) {
        setRoot(newRoot);
      }
    }
  }, [content]);

  useEffect(() => {
    if (root && markmapRef.current) {
      const svgElement = markmapRef.current.querySelector("svg");
      if (svgElement) {
        svgElement.remove();
      }
      const newSvgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      newSvgElement.setAttribute("style", "width: 100%; height: 100%");
      markmapRef.current.appendChild(newSvgElement);
      markmapInstanceRef.current = Markmap.create(newSvgElement, {}, root);
    }
    return () => {
      if (markmapInstanceRef.current) {
        markmapInstanceRef.current.destroy();
      }
    };
  }, [root]);

  return <div ref={markmapRef} style={{ width: "100%", height: "100%" }} />;
};

MarkmapOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkmapOutput;
