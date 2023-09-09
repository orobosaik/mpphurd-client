import "./minute.css";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import PlanInfo from "../../components/planInfo/PlanInfo";
import FeedCard from "../../components/feedCard/FeedCard";
import Activities from "../../components/activities/Activities";
import Document from "../../components/document/Document";
import { useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import PlanInfoCard from "../../components/planInfoCard/PlanInfoCard";

export default function Minute() {
	const [rightBarView, setRightBarView] = useState(0);

	return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="planContainer">
				<SideBar selected={"home"} />
				<MiddleBar
					topBarData={{ action: "Minute Plan", planNumber: "BC/3421/2023" }}>
					<div>
						<div className="minuteItems">
							<div className="minuteItem">
								<label htmlFor="minuteStatus">Status:</label>
								<select name="minuteStatus" id="minuteStatus">
									<option value="">...</option>
									<option value="clear">Process Further</option>
									<option value="issue">Issue Raised</option>
									<option value="reject">Recommended for Rejection</option>
								</select>
							</div>

							<div className="minuteItem">
								<label htmlFor="minuteText">Comment:</label>
								<textarea
									name="minuteText"
									id="minuteText"
									cols="30"
									rows="10"></textarea>
							</div>
							<div className="minuteItem">
								<span>Proposed Actions</span>
								<div className="minuteItemActions">
									<div className="minuteItemAction">
										<button>-</button>
										<span>1</span>
										<input type="text" />
									</div>
									<div className="minuteItemAction">
										<button>-</button>
										<span>2</span>
										<input type="text" />
									</div>
									<button>+</button>
								</div>
							</div>
							<div className="minuteItem">
								<span>Select Officer/Office:</span>
								<select name="minuteToOfficer" id="minuteToOfficer">
									<option value="">Orobosa Ikponmwosa (TPO II)</option>
									<option value="">Henry Enabulele (Dir DDC)</option>
								</select>
							</div>
							<button className="primary">Minute File</button>
						</div>
					</div>
				</MiddleBar>

				<RightBar>
					{rightBarView === 1 ? (
						<Document setRightBarView={setRightBarView} />
					) : (
						<Activities setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
