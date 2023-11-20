import "./adminOfficeList.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { AddCard, AddRounded, Apartment, ApartmentRounded, CorporateFareRounded, ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminOfficeListCard from "../../../components/adminOfficeListCard/AdminOfficeListCard";
import { Link } from "react-router-dom";
import AdminOfficeEditModal from "../../../components/adminOfficeEditModal/AdminOfficeEditModal";

export default function AdminOfficeList() {
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
								action: "Office List",
								options: (
									<AdminOfficeEditModal
										modalType ={"add"}
										buttonIcon={<AddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Create Office"}
									/>

								),
							}}>
							{/* <ListWrapper></ListWrapper> */}
							<div className="listQuery">

								<div className="listQueryOptions">
									<span>REGION: </span>
									<select name="listQueryOption" id="listQueryOption">
										<option value="incoming">Incoming</option>
										<option value="Outgoing">Outgoing</option>
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

								<span className="adminStaffListHeader__name"> Name</span>
								<span className="adminStaffListHeader__email">Officer</span>
								<span className="adminStaffListHeader__phone">Tasks</span>
								<span className="adminStaffListHeader__status">Edit</span>
							</div>

							<div className="adminStaffListCardWrapper">
								<AdminOfficeListCard active={true}/>
								<AdminOfficeListCard active={true}/>
								<AdminOfficeListCard active={true}/>
								<AdminOfficeListCard active={true}/>
								<AdminOfficeListCard active={true}/>
								<AdminOfficeListCard active={true} />


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
