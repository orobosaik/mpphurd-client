import "./adminStaffList.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link } from "react-router-dom";

export default function AdminStaffList() {
	const todayDate = new Date().toISOString().slice(0, 10);
	return (
		<>
			<div className="pageWrapper"></div>

			<div className="Office">
				<AdminHeader />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<AdminSideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Staff List",
								options: (
									<Link to="./new">
										<button className="addStaffButton primary">
											<PersonAddRounded className="icon" />
											<span>Add New Staff</span>
										</button>
									</Link>
								),
							}}>
							{/* <ListWrapper></ListWrapper> */}
							<div className="listQuery">
								<div className="listQueryOptions">
									<span>STATUS: </span>
									<select name="listQueryOption" id="listQueryOption">
										<option value="active" selected>Active</option>
										<option value="inactive">Inactive</option>
									</select>
								</div>
								<div className="listQueryOptions">
									<span>REGION: </span>
									<select name="listQueryOption" id="listQueryOption">
										<option value="incoming">Incoming</option>
										<option value="Outgoing">Outgoing</option>
										<option value="current">Current</option>
									</select>
								</div>
								<div className="listQueryOptions">
									<span>DESIGNATION: </span>
									<select name="listQueryOption" id="listQueryOption">
										<option value="incoming">Incoming</option>
										<option value="Outgoing">Outgoing</option>
										<option value="current">Current</option>
										<option value="current">Current</option>
										<option value="current">Current</option>
										<option value="current">Current</option>
										<option value="current">Current</option>
									</select>
								</div>

								<div>
									<input type="text" placeholder="Search list..." />
								</div>

								<div className="listCount">
									<span>Count:</span>
									<span>78,867</span>
								</div>

								<div className="listSort">
									<span>Latest to Oldest</span>
									<ExpandMoreRounded />
								</div>
							</div>
							<div className="adminStaffListHeader">
								<span className="adminStaffListHeader__avatar">Photo</span>

								<span className="adminStaffListHeader__name"> Name</span>
								<span className="adminStaffListHeader__email">Email</span>
								<span className="adminStaffListHeader__phone">Phone</span>
								<span className="adminStaffListHeader__region">Region</span>
								<span className="adminStaffListHeader__office">Office</span>
								<span className="adminStaffListHeader__designation">
									Designation
								</span>
								<span className="adminStaffListHeader__status">Status</span>
							</div>

							<div className="adminStaffListCardWrapper">
								<AdminStaffListCard />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard />
								<AdminStaffListCard />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard active={true} />
								<AdminStaffListCard />
								<AdminStaffListCard />
								<ListCard />
								<ListCard />
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
