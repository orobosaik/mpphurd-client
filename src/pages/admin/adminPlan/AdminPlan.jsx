import "./adminPlan.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import RightBar from "../../../components/rightbar/RightBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import FeedCard from "../../../components/feedCard/FeedCard";
import Activities from "../../../components/activities/Activities";
import Document from "../../../components/document/Document";
import { useEffect, useState } from "react";
import TopBar from "../../../components/topBar/TopBar";
import PlanBill from "../../../components/planBill/PlanBill";
import GenerateBill from "../../../components/generateBill/GenerateBill";
import { Link, useLocation, useParams } from "react-router-dom";
import LoadingIcon from "../../../utilities/LoadingIcon";
import { getThemeColor } from "../../../utilities/themeColor";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import PlanInfoCard from "../../../components/planInfoCard/PlanInfoCard";
import AdminMinuteModal from "../../../components/adminMinuteModal/AdminMinuteModal";

export default function AdminPlan() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("");

	// const { currentUser, loading } = useSelector((state) => state.user);

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const params = useParams();
	const location = useLocation();


		const handleSubmit = async (e) => {
			e.preventDefault();
			setLoading(true);
			const form = new FormData(e.target);
			// console.log(form.get("plan.PlotNo"));
			// console.log(form);

			const newData = {
				status: form.get("minuteStatus"),
				text: form.get("minuteText"),
				proposedActions: form.get("proposedActions"),
				newOfficeId: form.get("minuteToOfficer"),
			};
			// console.log(newData);

			axios.defaults.withCredentials = true;

			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.post(
					`${host}/staffs/plan/${data._id}/minute`,
					newData,
					{
						withCredentials: true,
					}
				);
				// console.log(res.data);

				setLoading(false);

				dispatch(resetOfficeData());
				navigate(-2);

				setTimeout(() => {
					toast.success(res.data, {
						position: "top-right",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: themeColor,
					});
				}, 200);
			} catch (error) {
				setLoading(false);

				let message = error.response
					? error.response.data.message
					: error.message;
				// console.log(error);
				// console.log(message);

				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}
		};

	const getData = async () => {
		// console.log(params);
		// console.log(location.state);
		setIsLoading(true);
		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.get(`${host}/admin/plan/${params.id}`);

			setData(() => res.data);
			setIsLoading(false);

			// console.log(res.data);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setTimeout(() => {
				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}, 0);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (location.state) {
			setData(location.state);
			setIsLoading(false);
		} else {
			getData();
		}
	}, []);

	useEffect(() => {
		getData();
	}, [reload, params.id]);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			let host = import.meta.env.VITE_SERVER;

	// 			const res = await Promise.all([
	// 				axios.get(`${host}/admin/office`),
	// 				axios.get(`${host}/admin/staff`),
	// 				axios.get(`${host}/admin/region`),
	// 			]);

	// 			setData(res[0].data);
	// 			setStaff(res[1].data);
	// 			setRegion(res[2].data);
	// 			setIsLoading(false);

	// 			console.log(res[0].data);
	// 			console.log(res[1].data);
	// 		} catch (error) {
	// 			let message = error.response
	// 				? error.response.data.message
	// 				: error.message;
	// 			console.log(error);
	// 			console.log(message);

	// 			setTimeout(() => {
	// 				toast.error(message, {
	// 					position: "top-right",
	// 					autoClose: 2000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 					theme: themeColor,
	// 				});
	// 			}, 0);
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	getData();

	// 	// return () => {
	// 	// 	second
	// 	// }
	// }, [reload]);

	const todayDate = new Date().toISOString().slice(0, 10);
	return (
		<>
			<div className="pageWrapper"></div>

			<AdminHeader />
			<div className="planContainer">
				<AdminSideBar selected={"office"} />

				<MiddleBar
					topBarData={{
						action: "Plan Info",
						planNumber: data?.planNumber
							? `${data?.dev?.region?.substring(0, 3)?.toUpperCase()}/${
									data?.planNumber?.value
							  }/${new Date(data?.planNumber?.date)?.getFullYear()}`
							: data?.uniqueId,
						// options: <AdminMinuteModal data={data} reload={setReload} />
					}}>
					{isLoading ? (
						<LoadingIcon />
					) : (
						data && (
							<div className="planInfo">
								<div
									className={
										data.approval.status === "approved"
											? "watermark approved"
											: data.approval.status === "kiv"
											? "watermark kiv"
											: data.approval.status === "rejected"
											? "watermark rejected"
											: "watermark processing"
									}>
									<span>
										{data.approval.status === "approved"
											? "APPROVED"
											: data.approval.status === "kiv"
											? "KIV"
											: data.approval.status === "rejected"
											? "REJECTED"
											: ""}
									</span>
								</div>
								<div className="planInfoSummary">
									<div className="planInfoSummaryDetails">
										<div className="planInfoSummaryItem">
											<span className="planInfoSummaryTitle">File Name:</span>
											<span className="planInfoSummaryText large">
												{data.applicant?.name?.toLowerCase()}
												{data.dev?.name &&
													` (${data.dev?.name?.toLowerCase()})`}
											</span>
										</div>
										<div className="planInfoSummaryItem">
											<span className="planInfoSummaryTitle">
												Site Location:
											</span>
											<span className="planInfoSummaryText large">
												{data.dev?.plotNo && data.dev?.plotNo + ","}{" "}
												{data.dev?.address && data.dev?.address?.toLowerCase()}
											</span>
										</div>
										<div className="planInfoSummaryItem">
											<span className="planInfoSummaryTitle">
												Current Office:
											</span>
											<span className="planInfoSummaryText">
												<span className="planInfoSummaryStack">
													{data.currentOffice?.id?.name} Office
												</span>
												.
											</span>
										</div>

										<div className="planInfoSummaryItem">
											{(data.isFastTrack ||
												data.isFileOfInterest ||
												data.isOldFile) && (
												<span className="planInfoSummaryTitle">Tags:</span>
											)}
											<span className="planInfoSummaryText">
												{data.isFastTrack && (
													<span className="tag tag-fastTrack">Fast Track</span>
												)}
												{data.isOldFile && (
													<span className="tag tag-oldFile">Old File</span>
												)}
												{data.isFileOfInterest && (
													<span className="tag tag-fileOfInterest">
														File Of Interest
													</span>
												)}
											</span>
										</div>
									</div>

									<div className="planInfoSummaryDetails2"></div>
								</div>

								<div className="planInfoWrapper">
									<PlanInfoCard
										type={data.applicant?.type}
										BD={true}
										data={data.applicant}
									/>
									<PlanInfoCard type={"rep"} BD={true} data={data.rep} />
									<PlanInfoCard type={"building"} data={data.dev} />
								</div>

								<div className="planInfoButtons">
									<Link to="./bills">
										<button className="secondary">View Bills</button>
									</Link>

									{data?.planNumber?.value && (
										<AdminMinuteModal data={data} reload={setReload} />
									)}
								</div>
							</div>
						)
					)}
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities
							isInUserOffice={true}
							admin={true}
							reload={reload}
							setRightBarView={setRightBarView}
							plan={data}
						/>
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
			<ToastContainer />
		</>
	);
}
