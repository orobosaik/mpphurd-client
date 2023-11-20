import "./adminStaffView.css";
import { useState } from "react";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import ToggleSwitch from "../../../components/toggleSwitch/ToggleSwitch";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link } from "react-router-dom";
import AdminStaffEditModal from "../../../components/adminStaffEditModal/AdminStaffEditModal";

export default function AdminStaffView() {
	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);

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
								action: "Staff View",
								options: (
									<AdminStaffEditModal
										buttonIcon={<PersonAddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Update Staff"}
									/>
								),
							}}>
							<div className="staffView">
								<div className="staffViewHeader">
									<div>
										<h2>Orobosa Ikponmwosa</h2>

										<h4>Town Planning Officer</h4>
										<h4>TPO2 (Zone 2)</h4>

										<p>Department of Development Control</p>

										<div>
											<span>Official Email:</span>
											<span>orobosa.ik@edostate.gov.ng</span>
										</div>
										<div>
											<span>Alt Email:</span>
											<span>orobosa.ik@gmail.com</span>
										</div>
										<div>
											<span>Phone:</span>
											<span>09035583833</span>
										</div>
										<div>
											<span>Gender:</span>
											<span>Male</span>
										</div>
									</div>

									<div className="staffImage">
										<label
											htmlFor={"staffMeansOfIdentification"}
											className="uploadImageWrapper">
											<img src="/assets/persons/headshot1.jpg" alt="" />
										</label>
									</div>
								</div>

								<div className="inputStaffHeaderRight">
									<div>
										<span>Active Status:</span>
										<ToggleSwitch
											toggled={isActive}
											label={"isActive"}
											onClick={setIsActive}
										/>
									</div>
									<div>
										<span>Management Staff:</span>
										<ToggleSwitch
											toggled={isManagement}
											label={"isManagement"}
											onClick={setIsManagement}
										/>
									</div>
								</div>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
