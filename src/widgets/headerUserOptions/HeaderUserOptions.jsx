import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/appSlice";
import "./headerUserOptions.css";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import {
	BrightnessMediumRounded,
	DarkModeRounded,
	LightModeRounded,
} from "@mui/icons-material";

export default function HeaderUserOptions({ staff }) {
	const { theme } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	return (
		<div className="plain-dropdown">
			<Dropdown>
				{/* <MenuButton className="dropdown-button"> */}
				<MenuButton className="plain-dropdown">
					<div className="headerUser">
						<div className="headerDetails">
							<span className="headerName">{`${staff.firstName} ${staff.lastName}`}</span>
							<span className="headerOffice">{`${staff.position}`}</span>
						</div>

						<img
							src={staff.profilePicture || "/assets/persons/no_avatar.png"}
							alt=""
							className="headerImg"
						/>
					</div>
				</MenuButton>
				<Menu
					className="dropdown"
					slotProps={{
						listbox: { className: "dropdown-listbox" },
					}}>
					<MenuItem
						className="dropdown-item"
						onClick={() => dispatch(setTheme("light"))}>
						<LightModeRounded className="theme-icon" />
						<span>Light</span>
					</MenuItem>
					<MenuItem
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
					</MenuItem>
				</Menu>
			</Dropdown>
		</div>
	);
}
