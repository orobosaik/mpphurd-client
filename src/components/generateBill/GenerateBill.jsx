import "./generateBill.css";

export default function GenerateBill() {
	return (
		<>
			<div className="generateBillType">
				<span>Select Bill Type:</span>
				<button className="secondary">Assessment v</button>
			</div>

			<div className="generateBillWrapper">
				<div className="generateBillTitle">Fees Analysis</div>
				<div className="generateBillItems">
					<div className="generateBillItem">
						<div className="generateBillItemSummary">
							<span className="generateBillItemName">Registration Fee:</span>
							<span className="generateBillItemValue">35,000</span>
						</div>
					</div>
					<div className="generateBillItem">
						<div className="generateBillItemSummary">
							<span className="generateBillItemName">Development Fees:</span>
							<span className="generateBillItemValue">34,000</span>
						</div>
					</div>
					<div className="generateBillItem">
						<div className="generateBillItemSummary">
							<span className="generateBillItemName">Volume of Building:</span>
							<span className="generateBillItemValue">65,989</span>
						</div>
						<div className="generateBillItemVOB">
              <div>
                <button>-</button>
              </div>
							<div>
								<div className="VOBLength">
									<span>Length:</span>
									<input type="text" />
								</div>
								<div className="VOBBreath">
									<span>Breath:</span>
									<input type="text" />
								</div>
								<div>
									<span className="VOBHeight">Height:</span>
									<input type="text" />
								</div>
								<div>
									<span>Fee Per Sq Meter:</span>
									<button>25 v</button>
								</div>
							</div>
							<div>54,908</div>
            </div>
            <button>+</button>
					</div>
				</div>
			</div>
		</>
	);
}
