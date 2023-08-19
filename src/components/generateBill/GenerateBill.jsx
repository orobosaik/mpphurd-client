import { useState } from "react";
import {
	Add,
	ArrowDownwardRounded,
	ArrowDropDownRounded,
	PlusOneRounded,
	RemoveRounded,
} from "@mui/icons-material";
import "./generateBill.css";

export default function GenerateBill() {
	const [billType, setBillType] = useState("assessment");
	return (
		<>
			<div className="generateBillType">
				<span>Select Bill Type:</span>
				<select
					className="secondary"
					onChange={(e) => {
						setBillType(e.target.value);
					}}>
					<option value="assessment">Assessment</option>
					<option value="fastTrack">FastTrack</option>
					{/* {billType} */}
				</select>
			</div>

			{billType === "assessment" ? (
				<div className="generateBillWrapper">
					<div className="generateBillTitle">Fees Analysis</div>
					<div className="generateBillItems">
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Registration Fee:</span>
								<span className="generateBillItemValue">35,000</span>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Development Fees:</span>
								<span className="generateBillItemValue">34,000</span>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">
									Volume of Building:
								</span>
								<span className="generateBillItemValue">65,989</span>
							</div>
							<div className="generateBillBreakdown">
								<div>
									<button>
										<RemoveRounded />
									</button>
								</div>
								<div className="generateBillItemBreakdown">
									<div className="VOBLength">
										<span>Length:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div className="VOBBreath">
										<span>Breath:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div>
										<span className="VOBHeight">Height:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div>
										<span>Fee Per Sq Meter:</span>
										<button>
											25 <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>
							<button>
								<Add />
							</button>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Land Area:</span>
								<span className="generateBillItemValue">34,909</span>
							</div>
							<div className="generateBillBreakdown">
								<div className="generateBillItemBreakdown">
									<div className="AreaOfPlot">
										<span>Area of Plot:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div>
										<span>Fee Per Sq Meter:</span>
										<button>
											25 <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">
									Building Facilities:
								</span>
								<span className="generateBillItemValue">34,909</span>
							</div>

							<div className="generateBillBreakdown">
								<div>
									<button>
										<RemoveRounded />
									</button>
								</div>
								<div className="generateBillItemBreakdown">
									<div>
										<span>Type of Facility:</span>
										<button>
											Gate House <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>

							<button>
								<Add />
							</button>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Other Fees:</span>
								<span className="generateBillItemValue">34,909</span>
							</div>

							<div className="generateBillBreakdown">
								<div>
									<button>
										<RemoveRounded />
									</button>
								</div>
								<div className="generateBillItemBreakdown">
									<div>
										<span>Type of Fee:</span>
										<button>
											Land Use Fee <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>

							<button>
								<Add />
							</button>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">TOTAL AMOUNT:</span>
								<span className="generateBillItemValue">346,909</span>
							</div>
						</div>
					</div>
				</div>
			) : billType === "fastTrack" ? (
				<div className="generateBillWrapper">
					<div className="generateBillTitle">Fees Analysis</div>
					<div className="generateBillItems">
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">FastTrack Fee:</span>
								<span className="generateBillItemValue">35,000</span>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">
									Volume of Building:
								</span>
								<span className="generateBillItemValue">65,989</span>
							</div>
							<div className="generateBillBreakdown">
								<div>
									<button>
										<RemoveRounded />
									</button>
								</div>
								<div className="generateBillItemBreakdown">
									<div className="VOBLength">
										<span>Length:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div className="VOBBreath">
										<span>Breath:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div>
										<span className="VOBHeight">Height:</span>
										<input type="text" placeholder="00..." />
									</div>
									<div>
										<span>Fee Per Sq Meter:</span>
										<button>
											25 <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>
							<button>
								<Add />
							</button>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Other Fees:</span>
								<span className="generateBillItemValue">34,909</span>
							</div>

							<div className="generateBillBreakdown">
								<div>
									<button>
										<RemoveRounded />
									</button>
								</div>
								<div className="generateBillItemBreakdown">
									<div>
										<span>Type of Fee:</span>
										<button>
											Land Use Fee <ArrowDropDownRounded />
										</button>
									</div>
								</div>
								<div>54,908</div>
							</div>

							<button>
								<Add />
							</button>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">TOTAL AMOUNT:</span>
								<span className="generateBillItemValue">346,909</span>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<button className="primary">Save {billType}</button>
		</>
	);
}
