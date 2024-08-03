import { useState } from "react";
import "./vettingCard.css";
import { format, isToday, isYesterday } from "date-fns";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";
import VettingCardAddModal from "../vettingCardAddModal/VettingCardAddModal";
import { useSelector } from "react-redux";

function VettingCard({ data, header, reload, reloadActivities }) {
	const [showComment, setShowComment] = useState(false);
	const [showVetting, setShowVetting] = useState(false);

	const { currentUser } = useSelector((state) => state.user);
	const { currentAdmin } = useSelector((state) => state.admin);

	const displayDate = (originalDate) => {
		if (isToday(originalDate)) {
			return (
				<>
					<span>Today</span>
					{/* <span>{format(originalDate, "HH:mm")}</span> */}
				</>
			);
		} else if (isYesterday(originalDate)) {
			return (
				<>
					<span>Yesterday</span>
					{/* <span>{format(originalDate, "HH:mm")}</span> */}
				</>
			);
		} else {
			return (
				<>
					<span>{format(originalDate, "dd/MM/yyyy")}</span>
					{/* <span>{format(originalDate, "HH:mm")}</span> */}
				</>
			);
		}
	};

	// Check if User has authorization to vet plan
	const isInOfficeAndPermitted = currentUser?.office?.some((e) => {
		return (
			data?.plan?.currentOffice?.id?._id === e?.id?._id &&
			e.tasks.includes("VET PLAN")
		);
	});
	const isCorrectJobTitle =
		currentUser?.jobTitle?.toLowerCase() === header.jobTitle.toLowerCase();
	const isCleared =
		data?.vetting?.status?.toLowerCase() === "cleared" ||
		data?.vetting?.status?.toLowerCase() === "process further";

	// console.log(isInOfficeAndPermitted, isCorrectJobTitle);
	return (
		<div className="vettingCard">
			{/* <div className="vettingCardArrow"></div> */}

			{<ActivityCardModal stateData={data.plan} />}

			<div className="type" onClick={() => setShowVetting(!showVetting)}>
				<h2 className="type__title">{header.title}</h2>
				<span
					className={`type__status ${data?.vetting?.status?.toLowerCase()}`}>
					{data?.vetting?.status || "No Action"}
				</span>
			</div>

			{showVetting && (
				<>
					{/* <div className="vet">
						<div className="vet__head">
							<div className="vet__status">Cleared</div>
							<div className="vet__date">{displayDate(new Date())}</div>
						</div>

						<div className="vet__comment">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
							saepe nemo eligendi minus, dolor animi sint hic possimus eius et
							fuga dolorem, suscipit quia autem.
						</div>
						<div className="vet__officer">orobosa Ikponmwosa</div>
					</div>

					<div className="vet">
						<div className="vet__head">
							<div className="vet__status">Cleared</div>
							<div className="vet__date">{displayDate(new Date())}</div>
						</div>

						<div className="vet__comment">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
							saepe nemo eligendi minus, dolor animi sint hic possimus eius et
							fuga dolorem, suscipit quia autem.
						</div>
						<div className="vet__officer">Orobosa Ikponmwosa</div>
					</div> */}

					{data?.vetting?.items?.map((item, index) => {
						return (
							<div className="vet" key={index}>
								<div className="vet__head">
									<div className={`vet__status ${item?.status?.toLowerCase()}`}>
										{item?.status}
									</div>
									<div className="vet__date">{displayDate(item?.date)}</div>
								</div>

								{/* <div className="vet__comment">{item?.comment}</div> */}

									<div
										// className="activityCardCommentText"
										dangerouslySetInnerHTML={{
											__html: item?.comment,
										}}
									/>
								<div className="vet__officer">{item?.staffName}</div>
							</div>
						);
					})}
					{/* {console.log(data?.vetting?.items)} */}
					{data?.vetting?.items?.length === 0 && "No Professional Comment"}

					{/* {console.log({ Header: header, User: currentUser })} */}

					{isCorrectJobTitle && isInOfficeAndPermitted && (
						<VettingCardAddModal
							data={data.plan}
							reload={reload}
							reloadActivities={reloadActivities}
							isCleared={isCleared}
							type={header.jobTitle}
							className="btn vet__add"
						/>
					)}
				</>
			)}

			{/* Show comment if available */}
			{/* <div className="vettingCardComment">
				{data?.comment?.text && (
					<div
						className="vettingCardCommentButton"
						onClick={() => setShowComment(!showComment)}>
						<span>Comment</span>
						{showComment ? (
							<ExpandLessRounded className="vettingCardCommentButtonIcon" />
						) : (
							<ExpandMoreRounded className="vettingCardCommentButtonIcon" />
						)}
					</div>
				)}

				{showComment && (
					<p className="vettingCardCommentText">{data?.comment?.text}</p>
				)}
			</div> */}
		</div>
	);
}
export default VettingCard;
