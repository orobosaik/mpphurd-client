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

export default function OfficeSelect() {
	const { currentUser, loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

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
				<div className="officeSelect">
					<FeedBackground>
						{console.log(currentUser.office[0].id.name)}
						<div className="feedCard__container">
							<h2 className="feedCard__title">OFFICE(S)</h2>
							<div className="feedCard__list">
								{currentUser.office.map((e) => {
									{
										console.log(e);
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
