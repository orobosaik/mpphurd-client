import "./office.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import ApplicationForm from "../../components/applicationForm/ApplicationForm";
import ListWrapper from "../../components/listWrapper/ListWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function Office() {
	// const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState();
	// const [staff, setStaff] = useState([]);
	// const [region, setRegion] = useState([]);
	// const themeColor = getThemeColor();
	// const [reload, setReload] = useState();

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			let host = import.meta.env.VITE_SERVER;

	// 			const res = await axios.get(`${host}/staffs/office/plans`);

	// 			setData(res.data);
	// 			setIsLoading(false);

	// 			console.log(res.data);
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

	const location = useLocation()
	const data = location.state

	return (
		<>
			<div className="pageWrapper"></div>

			<div className="Office">
				<Header />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<SideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: data.id.name+" Office",
								// option: "Think of me"
								// planNumber: "BC/1212/2023",
							}}>
							<ListWrapper state={data} />
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
