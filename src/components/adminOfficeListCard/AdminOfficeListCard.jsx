import { Link } from "react-router-dom";
import "./adminOfficeListCard.css";
import AdminOfficeEditModal from "../adminOfficeEditModal/AdminOfficeEditModal";

export default function AdminOfficeListCard({ active }) {
	return (
		<div className=" adminOfficeListCard">
			<span className="adminOfficeListCard__name">
				APO 2
			</span>

			<span className="adminOfficeListCard__email">
				Orobosa Eternal Ikponmwosa
			</span>
			<span className="adminOfficeListCard__phone">Minute file, Vet file, Create plan, Edit plan, Generate bill, Upload file</span>




			<span className="adminOfficeListCard__status">
				<AdminOfficeEditModal
					className="adminOfficeListCardEditButton"
					buttonName={"Edit"}
					modalType={"edit"}
				/>
			</span>
		</div>
	);
}
