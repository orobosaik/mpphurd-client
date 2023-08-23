import { useState } from "react";
import "./listWrapper.css";
import ListCard from "../listCard/ListCard";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";
import ListCardContainer from "../listCardContainer/ListCardContainer";

export default function ListWrapper({ children }) {
	const [showQuery, setShowQuery] = useState(true);
	const showQueryHandler = (e) => {
		e.target.value === "current" ? setShowQuery(false) : setShowQuery(true);
	};
	const todayDate = new Date().toISOString().slice(0, 10);
	return (
		<div className="listWrapper">
			<div className="listQuery">
				<div className="listQueryOptions">
					<select
						name="listQueryOption"
						id="listQueryOption"
						onChange={showQueryHandler}>
						<option value="incoming">Incoming</option>
						<option value="Outgoing">Outgoing</option>
						<option value="current">Current</option>
					</select>
				</div>

				{showQuery && (
					<div className="listQueryDate">
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateStart">From:</label>
							<input
								type="date"
								name="listQueryDateStart"
								id="listQueryDateStart"
								defaultValue={todayDate}
							/>
						</div>
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateEnd">To:</label>
							<input
								type="date"
								name="listQueryDateEnd"
								id="listQueryDateEnd"
								defaultValue={todayDate}
							/>
						</div>
					</div>
				)}

				<div>
					<input type="text" placeholder="Search record..." />
				</div>

				<div className="listCount">
					<span>Count:</span>
					<span>78,867</span>
				</div>

				<div className="listSort">
					<span>Latest to Oldest</span>
					<ExpandMoreRounded />
				</div>
			</div>

			<div className="listHeader listFormat">
				<span>PlanNo</span>
				<span>File Name</span>
				<span>Location</span>
				<span>Property Type</span>
				<span>Has Rep</span>
				<span>Stack</span>
			</div>

			<div className="listCardContainerWrapper">
				<ListCardContainer date={todayDate} count={"4"}>
					<ListCard />
					<ListCard />
					<ListCard />
					<ListCard />
				</ListCardContainer>
				<ListCardContainer date={todayDate} count={"2"}>
					<ListCard />
					<ListCard />
				</ListCardContainer>
				<ListCardContainer date={todayDate} count={"2"}>
					<ListCard />
					<ListCard />
				</ListCardContainer>
				<ListCardContainer date={todayDate} count={"2"}>
					<ListCard />
					<ListCard />
				</ListCardContainer>
				<ListCardContainer date={todayDate} count={"2"}>
					<ListCard />
					<ListCard />
				</ListCardContainer>
				<ListCardContainer date={todayDate} count={"2"}>
					<ListCard />
					<ListCard />
				</ListCardContainer>
			</div>
		</div>
	);
}
