import "./adminSideBar.css";
import { NavLink } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor } from "../../redux/store";

export default function AdminSideBar({ selected }) {
	const dispatch = useDispatch();
	const handleLogout = () => {
		toast.success("Logout Successful", {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setTimeout(() => {
			persistor.purge();
		}, 1000);
		// dispatch(logout());
	};
	return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<ul className="sideBarList">
					<li>
						<NavLink className="sideBarListItem" to="/admin/">
							<DashboardRounded className="sideBarIcon" />
							<span className="sideBarListItemText ">Dashboard</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/staff">
							<EngineeringRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Staff</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/offices">
							<CorporateFareRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Offices</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/regions">
							<LocationCityRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Regions</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/public">
							<PeopleRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Public Users</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/activities">
							<AssessmentRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Activities</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/admin/analysis">
							<QueryStatsRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Analysis</span>
						</NavLink>
					</li>
				</ul>
				<div className="sideBarLogout" onClick={handleLogout}>
					<LogoutRounded className="sideBarIcon" />
					<span>Log Out</span>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
}
