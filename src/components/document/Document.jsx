import "./document.css";

export default function Document({ setRightBarView }) {
	return (
		<div className="document">
			<div className="documentTop">
				<span onClick={() => setRightBarView(0)}>Activities</span>
				<span className="documentTopActive">Documents</span>
			</div>
			<div className="documentWrapper">
				<p>Here</p>
			</div>
		</div>
	);
}
