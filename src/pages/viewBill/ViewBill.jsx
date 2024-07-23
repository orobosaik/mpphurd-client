import "./viewBill.css";
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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";

export default function ViewBill() {
	const [rightBarView, setRightBarView] = useState(0);
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState();
	const [reload, setReload] = useState();

	const [isInUserOffice, setIsInUserOffice] = useState();
	const { currentUser } = useSelector((state) => state.user);
	const params = useParams();

	useEffect(() => {
		axios.defaults.withCredentials = true;

		const getData = async () => {
			try {
				setIsLoading(true);
				let host = import.meta.env.VITE_SERVER;

				// const res = await Promise.all([
				// 	axios.get(`${host}/staffs/office/all`, {
				// 		withCredentials: true,
				// 	}),
				// 	axios.get(`${host}/staffs/staff/all`, {
				// 		withCredentials: true,
				// 	}),
				// 	axios.get(`${host}/staffs/plan/${params.id}`),
				// ]);
				const res = await axios.get(`${host}/staffs/plan/${params.id}`);

				setData(res.data);

				// Check if Plan is in User Office(s)
				setIsInUserOffice(
					currentUser.office.some((e) => {
						return res.data.currentOffice?.id?._id === e?.id?._id;
					}) || currentUser?.isManagement === true
				);

				// let presentStaff = office.map((o) => {
				// 	// Prevent showing current staff office
				// 	if (o._id === data.currentOffice.id._id) return;
				// 	let staffList = staff.filter((s) =>
				// 		s.office.some((so) => so.id === o._id)
				// 	);
				// 	let text;
				// 	if (staffList.length === 0) {
				// 		text = `${o.region.code.toUpperCase()} - ${o.name} (Unavailable)`;
				// 	} else if (staffList.length > 1) {
				// 		text = `${o.region.code.toUpperCase()} - ${o.name} (Multiple)`;
				// 	} else {
				// 		text = `${o.region.code.toUpperCase()} - ${o.name} (${
				// 			staffList[0].fullName
				// 		})`;
				// 	}
				// 	return {
				// 		office: o,
				// 		officeId: o._id,
				// 		text,
				// 	};
				// });

				// // Sort list and set as office list
				// setOfficeList(
				// 	presentStaff.sort((a, b) => {
				// 		const nameA = a.text.toUpperCase(); // ignore upper and lowercase
				// 		const nameB = b.text.toUpperCase(); // ignore upper and lowercase
				// 		if (nameA < nameB) {
				// 			return -1;
				// 		}
				// 		if (nameA > nameB) {
				// 			return 1;
				// 		}
				// 		// names must be equal
				// 		return 0;
				// 	})
				// );
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				// console.log(error);
				// console.log(message);
			} finally {
				setIsLoading(false);
			}
		};
		getData();
	}, [reload]);

	return (
		<>
			<Header />
			<div className="planContainer">
				<SideBar selected={"home"} />
				<MiddleBar
					topBarData={{
						action: "View Bills",
						planNumber: data?.planNumber
							? `${data?.dev.region.substring(0, 3).toUpperCase()}/${
									data?.planNumber.value
							  }/${new Date(data?.planNumber.date).getFullYear()}`
							: data?.uniqueId,
					}}>
					{!isLoading ? <PlanBill data={data} /> : <LoadingIcon />}
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
