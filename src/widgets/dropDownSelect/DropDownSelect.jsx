import React, { useEffect, useState } from "react";
import "./dropDownSelect.css";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import {
	BrightnessMediumRounded,
	DarkModeRounded,
	LightModeRounded,
} from "@mui/icons-material";

export default function DropDownSelect({ data }) {
	return (
		<Dropdown>
			<MenuButton className="dropdown-button">
				<span>{data.title}</span>
			</MenuButton>
			<Menu
				className="dropdown"
				slotProps={{
					listbox: { className: "dropdown-listbox" },
				}}>
				{data?.items?.map((e) => {
					return (
						<MenuItem className="dropdown-item" onClick={() => e?.action()}>
							{/* <LightModeRounded className="theme-icon" /> */}
							<span>{e?.text}</span>
						</MenuItem>
					);
				})}

				{/* <MenuItem
					className="dropdown-item"
					onClick={() => dispatch(setTheme("dark"))}>
					<DarkModeRounded className="theme-icon" />
					<span>Dark</span>
				</MenuItem>
				<MenuItem
					className="dropdown-item"
					onClick={() => dispatch(setTheme("system"))}>
					<BrightnessMediumRounded className="theme-icon" />
					<span>System</span>
				</MenuItem> */}
			</Menu>
		</Dropdown>
	);
}
