import "./adminSideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
	ArticleRounded,
	AssessmentRounded,
	AssignmentLateRounded,
	CorporateFareRounded,
	DashboardOutlined,
	DashboardRounded,
	EngineeringRounded,
	HomeRounded,
	LibraryBooksRounded,
	LocalPostOfficeRounded,
	LocationCityRounded,
	LogoutRounded,
	PeopleRounded,
	PolicyRounded,
	QueryStatsRounded,
	TaskRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor } from "../../redux/store";
import { getThemeColor } from "../../utilities/themeColor";
import { adminLogout } from "../../redux/adminSlice";

export default function AdminSideBar({ selected }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { theme } = useSelector((state) => state.app);
	const themeColor = getThemeColor(theme);

	const handleAdminLogout = () => {
		// console.log("YAYAYAYAYAYA");
		dispatch(adminLogout());
		navigate("/login");
		// persistor.purge();

		setTimeout(() => {
			toast.success("Logout Successful", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: themeColor,
			});

			// console.log("LOGEDOUT");
		}, 0);
	};

	return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<ul className="sideBarList">
					<li>
						<NavLink className="sideBarListItem" to="/">
							<DashboardRounded className="sideBarIcon" />
							<span className="sideBarListItemText ">Dashboard</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/staffs">
							<EngineeringRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Staff</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/offices">
							<CorporateFareRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Offices</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/regions">
							<LocationCityRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Regions</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/permit">
							<TaskRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Permit</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/public">
							<PeopleRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Public Users</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/activities">
							<AssessmentRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Activities</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/analysis">
							<QueryStatsRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Analysis</span>
						</NavLink>
					</li>
				</ul>
				<div className="sideBarLogout" onClick={handleAdminLogout}>
					<LogoutRounded className="sideBarIcon" />
					<span>Log Out</span>
				</div>
			</div>
		</div>
	);
}
