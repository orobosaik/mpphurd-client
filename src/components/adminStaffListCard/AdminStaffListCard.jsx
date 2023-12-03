import { Link } from "react-router-dom";
import "./adminStaffListCard.css";

export default function AdminStaffListCard(props) {
	const data = props.data;

	return (
		<>
			{data.map((d) => {
				return (
					<Link
						className="adminStaffListCard"
						key={d._id}
						to="./staff"
						state={d}>
						<span className="adminStaffListCard__avatar">
							<img
								src={d.profilePicture || import.meta.env.VITE_NO_AVATAR}
								alt="avatar"
							/>
						</span>

						<span className="adminStaffListCard__name">

							{[d.firstName, d.middleName, d.lastName]
								.filter(function (value) {
									return value !== null && value !== "" && value !== undefined;
								})
								.join(" ")}
						</span>

						<span className="adminStaffListCard__email">{d.email}</span>
						<span className="adminStaffListCard__phone">{d.phone}</span>
						<span className="adminStaffListCard__region">
							{d.region?.fullName}
						</span>
						<span className="adminStaffListCard__office">
							{d.office?.fullName}
						</span>
						<span className="adminStaffListCard__title">
							{d.jobTitle?.fullName}
						</span>
						<span
							className={
								d.isActive
									? "adminStaffListCard__status active"
									: "adminStaffListCard__status inactive"
							}>
							<span>{d.isActive ? "Active" : "Inactive"}</span>
						</span>
					</Link>
				);
			})}
		</>
	);
}
