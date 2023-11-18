import { Link } from "react-router-dom";
import "./adminStaffListCard.css";

export default function AdminStaffListCard({ active }) {
	return (
		<Link
			className={
				active ? "adminStaffListCard active" : " adminStaffListCard inactive"
			}
			to="./staff">
			<span className="adminStaffListCard__avatar">
				<img src="/assets/persons/no_avatar.png" alt="" />
			</span>

			<span className="adminStaffListCard__name">
				Osarodion Osawaru Igbinedion
			</span>

			<span className="adminStaffListCard__email">
				ig.osarodion@edostate.gov.ng
			</span>
			<span className="adminStaffListCard__phone">09088833323</span>
			<span className="adminStaffListCard__region">Benin</span>
			<span className="adminStaffListCard__office">Vetting</span>
			<span className="adminStaffListCard__title">APO 3</span>
			<span className="adminStaffListCard__status">
				<span>{active ? "Active" : "Inactive"}</span>
			</span>
		</Link>
	);
}
