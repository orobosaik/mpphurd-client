import { useState } from "react";
import {
	Add,
	ArrowDownwardRounded,
	ArrowDropDownRounded,
	PlusOneRounded,
	RemoveRounded,
} from "@mui/icons-material";
import "./generateBill.css";
import { ASSESSMENT_FEES } from "../../utilities/appData";

export default function GenerateBill() {
	const [billType, setBillType] = useState("assessment");

	const [assessment, setAssessment] = useState({
		volumeOfBuilding: {
			list: [{ length: "", breath: "", height: "", fee: 0, total: 0 }],
			sum: 0,
		},
		landArea: { areaOfPlot: "", fee: "", sum: 0 },
		facilities: { list: [{ name: "", amount: 0 }], sum: 0 },
		others: { list: [{ name: "", amount: 0 }], sum: 0 },
		sum: ASSESSMENT_FEES.developmentFee + ASSESSMENT_FEES.registrationFee,
	});
	function calculateAssessmentSum(data) {
		let standard =
			ASSESSMENT_FEES.developmentFee + ASSESSMENT_FEES.registrationFee;
		return (
			data.volumeOfBuilding.sum +
			data.landArea.sum +
			data.facilities.sum +
			data.others.sum +
			standard
		);
	}

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
				<div className="generateBillWrapper ">
					<div className="generateBillTitle">{billType} Fees Analysis</div>
					<div className="generateBillItems">
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Registration Fee:</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(ASSESSMENT_FEES.registrationFee)}
								</span>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Development Fees:</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(ASSESSMENT_FEES.developmentFee)}
								</span>
							</div>
						</div>
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">
									Volume of Building:
								</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.volumeOfBuilding.sum)}
								</span>
							</div>
							<div className="">
								{/* VOLUME LIST */}
								{assessment.volumeOfBuilding.list.map((e, i) => {
									return (
										<div key={i} className="generateBillBreakdown">
											<div>
												<button
													onClick={() => {
														let newData = { ...assessment };

														newData.volumeOfBuilding.list.splice(i, 1);

														let sum = 0;
														newData.volumeOfBuilding.list.forEach((x) => {
															sum += x.total;
														});

														newData.volumeOfBuilding.sum = sum;

														newData.sum = calculateAssessmentSum(newData);

														setAssessment(newData);
													}}>
													<RemoveRounded />
												</button>
											</div>
											<div className="generateBillItemBreakdown">
												<div className="VOBLength">
													<span>Length:</span>
													<input
														type="number"
														min={0}
														placeholder="00..."
														value={e.length}
														onChange={(e) => {
															let val = Number(e.target.value);
															let newData = { ...assessment };
															newData.volumeOfBuilding.list[i].length = val;

															let newTotal =
																newData.volumeOfBuilding.list[i].breath *
																newData.volumeOfBuilding.list[i].height *
																val *
																newData.volumeOfBuilding.list[i].fee;

															newData.volumeOfBuilding.list[i].total = newTotal;

															let sum = 0;
															newData.volumeOfBuilding.list.forEach((x) => {
																sum += x.total;
															});

															newData.volumeOfBuilding.sum = sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}
													/>
												</div>
												<div className="VOBBreath">
													<span>Breath:</span>
													<input
														type="number"
														min={0}
														placeholder="00..."
														value={e.breath}
														onChange={(e) => {
															let val = Number(e.target.value);
															let newData = { ...assessment };
															newData.volumeOfBuilding.list[i].breath = val;

															let newTotal =
																newData.volumeOfBuilding.list[i].length *
																newData.volumeOfBuilding.list[i].height *
																val *
																newData.volumeOfBuilding.list[i].fee;

															newData.volumeOfBuilding.list[i].total = newTotal;

															let sum = 0;
															newData.volumeOfBuilding.list.forEach((x) => {
																sum += x.total;
															});

															newData.volumeOfBuilding.sum = sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}
													/>
												</div>
												<div>
													<span className="VOBHeight">Height:</span>
													<input
														type="number"
														min={0}
														placeholder="00..."
														value={e.height}
														onChange={(e) => {
															let val = Number(e.target.value);
															let newData = { ...assessment };
															newData.volumeOfBuilding.list[i].height = val;

															let newTotal =
																newData.volumeOfBuilding.list[i].breath *
																newData.volumeOfBuilding.list[i].length *
																val *
																newData.volumeOfBuilding.list[i].fee;

															newData.volumeOfBuilding.list[i].total = newTotal;

															let sum = 0;
															newData.volumeOfBuilding.list.forEach((x) => {
																sum += x.total;
															});

															newData.volumeOfBuilding.sum = sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}
													/>
												</div>
												<div>
													<span>Fee Per Sq Meter:</span>
													<select
														defaultValue={
															assessment.volumeOfBuilding.list[i].fee
														}
														className="secondary"
														onChange={(e) => {
															let val = Number(e.target.value);
															let newData = { ...assessment };
															newData.volumeOfBuilding.list[i].fee = val;

															let newTotal =
																newData.volumeOfBuilding.list[i].breath *
																newData.volumeOfBuilding.list[i].height *
																val *
																newData.volumeOfBuilding.list[i].length;

															newData.volumeOfBuilding.list[i].total = newTotal;

															let sum = 0;
															newData.volumeOfBuilding.list.forEach((x) => {
																sum += x.total;
															});

															newData.volumeOfBuilding.sum = sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}>
														<option value="">---</option>
														{ASSESSMENT_FEES.squareMeterFeeList.map((e) => {
															return (
																<option value={e}>
																	{Intl.NumberFormat("en-NG", {
																		style: "currency",
																		currency: "NGN",
																	}).format(e)}
																</option>
															);
														})}
													</select>
												</div>
											</div>
											<div>
												{Intl.NumberFormat("en-NG", {
													style: "currency",
													currency: "NGN",
												}).format(assessment.volumeOfBuilding.list[i].total)}
											</div>
										</div>
									);
								})}
							</div>
							<button
								onClick={() => {
									let newData = { ...assessment };
									newData.volumeOfBuilding.list.push({
										length: "",
										breath: "",
										height: "",
										fee: 0,
										total: 0,
									});
									setAssessment(newData);
								}}>
								<Add />
							</button>
						</div>

						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Land Area:</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.landArea.sum)}
								</span>
							</div>
							<div className="generateBillBreakdown">
								<div className="generateBillItemBreakdown">
									<div className="AreaOfPlot">
										<span>Area of Plot:</span>
										<input
											type="number"
											min={0}
											placeholder="00..."
											defaultValue={assessment.landArea.areaOfPlot}
											onChange={(e) => {
												let val = Number(e.target.value);
												let newData = { ...assessment };
												newData.landArea.areaOfPlot = val;

												let newTotal =
													newData.landArea.fee * newData.landArea.areaOfPlot;

												newData.landArea.sum = newTotal;

												newData.sum = calculateAssessmentSum(newData);

												setAssessment(newData);
											}}
										/>
									</div>
									<div>
										<span>Fee Per Sq Meter:</span>
										<select
											defaultValue={assessment.landArea.fee}
											className="secondary"
											onChange={(e) => {
												let val = Number(e.target.value);
												let newData = { ...assessment };
												newData.landArea.fee = val;

												let newTotal =
													newData.landArea.fee * newData.landArea.areaOfPlot;

												newData.landArea.sum = newTotal;

												newData.sum = calculateAssessmentSum(newData);

												setAssessment(newData);
											}}>
											<option value="">---</option>
											{ASSESSMENT_FEES.squareMeterFeeList.map((e) => {
												return (
													<option value={e}>
														{Intl.NumberFormat("en-NG", {
															style: "currency",
															currency: "NGN",
														}).format(e)}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div>
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.landArea.sum)}
								</div>
							</div>
						</div>

						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">
									Building Facilities:
								</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.facilities.sum)}
								</span>
							</div>

							<div>
								{assessment.facilities.list.map((e, i) => {
									return (
										<div className="generateBillBreakdown">
											<div className="generateBillBreakdown">
												<div>
													<button
														onClick={() => {
															let newData = { ...assessment };

															newData.facilities.list.splice(i, 1);

															let sum = 0;
															newData.facilities.list.forEach((x) => {
																sum += x.amount;
															});

															newData.facilities.sum = sum;

															let newSum =
																newData.facilities.sum +
																newData.landArea.sum +
																newData.facilities.sum +
																newData.others.sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}>
														<RemoveRounded />
													</button>
												</div>
												<div className="generateBillItemBreakdown">
													<div>
														<span>Type of Facility:</span>
														<select
															defaultValue={assessment.facilities.list[i].name}
															className="secondary"
															onChange={(e) => {
																let val = Number(e.target.value);

																let amt = Number(
																	e.target[e.target.selectedIndex].getAttribute(
																		"data-amount"
																	)
																);

																let newData = { ...assessment };
																newData.facilities.list[i].name = val;

																newData.facilities.list[i].amount = amt;

																let sum = 0;
																newData.facilities.list.forEach((x) => {
																	sum += x.amount;
																});

																newData.facilities.sum = sum;

																let newSum =
																	newData.facilities.sum +
																	newData.landArea.sum +
																	newData.volumeOfBuilding.sum +
																	newData.others.sum;

																newData.sum = calculateAssessmentSum(newData);

																setAssessment(newData);
															}}>
															<option data-amount="" value="">
																---
															</option>
															{ASSESSMENT_FEES.facilities.map((e) => {
																return (
																	<option data-amount={e.amount} value={e.name}>
																		{e.name}
																	</option>
																);
															})}
														</select>
													</div>
												</div>
												<div>
													{Intl.NumberFormat("en-NG", {
														style: "currency",
														currency: "NGN",
													}).format(e.amount)}
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<button
								onClick={() => {
									let newData = { ...assessment };
									newData.facilities.list.push({
										name: "",
										amount: 0,
									});
									setAssessment(newData);
								}}>
								<Add />
							</button>
						</div>

						{/* OTHERS */}
						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">Other Fees:</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.others.sum)}
								</span>
							</div>

							<div>
								{assessment.others.list.map((e, i) => {
									return (
										<div className="generateBillBreakdown">
											<div className="generateBillBreakdown">
												<div>
													<button
														onClick={() => {
															let newData = { ...assessment };

															newData.others.list.splice(i, 1);

															let sum = 0;
															newData.others.list.forEach((x) => {
																sum += x.amount;
															});

															newData.others.sum = sum;

															let newSum =
																newData.others.sum +
																newData.landArea.sum +
																newData.others.sum +
																newData.others.sum;

															newData.sum = calculateAssessmentSum(newData);

															setAssessment(newData);
														}}>
														<RemoveRounded />
													</button>
												</div>
												<div className="generateBillItemBreakdown">
													<div>
														<span>Type of Fee:</span>
														<select
															defaultValue={assessment.others.list[i].name}
															className="secondary"
															onChange={(e) => {
																let val = Number(e.target.value);

																let amt = Number(
																	e.target[e.target.selectedIndex].getAttribute(
																		"data-amount"
																	)
																);

																let newData = { ...assessment };
																newData.others.list[i].name = val;

																newData.others.list[i].amount = amt;

																let sum = 0;
																newData.others.list.forEach((x) => {
																	sum += x.amount;
																});

																newData.others.sum = sum;

																let newSum =
																	newData.others.sum +
																	newData.landArea.sum +
																	newData.volumeOfBuilding.sum +
																	newData.others.sum;

																newData.sum = calculateAssessmentSum(newData);

																setAssessment(newData);
															}}>
															<option data-amount="" value="">
																---
															</option>
															{ASSESSMENT_FEES.others.map((e) => {
																return (
																	<option data-amount={e.amount} value={e.name}>
																		{e.name}
																	</option>
																);
															})}
														</select>
													</div>
												</div>
												<div>
													{Intl.NumberFormat("en-NG", {
														style: "currency",
														currency: "NGN",
													}).format(e.amount)}
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<button
								onClick={() => {
									let newData = { ...assessment };
									newData.others.list.push({
										name: "",
										amount: 0,
									});
									setAssessment(newData);
								}}>
								<Add />
							</button>
						</div>

						<div className="generateBillItem">
							<div className="generateBillItemSummary">
								<span className="generateBillItemName">TOTAL AMOUNT:</span>
								<span className="generateBillItemValue">
									{Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
									}).format(assessment.sum)}
								</span>
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
										<input type="number" min={0} placeholder="00..." />
									</div>
									<div className="VOBBreath">
										<span>Breath:</span>
										<input type="number" min={0} placeholder="00..." />
									</div>
									<div>
										<span className="VOBHeight">Height:</span>
										<input type="number" min={0} placeholder="00..." />
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

			<div className="generateButtonsWrapper">
				<button className="primary">Save {billType}</button>
				<button className="secondary">Preview</button>
			</div>
		</>
	);
}
