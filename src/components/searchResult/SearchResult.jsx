import "./searchResult.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { LinearProgress } from "@mui/material";
import SearchResultCard from "../searchResultCard/SearchResultCard";

export default function SearchResult() {
	const [open, setOpen] = useState(true );

	return (
		<div className="searchResult">
			<header>
				{open && <LinearProgress />}

				<div className="searchResultTitle">
					<h2>Search Results</h2>

					<div>
						<span>552</span>
						<span>Found</span>
					</div>
				</div>
			</header>

			<section>
				<SearchResultCard />
				<SearchResultCard />
				<SearchResultCard />


			</section>
		</div>
	);
}
