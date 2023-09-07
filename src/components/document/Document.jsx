import { Link } from "react-router-dom";
import "./document.css";

export default function Document({ setRightBarView }) {
	return (
		<div className="document">
			<div className="documentTop">
				<span onClick={() => setRightBarView(0)}>Activities</span>
				<span className="documentTopActive">Documents</span>
			</div>
			<div className="documentWrapper">
				<div className="documentPages">
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 34 / DN34</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
					<div className="documentPage">
						<div className="documentPageBg"></div>
						<div className="documentPageName">
							<span>Page 343 / DN343</span>
						</div>
					</div>
				</div>

				<div className="documentItems">
					<div className="documentItem">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>
								Survey Plan</span>
						</div>
					</div>

					<Link to="/permit/planId/documents">
					<div className="documentItem selected">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>Governor's Consent</span>
						</div>
					</div>
					</Link>



					<div className="documentItem">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>Environmental Impact Analysis</span>
						</div>
					</div>
					<div className="documentItem">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>Document Name even if its deof Here</span>
						</div>
					</div>
					<div className="documentItem">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>Document Name even if its deof Here</span>
						</div>
					</div>
					<div className="documentItem">
						<div className="documentItemBg"></div>
						<div className="documentItemName">
							<span>Document Name even if its deof Here</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
