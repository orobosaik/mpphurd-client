import "./planBill.css";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import PrintWrapper from "../../widgets/printWrapper/PrintWrapper";
import { format } from "date-fns";

export default function PlanBill({ data }) {
	const formatToNaira = (amount) => {
		return Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(amount);
	};

	const [billData, setBillData] = useState(data?.bills[0]);

	let componentRef = useRef(null);

	const contentRef = () => {
		return (
			<>
				{billData?.type === "assessment" && (
					<>
						<div className="billTitle">Development Permit Assessment Form</div>

						<div className="billDetails">
							<div className="billDetailsTitle">Details of Application</div>
							<div className="billDetailsTopItems">
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">File No</div>
									<div className="billDetailsTopItemText">BC/3522/2023</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Applicant Name</div>
									<div className="billDetailsTopItemText">
										Mr. Osaretin Emmanuel Josh
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Telephone:</div>
									<div className="billDetailsTopItemText">
										0808358343, 0908273423
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Site Location:</div>
									<div className="billDetailsTopItemText">
										No. 3b Ekenwan barracks, off Etete Crescent
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Applicant Name</div>
									<div className="billDetailsTopItemText">
										Mr. Osaretin Emmanuel Josh
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">
										Building Description:
									</div>
									<div className="billDetailsTopItemText">Built Building</div>
								</div>
							</div>

							<div className="billAnalysisTitle">Fees Analysis</div>
							<div className="billAnalysisItems">
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Registration Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData.registrationFee)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Development Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData.developmentFee)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Volume of Building:
										</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData.volumeOfBuilding.sum)}
										</span>
									</div>

									{billData.volumeOfBuilding.list.map((e, i) => {
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
											{formatToNaira(billData.landArea.sum)}
										</span>
									</div>
									<div className="billAnalysisBreakdown">
										<div className="billAnalysisBreakdownNum">1.</div>
										<div className="billAnalysisBreakdownCal">
											<span>{`${billData.landArea.areaOfPlot}sm x ${
												billData.landArea.fee
											} (psm) = ${formatToNaira(billData.landArea.sum)}`}</span>
										</div>
										<div className="billAnalysisBreakdownSum">
											{formatToNaira(billData.landArea.sum)}
										</div>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Building Facilities:
										</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData.facilities.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Other Fees:</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData?.others?.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">TOTAL</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData?.sum)}
										</span>
									</div>
								</div>
							</div>
							{billData.previous.status && (
								<div className="billAnalysisPrev">
									<span>{`Previous Assessment = ${formatToNaira(
										billData.previous.amount
									)}`}</span>
									<span>{`New Amount : ${formatToNaira(
										billData.sum
									)} - ${formatToNaira(
										billData.previous.amount
									)} = ${formatToNaira(billData.payable)}`}</span>
								</div>
							)}
							<div className="billAnalysisTotalPay">
								<span>Total Payable Amount:</span>
								<span>{formatToNaira(billData?.payable)}</span>
							</div>
							<div className="planBillViewFooter">
								<div className="planBillViewFooterItem">
									<span>{billData?.officer?.name}</span>
									<span>Assessment Officer</span>
								</div>
								<div className="planBillViewFooterItem">
									<span>{format(billData.date, "dd/MM/yyyy")}</span>
									<span>Assessment Date</span>
								</div>
							</div>
						</div>
					</>
				)}
				{billData?.type === "fastTrack" && (
					<>
						<div className="billTitle fastTrack">
							Development Permit Fast Track Form
						</div>

						<div className="billDetails">
							<div className="billDetailsTitle">Details of Application</div>
							<div className="billDetailsTopItems">
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">File No</div>
									<div className="billDetailsTopItemText">BC/3522/2023</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Applicant Name</div>
									<div className="billDetailsTopItemText">
										Mr. Osaretin Emmanuel Josh
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Telephone:</div>
									<div className="billDetailsTopItemText">
										0808358343, 0908273423
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Site Location:</div>
									<div className="billDetailsTopItemText">
										No. 3b Ekenwan barracks, off Etete Crescent
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">Applicant Name</div>
									<div className="billDetailsTopItemText">
										Mr. Osaretin Emmanuel Josh
									</div>
								</div>
								<div className="billDetailsTopItem">
									<div className="billDetailsTopItemTitle">
										Building Description:
									</div>
									<div className="billDetailsTopItemText">Built Building</div>
								</div>
							</div>

							<div className="billAnalysisTitle">Fees Analysis</div>
							<div className="billAnalysisItems">
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Fast Track Fee:</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData?.sum)}
										</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">TOTAL</span>
										<span className="billAnalysisValue">
											{formatToNaira(billData?.sum)}
										</span>
									</div>
								</div>
							</div>

							<div className="billAnalysisTotalPay">
								<span>Total Payable Amount:</span>
								<span>{formatToNaira(billData?.payable)}</span>
							</div>
							<div className="planBillViewFooter">
								<div className="planBillViewFooterItem">
									<span>{billData?.officer?.name}</span>
									<span>Assessment Officer</span>
								</div>

								<div className="planBillViewFooterItem">
									<span>{format(billData.date, "dd/MM/yyyy")}</span>
									<span>Assessment Date</span>
								</div>
							</div>
						</div>
					</>
				)}
			</>
		);
	};

	return (
		<>
			<div className="planBill">
				<div className="planBillOptions">
					{data?.bills.map((e, i) => {
						return (
							<button
								key={i}
								className={`secondary ${
									e?._id === billData?._id && "selected"
								}`}
								onClick={() => {
									setBillData(e);
								}}>{`${e.type}`}</button>
						);
					})}
				</div>

				{data?.bills.length > 0 && (
					<>
						<div className="planBillViewWrapper">{contentRef()}</div>

						<PrintWrapper
							title={`${billData.type}_bill_${
								data.planNumber.fullValue || data.uniqueId
							} ${format(billData.date, "dd/MM/yyyy")}`}
							classes={"planBillPrint primary"}
							label={"Print this out!"}
							content={contentRef()}
						/>
					</>
				)}
				{data?.bills.length <= 0 && (
					<>
						<div className="notFound">
							<p>No Bills Found</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}
