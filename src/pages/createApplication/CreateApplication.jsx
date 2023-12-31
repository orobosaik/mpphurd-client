import "./createApplication.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import ApplicationForm from "../../components/applicationForm/ApplicationForm";

export default function CreateApplication() {
	return (
		<>
			<div className="pageWrapper"></div>

			<div className="createApplication">
				<Header />
				<div className="createApplicationWrapper">
					<div className="createApplicationSideBar">
						<SideBar />
					</div>

					<div className="createApplicationMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Create New Application",
								planNumber: "BC/1212/2023",
							}}>
							<ApplicationForm />
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
