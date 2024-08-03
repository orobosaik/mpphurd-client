import React from "react";
import { Quill } from "react-quill";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
		<path
			className="ql-stroke"
			d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
		/>
	</svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
		<path
			className="ql-stroke"
			d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
		/>
	</svg>
);
const CustomExpand = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M8 3H3v5M21 3h-5v5M8 21H3v-5M21 21h-5v-5" />
	</svg>
);

const CustomExitExpand = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M3 21L10.5 13.5M3 21V15.4M3 21H8.6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M21.0711 3L13.5 10.5M21.0711 3V8.65685M21.0711 3H15.4142"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
	this.quill.history.undo();
}
function redoChange() {
	this.quill.history.redo();
}
function fullscreenChange() {
	console.log(this.quill);
	const quill = this.quill;

	console.log(document.fullscreenElement);
	if (!document.fullscreenElement) {
		quill.container.style.height = "100%";
		quill.container.parentElement.parentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
		quill.container.style.height = "200px";
	}

	return;
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
	"arial",
	"comic-sans",
	"courier-new",
	"georgia",
	"helvetica",
	"lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
	toolbar: {
		container: "#toolbar",
		handlers: {
			undo: undoChange,
			redo: redoChange,
			fullscreen: fullscreenChange,
		},
	},
	history: {
		delay: 500,
		maxStack: 100,
		userOnly: true,
	},
};

// Formats objects for setting up the Quill editor
export const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"align",
	"strike",
	"script",
	"blockquote",
	"background",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"color",
	"code-block",
];

// Quill Toolbar component
export const QuillToolbar = () => (
	<div id="toolbar">
		<span className="ql-formats">
			{/* <select className="ql-font" defaultValue="arial">
				<option value="arial">Arial</option>
				<option value="comic-sans">Comic Sans</option>
				<option value="courier-new">Courier New</option>
				<option value="georgia">Georgia</option>
				<option value="helvetica">Helvetica</option>
				<option value="lucida">Lucida</option>
			</select> */}
			{/* <select className="ql-size" defaultValue="medium">
				<option value="extra-small">Size 1</option>
				<option value="small">Size 2</option>
				<option value="medium">Size 3</option>
				<option value="large">Size 4</option>
			</select> */}
			<select className="ql-header" defaultValue="3">
				<option value="1">Heading</option>
				<option value="2">Subheading</option>
				<option value="3">Normal</option>
			</select>
		</span>
		<span className="ql-formats">
			<button className="ql-bold" />
			<button className="ql-italic" />
			<button className="ql-underline" />
			<button className="ql-strike" />
		</span>
		<span className="ql-formats">
			<button className="ql-list" value="ordered" />
			<button className="ql-list" value="bullet" />
			<button className="ql-indent" value="-1" />
			<button className="ql-indent" value="+1" />
			<select className="ql-align" />
		</span>
		{/* <span className="ql-formats">
			<button className="ql-script" value="super" />
			<button className="ql-script" value="sub" />
			<button className="ql-blockquote" />
			<button className="ql-direction" />
		</span> */}
		{/* <span className="ql-formats">
			<select className="ql-color" />
			<select className="ql-background" />
		</span> */}
		{/* <span className="ql-formats">
			<button className="ql-link" />
			<button className="ql-video" />
		</span> */}
		<span className="ql-formats">
			{/* <button className="ql-formula" /> */}
			{/* <button className="ql-code-block" /> */}
			<button className="ql-image" />
			{/* <button className="ql-clean" /> */}
			<button className="ql-undo">
				<CustomUndo />
			</button>
			<button className="ql-redo">
				<CustomRedo />
			</button>
			<button className="ql-fullscreen">
				<CustomExitExpand />
			</button>
		</span>
	</div>
);

export default QuillToolbar;
