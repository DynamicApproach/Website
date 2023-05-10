import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (content && markmapRef.current) {
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("style", "width: 100%; height: 100%");
      markmapRef.current.appendChild(svgElement);

      const transformer = new Transformer();
      const { root } = transformer.transform(content);

      // destroy the previous Markmap instance, if any
      if (markmapInstanceRef.current) {
        markmapInstanceRef.current.destroy();
      }

      markmapInstanceRef.current = Markmap.create(svgElement, {}, root);
    }

    // clean up on unmount
    return () => {
      if (markmapInstanceRef.current) {
        markmapInstanceRef.current.destroy();
      }
    };
  }, [content]);

  return <div ref={markmapRef} style={{ width: "100%", height: "100%" }} />;
};

MarkmapOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkmapOutput;
