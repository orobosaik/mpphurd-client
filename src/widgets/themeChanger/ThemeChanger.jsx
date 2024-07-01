import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/appSlice";
import "./themeChanger.css";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import {
	BrightnessMediumRounded,
	DarkModeRounded,
	LightModeRounded,
} from "@mui/icons-material";

export default function ThemeChanger({ client }) {
	const { theme } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	return (
		<Dropdown>
			<MenuButton className="dropdown-button">
				{theme === "light" ? (
					<LightModeRounded className="theme-icon" />
				) : theme === "dark" ? (
					<DarkModeRounded className="theme-icon" />
				) : (
					<BrightnessMediumRounded className="theme-icon" />
				)}
				<span>Theme</span>
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
	);
}
