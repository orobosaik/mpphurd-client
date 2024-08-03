import React, {
	useImperativeHandle,
	forwardRef,
	useState,
	useEffect,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./textEditor.css";
import screenfull from "screenfull";

const TextEditor = forwardRef((props, ref) => {
	const [editorHtml, setEditorHtml] = useState(props.value || "");
	const [isFullScreen, setIsFullScreen] = useState(false);

	// Expose the getContent method to the parent component
	useImperativeHandle(ref, () => ({
		getContent: () => {
			return editorHtml; // return the current content of the editor
		},
	}));

	const handleChange = (html) => {
		setEditorHtml(html);
	};

	// useEffect(() => {
	// 	  const customButton = document.querySelector('.ql-omega');
	// customButton.addEventListener('click', function() {
	//   if (screenfull.enabled) {
	//     console.log('requesting fullscreen');
	//     screenfull.request();
	//   } else {
	//     console.log('Screenfull not enabled');
	//   }


	// }, [])

	return (
		<div className="quill-editor">
			<ReactQuill
				value={editorHtml}
				onChange={handleChange}
				modules={TextEditor.modules}
				formats={TextEditor.formats}
			/>
		</div>
	);
});

// Specify Quill modules and formats
TextEditor.modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		["bold", "italic", "underline", "strike"],
		[{ align: [] }],
		// [{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		// ["clean"],

		["omega"],
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
