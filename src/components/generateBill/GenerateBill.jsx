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
import PlanBillPreviewModal from "../planBillPreviewModal/PlanBillPreviewModal";
import { useSelector } from "react-redux";
import { fetchInstance } from "../../utilities/fetcher";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function GenerateBill() {
	const [billType, setBillType] = useState("assessment");
	const [submitting, setSubmitting] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

	const themeColor = getThemeColor();

	const { currentUser } = useSelector((state) => state.user);

	const [fastTrack, setFastTrack] = useState({
		type: "fastTrack",
		date: Date.now(),
		payment: { status: false },
		officer: {
			id: currentUser._id,
			name: currentUser.firstName + " " + currentUser.lastName,
		},
		payable: ASSESSMENT_FEES.fastTrackFee,
		sum: ASSESSMENT_FEES.fastTrackFee,
	});
	const [assessment, setAssessment] = useState({
		type: "assessment",
		date: Date.now(),
		payment: { status: false },
		officer: {
			id: currentUser._id,
			name: currentUser.firstName + " " + currentUser.lastName,
		},
		registrationFee: ASSESSMENT_FEES.registrationFee,
		developmentFee: ASSESSMENT_FEES.developmentFee,
		volumeOfBuilding: {
			list: [{ length: null, breath: null, height: null, fee: 0, total: 0 }],
			sum: 0,
		},
		landArea: { areaOfPlot: null, fee: null, sum: 0 },
		facilities: { list: [{ name: null, amount: 0 }], sum: 0 },
		others: { list: [{ name: null, amount: 0 }], sum: 0 },
		previous: { status: false, amount: 0 },
		payable: ASSESSMENT_FEES.developmentFee + ASSESSMENT_FEES.registrationFee,
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
	const formatToNaira = (amount) => {
		return Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(amount);
	};

	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		// alert("WORKING");
		let newData =
			billType === "assessment"
				? assessment
				: billType === "fastTrack"
				? fastTrack
				: "";

		console.log(newData);

		try {
			const res = await fetchInstance.put(
				`/staffs/plan/${params.id}/create_bill`,
				newData
			);
			// console.log(res.data);

			// dispatch(resetOfficeData());
			navigate(-1);
			// reload(() => []);
			// handleClose();

			setTimeout(() => {
				toast.success(res.data, {});
			}, 200);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);
			// handleClose();
			toast.error(message, {});
		} finally {
			setSubmitting(false);
		}
	};

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

			<form onSubmit={handleSubmit}>
				{billType === "assessment" ? (
					<div className="generateBillWrapper ">
						<div className="generateBillTitle">{billType} Fees Analysis</div>
						<div className="generateBillItems">
							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">
										Registration Fee:
									</span>
									<span className="generateBillItemValue">
										{formatToNaira(assessment.registrationFee)}
									</span>
								</div>
							</div>
							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">
										Development Fees:
									</span>
									<span className="generateBillItemValue">
										{formatToNaira(assessment.developmentFee)}
									</span>
								</div>
							</div>
							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">
										Volume of Building:
									</span>
									<span className="generateBillItemValue">
										{formatToNaira(assessment.volumeOfBuilding.sum)}
									</span>
								</div>
								<div className="">
									{/* VOLUME LIST */}
									{assessment.volumeOfBuilding.list.map((e, i) => {
										return (
											<div key={i} className="generateBillBreakdown">
												<div>
													<button
														type="button"
														onClick={() => {
															let newData = { ...assessment };

															newData.volumeOfBuilding.list.splice(i, 1);

															let sum = 0;
															newData.volumeOfBuilding.list.forEach((x) => {
																sum += x.total;
															});

															newData.volumeOfBuilding.sum = sum;

															newData.sum = calculateAssessmentSum(newData);
															newData.payable =
																newData.sum - newData.previous.amount;

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
															step="0.01"
															placeholder="00..."
															value={e.length}
															required
															onChange={(e) => {
																let val = Number(e.target.value);
																let newData = { ...assessment };
																newData.volumeOfBuilding.list[i].length = val;

																let newTotal =
																	newData.volumeOfBuilding.list[i].breath *
																	newData.volumeOfBuilding.list[i].height *
																	val *
																	newData.volumeOfBuilding.list[i].fee;

																newData.volumeOfBuilding.list[i].total =
																	newTotal;

																let sum = 0;
																newData.volumeOfBuilding.list.forEach((x) => {
																	sum += x.total;
																});

																newData.volumeOfBuilding.sum = sum;
																newData.payable =
																	newData.sum - newData.previous.amount;

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
															step="0.01"
															placeholder="00..."
															value={e.breath}
															required
															onChange={(e) => {
																let val = Number(e.target.value);
																let newData = { ...assessment };
																newData.volumeOfBuilding.list[i].breath = val;

																let newTotal =
																	newData.volumeOfBuilding.list[i].length *
																	newData.volumeOfBuilding.list[i].height *
																	val *
																	newData.volumeOfBuilding.list[i].fee;

																newData.volumeOfBuilding.list[i].total =
																	newTotal;

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
															step="0.01"
															placeholder="00..."
															value={e.height}
															required
															onChange={(e) => {
																let val = Number(e.target.value);
																let newData = { ...assessment };
																newData.volumeOfBuilding.list[i].height = val;

																let newTotal =
																	newData.volumeOfBuilding.list[i].breath *
																	newData.volumeOfBuilding.list[i].length *
																	val *
																	newData.volumeOfBuilding.list[i].fee;

																newData.volumeOfBuilding.list[i].total =
																	newTotal;

																let sum = 0;
																newData.volumeOfBuilding.list.forEach((x) => {
																	sum += x.total;
																});

																newData.volumeOfBuilding.sum = sum;

																newData.sum = calculateAssessmentSum(newData);
																newData.payable =
																	newData.sum - newData.previous.amount;

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

																newData.volumeOfBuilding.list[i].total =
																	newTotal;

																let sum = 0;
																newData.volumeOfBuilding.list.forEach((x) => {
																	sum += x.total;
																});

																newData.volumeOfBuilding.sum = sum;

																newData.sum = calculateAssessmentSum(newData);
																newData.payable =
																	newData.sum - newData.previous.amount;

																setAssessment(newData);
															}}>
															<option value="">---</option>
															{ASSESSMENT_FEES.squareMeterFeeList.map((e) => {
																return (
																	<option value={e}>{formatToNaira(e)}</option>
																);
															})}
														</select>
													</div>
												</div>
												<div>
													{formatToNaira(
														assessment.volumeOfBuilding.list[i].total
													)}
												</div>
											</div>
										);
									})}
								</div>
								<button
									type="button"
									onClick={() => {
										let newData = { ...assessment };
										newData.volumeOfBuilding.list.push({
											length: null,
											breath: null,
											height: null,
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
										{formatToNaira(assessment.landArea.sum)}
									</span>
								</div>
								<div className="generateBillBreakdown">
									<div className="generateBillItemBreakdown">
										<div className="AreaOfPlot">
											<span>Area of Plot:</span>
											<input
												type="number"
												min={0}
												step="0.01"
												placeholder="00..."
												defaultValue={assessment.landArea.areaOfPlot}
												required
												onChange={(e) => {
													let val = Number(e.target.value);
													let newData = { ...assessment };
													newData.landArea.areaOfPlot = val;

													let newTotal =
														newData.landArea.fee * newData.landArea.areaOfPlot;

													newData.landArea.sum = newTotal;

													newData.sum = calculateAssessmentSum(newData);

													newData.payable =
														newData.sum - newData.previous.amount;
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
													newData.payable =
														newData.sum - newData.previous.amount;

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
									<div>{formatToNaira(assessment.landArea.sum)}</div>
								</div>
							</div>

							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">
										Building Facilities:
									</span>
									<span className="generateBillItemValue">
										{formatToNaira(assessment.facilities.sum)}
									</span>
								</div>

								<div>
									{assessment.facilities.list.map((e, i) => {
										return (
											<div className="generateBillBreakdown">
												<div className="generateBillBreakdown">
													<div>
														<button
															type="button"
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
																newData.payable =
																	newData.sum - newData.previous.amount;

																setAssessment(newData);
															}}>
															<RemoveRounded />
														</button>
													</div>
													<div className="generateBillItemBreakdown">
														<div>
															<span>Type of Facility:</span>
															<select
																defaultValue={
																	assessment.facilities.list[i].name
																}
																className="secondary"
																onChange={(e) => {
																	let val = Number(e.target.value);

																	let amt = Number(
																		e.target[
																			e.target.selectedIndex
																		].getAttribute("data-amount")
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

																	newData.payable =
																		newData.sum - newData.previous.amount;
																	setAssessment(newData);
																}}>
																<option data-amount="" value="">
																	---
																</option>
																{ASSESSMENT_FEES.facilities.map((e) => {
																	return (
																		<option
																			data-amount={e.amount}
																			value={e.name}>
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
									type="button"
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
										{formatToNaira(assessment.others.sum)}
									</span>
								</div>

								<div>
									{assessment.others.list.map((e, i) => {
										return (
											<div className="generateBillBreakdown">
												<div className="generateBillBreakdown">
													<div>
														<button
															type="button"
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
																newData.payable =
																	newData.sum - newData.previous.amount;

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
																		e.target[
																			e.target.selectedIndex
																		].getAttribute("data-amount")
																	);

																	let newData = { ...assessment };
																	newData.others.list[i].name = val;

																	newData.others.list[i].amount = amt;

																	let sum = 0;
																	newData.others.list.forEach((x) => {
																		sum += x.amount;
																	});

																	newData.others.sum = sum;

																	newData.sum = calculateAssessmentSum(newData);

																	newData.payable =
																		newData.sum - newData.previous.amount;
																	setAssessment(newData);
																}}>
																<option data-amount="" value="">
																	---
																</option>
																{ASSESSMENT_FEES.others.map((e) => {
																	return (
																		<option
																			data-amount={e.amount}
																			value={e.name}>
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
									type="button"
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

							<div className="generateBillItem total">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">TOTAL AMOUNT:</span>
									<span className="generateBillItemValue">
										{formatToNaira(assessment.sum)}
									</span>
								</div>
							</div>
							<div className="generateBillItem">
								<button
									type="button"
									onClick={() => {
										let newAssessment = { ...assessment };
										newAssessment.previous.status =
											!newAssessment.previous.status;

										if (!assessment.previous.status) {
											newAssessment.previous.amount = 0;
											newAssessment.sum = calculateAssessmentSum(newAssessment);
											newAssessment.payable = newAssessment.sum;
										}

										setAssessment(newAssessment);
									}}>{`${
									assessment.previous.status ? "Remove" : "Add"
								} Previous Assessment Amount`}</button>
								{assessment.previous.status && (
									<>
										<div className="generateBillItemBreakdown previousPayment">
											<span>Prev Amount:</span>
											<input
												type="number"
												min={0}
												step="0.01"
												placeholder="00..."
												value={assessment.previous.amount}
												required
												onChange={(e) => {
													let val = Number(e.target.value);
													let newData = { ...assessment };
													newData.previous.amount = val;

													newData.sum = calculateAssessmentSum(newData);
													let newPayable =
														newData.sum - newData.previous.amount;
													newData.payable = newPayable < 0 ? 0 : newPayable;

													setAssessment(newData);
												}}
											/>
										</div>
										<div>
											<p>{`NEW PAYABLE AMOUNT = ${formatToNaira(
												assessment.payable
											)}`}</p>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				) : billType === "fastTrack" ? (
					<div className="generateBillWrapper">
						<div className="generateBillTitle">Fees Analysis</div>
						<div className="generateBillItems">
							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">Fast Track Fee:</span>
									<span className="generateBillItemValue">
										{formatToNaira(ASSESSMENT_FEES.fastTrackFee)}
									</span>
								</div>
							</div>

							<div className="generateBillItem">
								<div className="generateBillItemSummary">
									<span className="generateBillItemName">TOTAL AMOUNT:</span>
									<span className="generateBillItemValue">
										{formatToNaira(ASSESSMENT_FEES.fastTrackFee)}
									</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					""
				)}

				<div className="generateButtonsWrapper">
					<button className="primary" type="submit" disabled={submitting}>
						{submitting && (
							<CircularProgress
								thickness={5}
								size={20}
								sx={{ color: "white" }}
							/>
						)}
						{"Save " + billType}
					</button>
					<PlanBillPreviewModal
						buttonText={"Preview"}
						headerText={`${billType} Bill Preview`}
						data={billType === "assessment" ? assessment : fastTrack}
						// title={billType}
						disabled={submitting}
					/>
				</div>
			</form>
		</>
	);
}
