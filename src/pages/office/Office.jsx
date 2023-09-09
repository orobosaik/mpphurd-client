import "./office.css"
import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import MiddleBar from '../../components/middleBar/MiddleBar';
import ApplicationForm from '../../components/applicationForm/ApplicationForm';
import ListWrapper from "../../components/listWrapper/ListWrapper";

export default function Office() {
  return (
		<>
			<div className="pageWrapper"></div>

			<div className="Office">
				<Header />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<SideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Vetting Office Record",
								// planNumber: "BC/1212/2023",
							}}>
							<ListWrapper></ListWrapper>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}