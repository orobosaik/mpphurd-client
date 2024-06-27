import React, { useCallback, useEffect, useRef, useState } from "react";
import "./planBillPreviewModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { format } from "date-fns";
import {
	BUILDING_STATUS,
	BUILDING_TYPE,
	LGA_LIST,
	STACK_LIST,
} from "../../utilities/appData";

export default function PlanBillPreviewModal({
	buttonIcon,
	buttonText,
	headerText,
	title,
	body,
	data,
	reload,
	disabled,
}) {
	const [submitting, setSubmitting] = useState(false);
	const [open, setOpen] = useState(false);

	const formatToNaira = (amount) => {
		return Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(amount);
	};

	const themeColor = getThemeColor();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};

	const KEY_NAME_ESC = "Escape";
	const KEY_EVENT_TYPE = "keyup";

	useEscapeKey(handleClose);

	function useEscapeKey(handleClose) {
		const handleEscKey = useCallback(
			(event) => {
				if (event.key === KEY_NAME_ESC) {
					handleClose();
				}
			},
			[handleClose]
		);

		useEffect(() => {
			document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

			return () => {
				document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
			};
		}, [handleEscKey]);
	}

	useEffect(() => {
		const modal = document.querySelector(".modalView");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
	}, [open]);

	return (
		<div>
			<button
				type="button"
				className="modalTrigger secondary"
				onClick={handleOpen}
				disabled={disabled}>
				{buttonText}
			</button>

			{open && (
				<dialog className="modalView">
					<header>
						<span className="headerText">{headerText}</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="applicationTitle">
						<h3>{title}</h3>
					</div>

					{data.type === "fastTrack" ? (
						<div className="">
							<div className="billAnalysisTitle">Fees Analysis</div>
							<div className="billAnalysisItems">
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Fast Track Fee:</span>
										<span className="billAnalysisValue">
											{formatToNaira(data?.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">TOTAL</span>
										<span className="billAnalysisValue">
											{formatToNaira(data?.sum)}
										</span>
									</div>
								</div>
							</div>

							<div className="billAnalysisTotalPay">
								<span>Total Payable Amount:</span>
								<span>{formatToNaira(data?.payable)}</span>
							</div>
							<div className="planBillViewFooter">
								<div className="planBillViewFooterItem">
									<span>{data?.officer?.name}</span>
									<span>Assessment Officer</span>
								</div>
								{/* <div className="planBillViewFooterItem">
									<span>Aigbe F.O</span>
									<span>Sign</span>
								</div> */}
								<div className="planBillViewFooterItem">
									<span>{format(data.date, "dd/MM/yyyy")}</span>
									<span>Assessment Date</span>
								</div>
							</div>
						</div>
					) : data.type === "assessment" ? (
						<div className="">
							<div className="billAnalysisTitle">Fees Analysis</div>
							<div className="billAnalysisItems">
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Registration Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(data.registrationFee)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Development Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(data.developmentFee)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Volume of Building:
										</span>
										<span className="billAnalysisValue">
											{formatToNaira(data.volumeOfBuilding.sum)}
										</span>
									</div>

									{data.volumeOfBuilding.list.map((e, i) => {
										let area = e.length * e.breath * e.height;
										return (
											<div className="billAnalysisBreakdown">
												<div className="billAnalysisBreakdownNum">{i + 1}.</div>
												<div className="billAnalysisBreakdownCal">
													<span>{`${e.length}m x ${e.breath}m x ${e.height}m = ${area}`}</span>
													<span>{`${area} x ${e.fee} (psm) = ${formatToNaira(
														e.total
													)}`}</span>
												</div>
												<div className="billAnalysisBreakdownSum">
													{formatToNaira(e.total)}
												</div>
											</div>
										);
									})}
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Land Area:</span>
										<span className="billAnalysisValue">
											{formatToNaira(data.landArea.sum)}
										</span>
									</div>
									<div className="billAnalysisBreakdown">
										<div className="billAnalysisBreakdownNum">1.</div>
										<div className="billAnalysisBreakdownCal">
											<span>{`${data.landArea.areaOfPlot}sm x ${
												data.landArea.fee
											} (psm) = ${formatToNaira(data.landArea.sum)}`}</span>
										</div>
										<div className="billAnalysisBreakdownSum">
											{formatToNaira(data.landArea.sum)}
										</div>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Building Facilities:
										</span>
										<span className="billAnalysisValue">
											{formatToNaira(data.facilities.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Other Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(data?.others?.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">TOTAL</span>
										<span className="billAnalysisValue">
											{formatToNaira(data?.sum)}
										</span>
									</div>
								</div>
							</div>
							{data.previous.status && (
								<div className="billAnalysisPrev">
									{/* {data.previous.list.map((e, i) => {
										return (
											<span>{`Previous Assessment ${i + 1} = ${formatToNaira(
												e
											)}`}</span>
										);
									})} */}

									<span>{`Previous Assessment = ${formatToNaira(
										data.previous.amount
									)}`}</span>
									{/* <span>{`Sum Previous Assessment = ${data.previous.sum}`}</span> */}
									<span>{`New Amount : ${formatToNaira(
										data.sum
									)} - ${formatToNaira(data.previous.amount)} = ${formatToNaira(
										data.payable
									)}`}</span>
								</div>
							)}
							<div className="billAnalysisTotalPay">
								<span>Total Payable Amount:</span>
								<span>{formatToNaira(data?.payable)}</span>
							</div>
							<div className="planBillViewFooter">
								<div className="planBillViewFooterItem">
									<span>{data?.officer?.name}</span>
									<span>Assessment Officer</span>
								</div>
								{/* <div className="planBillViewFooterItem">
									<span>Aigbe F.O</span>
									<span>Sign</span>
								</div> */}
								<div className="planBillViewFooterItem">
									<span>{format(data.date, "dd/MM/yyyy")}</span>
									<span>Assessment Date</span>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</dialog>
			)}
		</div>
	);
}
