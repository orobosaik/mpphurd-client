import React, { useImperativeHandle, forwardRef, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./TextEditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./textEditor.css";

export const Editor = forwardRef((props, ref) => {
	const [editorHtml, setEditorHtml] = useState(props.value || "");



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
		<div className="text-editor">
			<EditorToolbar />
			<ReactQuill
				theme="snow"
				value={editorHtml}
				onChange={handleChange}
				placeholder={"Start typing..."}
				modules={modules}
				formats={formats}
			/>
		</div>
	);
});

export default Editor;
