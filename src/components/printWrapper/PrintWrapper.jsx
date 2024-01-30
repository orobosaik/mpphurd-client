import "./printWrapper.css";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

function PrintWrapper({ label, classes, content }) {
	let printComponent = useRef(null);

	return (
		<>
			<div className="printWrapper" ref={(el) => (printComponent = el)}>
				<img
					alt={""}
					src={"/assets/logos/Logo-Mpphurd.png"}
					className={"watermark"}
				/>
				<table className="report-container">
					<thead className="report-header">
						<tr>
							<th className="report-header-cell">
								{/* <div className="header-info">header content....</div> */}

								<div className="header">
									<div className="header-info">
										<img
											className="header-logo-left"
											src="/assets/logos/Logo-Edo State.png"
											alt=""
										/>
										<div className="header-text">
											<span className="header-text-state">
												EDO STATE GOVERNMENT
											</span>
											<span className="header-text-ministry">
												Ministry of Physical Planning,
											</span>
											<span className="header-text-ministry">
												Housing, Urban and Regional Development
											</span>
										</div>
										<img
											className="header-logo-right"
											src="/assets/logos/Logo-Mpphurd.png"
											alt=""
										/>
									</div>
									<div className="header-rule"></div>
								</div>
							</th>
						</tr>
					</thead>
					<tfoot className="report-footer">
						<tr>
							<td className="report-footer-cell">
								<div className="footer-info">
									<div className={"page-footer"}>
										<div className="footer-rule"></div>
										<p>
											2nd Floor, Block "C" Secretariat Complex, Sapele Road,
											Benin City, Edo State.
										</p>
										<p>Email: info.mppud@edostate.gov.ng</p>
										<p>Tel: +234 810 466 3697</p>
									</div>
								</div>
							</td>
						</tr>
					</tfoot>
					<tbody className="report-content">
						<tr>
							<td className="report-content-cell">
								{/* <div className="main">body content...</div> */}
								<div className="main">{content}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<ReactToPrint
				documentTitle="Hello world"
				trigger={() => <button className={classes}>{label}</button>}
				content={() => printComponent}
			/>
		</>
	);
}

export default PrintWrapper;
