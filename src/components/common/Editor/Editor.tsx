import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: ReactQuill["props"]["onChange"];
}

const Editor = ({ value, onChange }: Props) => {
  const modules = {
    toolbar: [
      // [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      // [{ list: "ordered" }, { list: "bullet" }],
      // ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      formats={formats}
      modules={modules}
    />
  );
};

export default Editor;
