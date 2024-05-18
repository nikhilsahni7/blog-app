import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  onChange: (content: string) => void;
  initialValue?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onChange,
  initialValue = "",
}) => {
  const [value, setValue] = useState<string>(initialValue);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_content: string, delta: any) => {
    const quill = delta.ops[0].insert;
    const plainText = quill.text;
    setValue(plainText);
    onChange(plainText);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          ["clean"],
        ],
      }}
      readOnly={false}
    />
  );
};

export default TextEditor;
