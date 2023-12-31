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

export default function Plan() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("");

	const topBarAction =
		viewBills === "viewBills"
			? "View Bills"
			: viewBills === "generateBill"
			? "Generate Bill"
			: "Plan Info";

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const params = useParams();
	const location = useLocation();

	useEffect(() => {
		const getData = async () => {
			console.log(params);
			// console.log(location.state);
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/staffs/plan/${params.id}`);

				setData(res.data);
				setIsLoading(false);
				console.log(res.data);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				console.log(error);
				console.log(message);

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

		if (location.state) {
			setData(location.state);
			setIsLoading(false);
		} else {
			getData();
		}

		// return () => {
		// 	second
		// }
	}, [reload]);

	return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="planContainer">
				<SideBar />
				<MiddleBar
					topBarData={{
						action: topBarAction,
						planNumber: data?.planNumber ? data?.planNumber : data?.uniqueId,
					}}>
					{!isLoading ? (
						<PlanInfo setViewBills={setViewBills} data={data} />
					) : (
						<LoadingIcon />
					)}
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities setRightBarView={setRightBarView} />
						) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
			<ToastContainer />
		</>
	);
}
