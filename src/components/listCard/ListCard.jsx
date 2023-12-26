import { Link } from "react-router-dom";
import "./listCard.css"

function ListCard() {
  return (
		<Link className="listCard listFormat" to="/permit/658b247df36d74b62343f801">
			<span>6898/2023</span>
			<span>Osarodion Osawaru Igbinedion</span>
			<span>
				No 20 Igun Street, Off sokponba road, by Ring Road junction, benin city
			</span>
			<span>Commercial</span>
			<span>Yes</span>
			<span>A5</span>
		</Link>
	);
}

export default ListCard