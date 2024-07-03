import { useDispatch, useSelector } from "react-redux";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { loginFailure, loginSuccess } from "../../redux/userSlice";
import CreateApplication from "../createApplication/CreateApplication";
import "./officeSelect.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";

export default function OfficeSelect() {
	const { currentUser, loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const themeColor = getThemeColor();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

	const [clearing, setClearing] = useState(
		currentUser.office.some((e) => {
			return e?.id?.name?.includes("CLEARING HOUSE");
		})
	);
	// const [clearing, setClearing] = useState(
	// 	currentUser.office.some((e) => {
	// 		return (
	// 			e?.id?.name?.includes("CLEARING HOUSE") &&
	// 			e.tasks.includes("CREATE PLAN")
	// 		);
	// 	})
	// );

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			let host = import.meta.env.VITE_SERVER;
	// 			const res = await axios.get(`${host}/staffs/staff`);

	// 			setData(res.data);
	// 			setIsLoading(false);
	// 			dispatch(loginSuccess(res.data));

	// 			console.log(res.data);
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			setErr(true);
	// 		}
	// 	};

	// 	getData();

	// 	// return () => {
	// 	// 	second
	// 	// }
	// }, [reload]);

	return (
		<>
			<div className="pageWrapper"></div>
			<Header />
			<div className="homeContainer">
				<SideBar />
				{/* <div className="officeSelect">
					<FeedBackground>
						<div className="feedCard__container">
							<h2 className="feedCard__title">
								{currentUser?.office?.length > 1 ? "OFFICES" : "OFFICE"}
							</h2>
							<div className="feedCard__list">
								{currentUser?.office?.map((e) => {
									{
										// console.log(e);
									}
									return (
										<FeedCard
											key={e.id._id}
											route={`office/${e.id._id}`}
											priText={e.id.name}
											secText={"Office"}
											data={e}
										/>
									);
								})}
							</div>
						</div>
					</FeedBackground>
				</div> */}
				<div className="homePage">
					<div className="home__greetings officeSelect">
						<div className="headerTitle">
							{currentUser?.office?.length > 1 ? "OFFICES" : "OFFICE"}
						</div>

						<div className="topBarOptions">
							<button
								className="createPlan primary"
								onClick={() => {
									if (clearing) {
										navigate("/permit/new");
									} else {
										toast.error("Cannot Perform Action", {
											position: "top-right",
											autoClose: 2500,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: themeColor,
										});
									}
								}}>
								Create Application
							</button>
						</div>
						{/* <span>{getGreetingDate()}</span> */}
					</div>

					<FeedBackground>
						{/* {console.log(currentUser?.office[0]?.id?.name)} */}
						<div className="feedCard__container">
							<div className="feedCard__list">
								{currentUser?.office?.map((e) => {
									{
										// console.log(e);
									}
									return (
										<FeedCard
											key={e.id._id}
											route={`office/${e.id._id}`}
											priText={e.id.name}
											secText={"Office"}
											data={e}
										/>
									);
								})}
							</div>
						</div>
					</FeedBackground>
				</div>
			</div>
		</>
	);
}
