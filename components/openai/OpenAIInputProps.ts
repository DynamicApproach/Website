import PropTypes from "prop-types";

interface OpenAIInputProps {
  onResponse: (response: string) => void;
  nodeData: string | null;
  existingMarkdown: string;
  onClear?: () => void;
  onInputSubmit: (input: string) => void;
}

const OpenAIInputProps = {
  onResponse: PropTypes.func.isRequired,
  nodeData: PropTypes.string,
  existingMarkdown: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  onInputSubmit: PropTypes.func.isRequired
};

export default OpenAIInputProps;
