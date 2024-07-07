import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/appSlice";
import "./headerUserOptions.css";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import {
	ApartmentRounded,
	BrightnessMediumRounded,
	BuildRounded,
	DarkModeRounded,
	LightModeRounded,
	Person2Rounded,
	Person3Rounded,
	PersonRounded,
	SettingsRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HeaderUserOptions({ staff }) {
	const { theme } = useSelector((state) => state.app);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	return (
		<div className="plain-dropdown">
			<Dropdown>
				{/* <MenuButton className="dropdown-button"> */}
				<MenuButton>
					<div className="headerUser">
						<div className="headerDetails">
							<span className="headerName">{`${staff.firstName} ${staff.lastName}`}</span>
							<span className="headerOffice">{`${staff.position}`}</span>
						</div>

						<img
							src={ staff.profilePicture ?
								`${import.meta.env.VITE_STORAGE_LINK}${staff.profilePicture}` :
								"/assets/persons/no_avatar.png"
							}
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
						onClick={() => navigate("/profile")}>
						<Person2Rounded className="theme-icon" />
						<span>Profile</span>
					</MenuItem>
					<MenuItem
						className="dropdown-item"
						onClick={() => navigate("/office_setting")}>
						<ApartmentRounded className="theme-icon" />
						<span>Office Setting</span>
					</MenuItem>
					<MenuItem
						className="dropdown-item"
						// onClick={() => dispatch(setTheme("system"))}
					>
						<SettingsRounded className="theme-icon" />
						<span>General Settings</span>
					</MenuItem>
				</Menu>
			</Dropdown>
		</div>
	);
}
