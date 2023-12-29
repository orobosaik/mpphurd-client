import { useEffect, useState } from "react";
import "./listWrapper.css";
import ListCard from "../listCard/ListCard";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";
import ListCardContainer from "../listCardContainer/ListCardContainer";
import { useLocation } from "react-router-dom";
import { getThemeColor } from "../../utilities/themeColor";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "../../utilities/LoadingIcon";

export default function ListWrapper({ children }) {
	const [showQueryDate, setShowQueryDate] = useState(true);
	const showQueryHandler = (e) => {
		e.target.value === "current"
			? setShowQueryDate(false)
			: setShowQueryDate(true);
	};
	const todayDate = new Date().toISOString().slice(0, 10);
	const prevDate = new Date().toISOString().slice(0, 10) - 7;

	const location = useLocation();
	const state = location.state;

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [sortReverse, setSortReverse] = useState(false);
	const [staff, setStaff] = useState([]);
	const [listArray, setListArray] = useState([]);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();

	const categorizeListByDate = (data, ascending) => {
		let newArray = {};
		data.forEach((item) => {
			let date = item.currentOffice.date.split("T")[0];
			if (newArray[date]) {
				newArray[date].items.push(item);
			} else {
				newArray[date] = { date: date, items: [item] };
			}
		});

		let sortedArray;
		if (ascending) {
			sortedArray = Object.values(newArray).sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			);
		} else {
			sortedArray = Object.values(newArray).sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);
		}

		return sortedArray;
	};

	useEffect(() => {
		console.log(state);
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;

				const res = await axios.get(
					`${host}/staffs/office/${state.id._id}/current`
				);

				setData(res.data);
				setListArray(categorizeListByDate(res.data));
				setIsLoading(false);

				// setData(res.data);

				// console.log(newArray);
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
				setTimeout(() => {
					setIsLoading(false);
				}, 4000);
			}
		};

		getData();

		// return () => {
		// 	second
		// }
	}, [reload]);

	return (
		<div className="listWrapper">
			<div className="listQuery">
				<div className="listQueryOptions">
					<select
						name="listQueryOption"
						id="listQueryOption"
						onChange={showQueryHandler}>
						<option value="current">Current</option>
						<option value="incoming">Incoming</option>
						<option value="Outgoing">Outgoing</option>
					</select>
				</div>

				{showQueryDate && (
					<div className="listQueryDate">
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateStart">From:</label>
							<input
								type="date"
								name="listQueryDateStart"
								id="listQueryDateStart"
								defaultValue={prevDate}
							/>
						</div>
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateEnd">To:</label>
							<input
								type="date"
								name="listQueryDateEnd"
								id="listQueryDateEnd"
								defaultValue={todayDate}
							/>
						</div>
					</div>
				)}

				<div>
					<input type="text" placeholder="Search record..." />
				</div>

				<div className="listCount">
					<span>Count:</span>
					<span>{data?.length || "0"}</span>
				</div>

				<div
					className="listSort"
					onClick={() => {
						setSortReverse(!sortReverse);
						setListArray(categorizeListByDate(data, !sortReverse));
					}}>
					<span>{!sortReverse ? "Latest to Oldest" : "Oldest to Latest"}</span>
					{!sortReverse ? <ExpandMoreRounded /> : <ExpandLessRounded />}
				</div>
			</div>

			<div className="listHeader listFormat">
				<span>PlanNo</span>
				<span>File Name</span>
				<span>Location</span>
				<span>Property Type</span>
				<span>Has Rep</span>
				<span>Stack</span>
			</div>

			{isLoading ? (
				<div className="listCardContainerWrapper">
					<div className="loading">
						<LoadingIcon />
					</div>
				</div>
			) : (
				<div className="listCardContainerWrapper">
					{listArray.length === 0 && <p className="empty">No Data Found...</p>}
					{listArray.map((arr, index) => {
						return (
							<ListCardContainer
								key={index}
								date={arr.date}
								count={arr.items.length}>
								{arr.items.map((item, i) => {
									console.log(item);
									return <ListCard key={i} data={item} />;
								})}
							</ListCardContainer>
						);
					})}
				</div>
			)}
		</div>
	);
}
