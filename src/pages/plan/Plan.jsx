import "./plan.css";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import PlanInfo from "../../components/planInfo/PlanInfo";
import FeedCard from "../../components/feedCard/FeedCard";
import Activities from "../../components/activities/Activities";
import Document from "../../components/document/Document";
import { useEffect, useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import { useLocation, useParams } from "react-router-dom";
import LoadingIcon from "../../utilities/LoadingIcon";
import { getThemeColor } from "../../utilities/themeColor";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchInstance } from "../../utilities/fetcher";

function Plan() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("");

	const { currentUser, loading } = useSelector((state) => state.user);

	const topBarAction =
		viewBills === "viewBills"
			? "View Bills"
			: viewBills === "generateBill"
			? "Generate Bill"
			: "Plan Info";

	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingError, setIsFetchingError] = useState("");
	const [data, setData] = useState(null);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [isInUserOffice, setIsInUserOffice] = useState();
	const params = useParams();
	const location = useLocation();

	const getData = async () => {
		// console.log(params);
		// console.log(location.state);
		setIsLoading(true);
		try {
			const res = await fetchInstance.get(`/staffs/plan/${params.id}`);
			// Check if Plan is in User Office(s)
			setIsInUserOffice(
				currentUser.office.some((e) => {
					return res.data.currentOffice?.id?._id === e?.id?._id;
				}) || currentUser?.isManagement === true
			);

			setData(() => res.data);
			setIsFetchingError("");
			setIsLoading(false);

			// console.log(res.data);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setIsFetchingError(message);
			setTimeout(() => {
				toast.error(message, {});
			}, 0);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [reload, params.id]);

	return (
		<>
			<Header />
			<div className="planContainer">
				<SideBar />

				<MiddleBar
					topBarData={{
						action: topBarAction,
						// planNumber: data?.planNumber
						// 	? `${data?.region?.code}/${data?.planNumber.value}/${new Date(
						// 			data?.planNumber.date
						// 	  ).getFullYear()}`
						// 	: data?.uniqueId,
						planNumber: data?.planNumber
							? `${data?.dev?.region?.substring(0, 3).toUpperCase()}/${
									data?.planNumber.value
							  }/${new Date(data?.planNumber?.date).getFullYear()}`
							: data?.uniqueId,
					}}>
					{!isLoading ? (
						<>
							{isFetchingError !== "" ? (
								<div style={{ fontSize: "1.6rem" }} className="chat-empty">
									<p>{isFetchingError}</p>
									<span className="button" onClick={getData}>
										Retry
									</span>
								</div>
							) : (
								<PlanInfo
									setViewBills={setViewBills}
									state={data}
									reload={setReload}
								/>
							)}
						</>
					) : (
						<LoadingIcon />
					)}
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities
							isInUserOffice={isInUserOffice}
							reload={setReload}
							setRightBarView={setRightBarView}
							reloadFromPlan={data}
						/>
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
export default Plan;
