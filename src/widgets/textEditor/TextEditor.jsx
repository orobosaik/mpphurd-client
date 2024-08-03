import React, { useImperativeHandle, forwardRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = forwardRef((props, ref) => {
	const [editorHtml, setEditorHtml] = useState("");

	// Expose the getContent method to the parent component
	useImperativeHandle(ref, () => ({
		getContent: () => {
			return editorHtml; // return the current content of the editor
		},
	}));

	const handleChange = (html) => {
		setEditorHtml(html);
	};

	return (
		<ReactQuill
			style={{
				height: "200px",
				marginBottom: "3.5rem",
				backgroundColor: "var(--white)",
				fontSize: "16px",
				fontWeight: "normal",
			}}
			className="quill-editor"
			value={editorHtml}
			onChange={handleChange}
			modules={TextEditor.modules}
			formats={TextEditor.formats}
		/>
	);
});

// Specify Quill modules and formats
TextEditor.modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

TextEditor.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"color",
	"video",
	"code-block",
	{
		font: [
			"arial",
			"comic-sans",
			"courier-new",
			"georgia",
			"helvetica",
			"impact",
			"lucida-console",
			"lucida-sans-unicode",
			"palatino-linotype",
			"times-new-roman",
			"tahoma",
			"trebuchet-ms",
			"verdana",
		],
		size: ["8", "9", "10", "11", "12", "14", "18", "24", "36"], // add font sizes here
	},
	"align",
];

export default TextEditor;
