import { Link, useParams } from "react-router-dom";
import "./document.css";

export default function Document({ setRightBarView }) {
	const params = useParams();
	return (
		<div className="document">
			<div className="documentTop">
				<span onClick={() => setRightBarView(0)}>Activities</span>
				<span className="documentTopActive">Documents</span>
			</div>
			<div className="">
				<div className="space">
					<span>Pages</span>
					<span>Files</span>
				</div>
				<div className="documentWrapper">
					<div className="documentPages">
						<Link to={`/permit/${params.id}/documents`}>
							<div className="documentPage selected">
								<div className="documentPageBg"></div>
								<div className="documentPageName">
									<span>343 / DN2343</span>
								</div>
							</div>
						</Link>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>34 / DN34</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
						<div className="documentPage">
							<div className="documentPageBg"></div>
							<div className="documentPageName">
								<span>343 / DN2343</span>
							</div>
						</div>
					</div>

					<div className="documentItems">
						<div className="documentItem selected">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Survey Plan</span>
							</div>
						</div>

						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Governor's Consent</span>
							</div>
						</div>

						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Environmental Impact Analysis</span>
							</div>
						</div>
						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Environmental Impact Analysis</span>
							</div>
						</div>
						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Environmental Impact Analysis</span>
							</div>
						</div>
						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Environmental Impact Analysis</span>
							</div>
						</div>
						<div className="documentItem">
							<div className="documentItemBg"></div>
							<div className="documentItemName">
								<span>Environmental Impact Analysis</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
