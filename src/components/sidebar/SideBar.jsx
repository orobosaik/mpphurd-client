import "./sideBar.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
	ApartmentRounded,
	ArticleRounded,
	AssessmentRounded,
	AssignmentLateRounded,
	CorporateFareRounded,
	DashboardRounded,
	HomeRounded,
	LibraryBooksRounded,
	LogoutRounded,
	PolicyRounded,
	QueryStatsRounded,
	TaskRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor } from "../../redux/store";
import { getThemeColor } from "../../utilities/themeColor";
import { useCookies } from "react-cookie";

export default function SideBar({ selected }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

	const { theme } = useSelector((state) => state.app);
	const themeColor = getThemeColor(theme);

	const handleLogout = () => {
		console.log("YAYAYAYAYAYA");
		dispatch(logout());
		removeCookie("access_token")
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

			console.log("LOGEDOUT");
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
						<NavLink className="sideBarListItem" to="/permit">
							<TaskRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Approval</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/petition">
							<AssignmentLateRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Petition</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/control">
							<PolicyRounded className="sideBarIcon" />
							<span className="sideBarListItemText">B.Control</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/office">
							<CorporateFareRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Office</span>
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
				<div className="sideBarLogout" onClick={handleLogout}>
					<LogoutRounded className="sideBarIcon" />
					<span>Log Out</span>
				</div>
					<ToastContainer />
			</div>
		</div>
	);
}
