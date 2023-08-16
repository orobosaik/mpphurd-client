import "./planBill.css";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PlanBill() {
	let componentRef = useRef(null);

	return (
		<>
			<div className="planBill">
				<div className="planBillOptions">
					<button className="secondary selected">Assessment</button>
					<button className="secondary">Assessment2</button>
					<button className="secondary">Fastrack</button>
					<button className="secondary">Contravention</button>
				</div>


				<div className="planBillViewWrapper">
					<div className="planBillView" ref={(el) => (componentRef = el)}>
						<div className="planBillViewHeader">
							<div className="planBillViewHeaderTop">
								<img
									className="billLogo"
									src="/assets/logos/Logo-Edo State.png"
									alt=""
								/>
								<div className="planBillViewHeaderText">
									<span className="pbhState">EDO STATE GOVERNMENT</span>
									<span className="pbhMinistry">
										Ministry of Physical Planning, Housing, Urban and Regional
										Development (MPPHURD)
									</span>
									<span className="pbhAddress">
										2nd Floor, Block "C" Secretariat Buildings, Sapele Road,
										Benin City, Edo State.
									</span>
								</div>
								<img
									className="billLogo"
									src="/assets/logos/Logo-Mpphurd.png"
									alt=""
								/>
							</div>
							<div className="planBillViewHeaderBottom">
								<span className="pbhEmail">
									Email: info.mppud@edostate.gov.ng
								</span>
								<span className="pbhContact">
									Contact: 09087827121, 08102738172
								</span>
							</div>
						</div>

						<hr className="billViewHeaderUnderline" />

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
										<span className="billAnalysisValue">34,900</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Development Fees:</span>
										<span className="billAnalysisValue">34,900</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Volume of Building:
										</span>
										<span className="billAnalysisValue">111,124</span>
									</div>

									<div className="billAnalysisBreakdown">
										<div className="billAnalysisBreakdownNum">a.</div>
										<div className="billAnalysisBreakdownCal">
											<span>12.00m x 11.40m x 5.20m = 711.2313</span>
											<span>711.2313 x 25 (psm) = 55,562</span>
										</div>
										<div className="billAnalysisBreakdownSum">55,562</div>
									</div>
									<div className="billAnalysisBreakdown">
										<div className="billAnalysisBreakdownNum">b.</div>
										<div className="billAnalysisBreakdownCal">
											<span>12.00m x 11.40m x 5.20m = 711.2313</span>
											<span>711.2313 x 25 (psm) = 55,562</span>
										</div>
										<div className="billAnalysisBreakdownSum">55,562</div>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Land Area:</span>
										<span className="billAnalysisValue">32,250</span>
									</div>
									<div className="billAnalysisBreakdown">
										<div className="billAnalysisBreakdownNum">a.</div>
										<div className="billAnalysisBreakdownCal">
											<span>1370sm x 25 (psm) = 32,250</span>
										</div>
										<div className="billAnalysisBreakdownSum">32,250</div>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">
											Building Facilities:
										</span>
										<span className="billAnalysisValue">23,500</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">Other Fees:</span>
										<span className="billAnalysisValue">23,500</span>
									</div>
								</div>
								<div className="billAnalysisItem">
									<div className="billAnalysisItemSum">
										<span className="billAnalysisName">TOTAL</span>
										<span className="billAnalysisValue">453545</span>
									</div>
								</div>
							</div>
							<div className="billAnalysisPrev">
								<span>Previous Assessment(1) = 3224</span>
								<span>Previous Assessment(1) = 3224</span>
								<span>TPA = 5625 - 3224 = 2342</span>
								<span>New Total Assessment = 3224 + 2342 = 44,232</span>
							</div>
							<div className="billAnalysisTotalPay">
								<span>Total Payable Amount:</span>
								<span>N393,452</span>
							</div>
							<div className="planBillViewFooter">
								<div className="planBillViewFooterItem">
									<span>Aigbe F.O</span>
									<span>Assessment Officer</span>
								</div>
								<div className="planBillViewFooterItem">
									<span>Aigbe F.O</span>
									<span>Sign</span>
								</div>
								<div className="planBillViewFooterItem">
									<span>{ Date.now().toLocaleString()}</span>
									<span>Assessment Date</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ReactToPrint
					documentTitle="Hello world"
					trigger={() => (
						<button className="planBillPrint primary">Print this out!</button>
					)}
					content={() => componentRef}
				/>
			</div>
		</>
	);
}
