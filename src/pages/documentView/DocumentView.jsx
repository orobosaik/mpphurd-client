import "./documentView.css";
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
import DocumentViewer from "../../components/documentViewer/DocumentViewer";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import PlanInfoCard from "../../components/planInfoCard/PlanInfoCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchInstance } from "../../utilities/fetcher";
import { useSelector } from "react-redux";

export default function DocumentView() {
	const [rightBarView, setRightBarView] = useState(1);

	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingError, setIsFetchingError] = useState("");
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [isInUserOffice, setIsInUserOffice] = useState();
	const params = useParams();

	const { currentUser } = useSelector((state) => state.user);


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
			<div className="documentViewContainer">
				<SideBar />
				{console.log(data)}
				<MiddleBar
					style={{ background: "transparent" }}
					topBarData={{
						action: "Survey Plan",
						planNumber: data?.planNumber
							? `${data?.dev.region.substring(0, 3).toUpperCase()}/${
									data?.planNumber.value
							  }/${new Date(data?.planNumber.date).getFullYear()}`
							: data?.uniqueId,
					}}>
					<DocumentViewer />
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities
							isInUserOffice={isInUserOffice}
							reload={setReload}
							setRightBarView={setRightBarView}
							plan={data}
						/>
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
