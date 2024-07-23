import "./adminViewBill.css";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import RightBar from "../../../components/rightbar/RightBar";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import Activities from "../../../components/activities/Activities";
import Document from "../../../components/document/Document";
import { useEffect, useState } from "react";
import TopBar from "../../../components/topBar/TopBar";
import PlanBill from "../../../components/planBill/PlanBill";
import GenerateBill from "../../../components/generateBill/GenerateBill";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";

export default function ViewBill() {
	const [rightBarView, setRightBarView] = useState(0);
	const [data, setData] = useState();
	const [reload, setReload] = useState();

	const [isInUserOffice, setIsInUserOffice] = useState();
	const { currentUser } = useSelector((state) => state.user);
	const params = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;

				// const res = await axios.get(`${host}/staffs/plan/${params.id}`);
				const res = await axios.get(`${host}/admin/plan/${params.id}`);

				setData(res.data);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				// console.log(error);
				// console.log(message);
			}
		};
		getData();
	}, [reload]);

	return (
		<>
			<AdminHeader />
			<div className="planContainer">
				<AdminSideBar selected={"home"} />
				<MiddleBar
					topBarData={{
						action: "View Bills",
						planNumber: "BC/3421/2023",
					}}>
					<PlanBill />
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
		</>
	);
}
