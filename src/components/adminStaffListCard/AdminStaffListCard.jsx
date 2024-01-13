import { Link } from "react-router-dom";
import "./adminStaffListCard.css";
import { getFullName } from "../../utilities/getFullName";

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
						state={{ data: d }}>
						<span className="adminStaffListCard__avatar">
							<img
								src={d.profilePicture || "/assets/persons/no_avatar.png"}
								alt="avatar"
							/>
						</span>

						<span className="adminStaffListCard__name">
							{[d.title, d.firstName, d.middleName, d.lastName, d.prefix]
								.filter(function (value) {
									return value !== null && value !== "" && value !== undefined;
								})
								.join(" ")}
						</span>

						<span className="adminStaffListCard__email">{d.email}</span>
						<span className="adminStaffListCard__phone">{d.phone}</span>
						<span className="adminStaffListCard__region">{d.region?.name}</span>
						<span className="adminStaffListCard__office">
							{d.office?.map((a, i) => {
								return <span key={i}>{a?.id?.name}</span>;
							})}
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
