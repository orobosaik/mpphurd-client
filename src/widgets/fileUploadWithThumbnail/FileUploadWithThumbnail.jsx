import React, { useRef, useState, forwardRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// import pdfjsWorker from "pdfjs-dist/webpack";
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import "./fileUploadWithThumbnail.css";

import * as pdfJS from "pdfjs-dist";
import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
import { FileUploadRounded } from "@mui/icons-material";
pdfJS.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

const FileUploadWithThumbnail = forwardRef((props, ref) => {
	const { keyId, id, label, type } = props;
	const [file, setFile] = useState(null);
	const [imageURL, setImageURL] = useState(null);
	const [inputKey, setInputKey] = useState(Date.now());

	const inputRef = ref;

	function formatBytes(bytes, decimals = 2) {
		if (!+bytes) return "0 Bytes";

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = [
			"Bytes",
			"KiB",
			"MiB",
			"GiB",
			"TiB",
			"PiB",
			"EiB",
			"ZiB",
			"YiB",
		];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		// console.log(selectedFile);

		if (selectedFile) {
			setFile(selectedFile);

			if (selectedFile.type === "application/pdf") {
				const reader = new FileReader();
				reader.onload = async () => {
					const pdfData = new Uint8Array(reader.result);
					const pdfDoc = await pdfjs.getDocument({ data: pdfData }).promise;
					const firstPage = await pdfDoc.getPage(1);
					const scale = 1.5;
					const viewport = firstPage.getViewport({ scale });

					const canvas = document.createElement("canvas");
					const context = canvas.getContext("2d");
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					const renderContext = {
						canvasContext: context,
						viewport,
					};

					await firstPage.render(renderContext).promise;
					const imageUrl = canvas.toDataURL("image/jpeg");

					setImageURL(imageUrl);
				};
				reader.readAsArrayBuffer(selectedFile);
			} else {
				const reader = new FileReader();
				reader.onload = () => {
					setImageURL(reader.result);
				};
				reader.readAsDataURL(selectedFile);
			}
		} else {
			setFile(null);
		}
	};

	return (
		<>
			<div className="applicationItem">
				<label htmlFor={id + "Document"}>{label}:</label>
				<label htmlFor={id + "Document"} className="uploadFileWrapper">
					<span>
						<FileUploadRounded />
						Upload File
					</span>
					<input
						key={inputKey}
						ref={inputRef}
						type="file"
						name={id + "Document"}
						id={id + "Document"}
						accept={
							type === "pdf"
								? ".pdf"
								: type == "image"
								? "image/png, image/jpeg, image/jpg"
								: "image/png, image/jpeg, image/jpg, .pdf"
						}
						onChange={handleFileChange}
					/>
				</label>
			</div>

			{file && (
				<div className="fileWrapper ">
					<div className="fileWrapperThumbnail">
						{file?.type === "application/pdf" ? (
							<img
								src={imageURL}
								alt={file?.name}
								style={{ maxWidth: "200px", maxHeight: "200px" }}
							/>
						) : (
							<img
								src={imageURL}
								alt={file?.name}
								style={{ maxWidth: "200px", maxHeight: "200px" }}
							/>
						)}
					</div>
					<div className="fileWrapperInfo">
						<div>
							<span>File Name:</span>
							<span>{file.name}</span>
						</div>
						<div>
							<span>Size:</span>
							<span>{formatBytes(file.size)}</span>
						</div>
						<div>
							<span>Type:</span>
							<span>{file.type}</span>
						</div>
						<div
							className="del"
							onClick={() => {
								setFile(null);
								setInputKey(Date.now());
							}}>
							Remove
						</div>
					</div>
				</div>
			)}
		</>
	);
});

export default FileUploadWithThumbnail;
