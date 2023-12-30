import { useEffect, useRef, useState } from "react";
import "./listWrapper.css";
import ListCard from "../listCard/ListCard";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";
import ListCardContainer from "../listCardContainer/ListCardContainer";
import { useLocation } from "react-router-dom";
import { getThemeColor } from "../../utilities/themeColor";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "../../utilities/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import appSlice, { setOfficeData } from "../../redux/appSlice";

function ListWrapper({ children }) {
	const [showQueryDate, setShowQueryDate] = useState(true);
	const showQueryHandler = (e) => {
		e.target.value === "current"
			? setShowQueryDate(false)
			: setShowQueryDate(true);
	};

	const { officeData } = useSelector((state) => state.app);

	const [listArray, setListArray] = useState([]);
	const [endDate, setEndDate] = useState(
	new Date().toISOString().slice(0, 10)
	);
	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
	);
	const [searchQuery, setSearchQuery] = useState("");

	const location = useLocation();
	const state = location.state;

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [sortReverse, setSortReverse] = useState(false);
	const [staff, setStaff] = useState([]);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [scroll, setScroll] = useState();

	const scrollSection = useRef();

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
				setIsLoading(false);

				setData(res.data);
				console.log(res.data);

				const newData = categorizeListByDate(res.data);
				setListArray(newData);

				console.log(listArray);
				// const size =
				// 	encodeURI(JSON.stringify(listArray)).split(/%..|./).length - 1;
				// console.log(size / 1024);
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

		console.log(officeData);
		console.log(officeData.active);
		if (officeData.active) {
			setIsLoading(false);
			console.log(officeData);
			console.log(scrollSection);
			setData(officeData.data);
			setListArray(officeData.listArray);
			setStartDate(officeData.startDate);
			setEndDate(officeData.endDate);
			setSearchQuery(officeData.searchQuery);
			setReload(() => []);
		} else {
			getData();
		}

		// return () => {
		// 	second
		// }
	}, []);

	useEffect(() => {
		if (officeData.active) {
			scrollSection.current.scrollTo({
				top: officeData.scroll,
				// behavior: "smooth",
			});
		}
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
								defaultValue={startDate}
							/>
						</div>
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateEnd">To:</label>
							<input
								type="date"
								name="listQueryDateEnd"
								id="listQueryDateEnd"
								defaultValue={endDate}
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
					<span>{!sortReverse ? "New to Old" : "Old to New"}</span>
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

			<div className="listCardContainerWrapper" ref={scrollSection}>
				{isLoading ? (
					<div className="loading">
						<LoadingIcon />
					</div>
				) : (
					<>
						{listArray.length === 0 && (
							<p className="empty">No Data Found...</p>
						)}

						{listArray.map((arr, index) => {
							return (
								<ListCardContainer
									key={index}
									date={arr.date}
									count={arr.items.length}>
									{arr.items.map((item, i) => {
										return (
											<ListCard
												key={i}
												data={item}
												officeState={{
													active: true,
													data,
													listArray,
													startDate,
													endDate,
													searchQuery,
													sort: sortReverse,
												}}
												scrollSection={scrollSection}
											/>
										);
									})}
								</ListCardContainer>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
}

export default ListWrapper;
