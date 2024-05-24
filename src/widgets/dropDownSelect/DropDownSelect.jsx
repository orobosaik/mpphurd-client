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
import uuid from "react-uuid";

export default function DropDownSelect({ data }) {
	return (
		<Dropdown>
			<MenuButton className="dropdown-button">
				<span>{data.title}</span>
			</MenuButton>
			<Menu
				className="dropdown"
				placement="bottom-end"
				slotProps={{
					listbox: { className: "dropdown-listbox" },
				}}>
				{data?.items?.map((e) => {
					return (
						<MenuItem
							disabled={e?.disabled || false}
							className={`dropdown-item ${e?.disabled && "disabled"}`}
							onClick={() => e?.action()}
							key={uuid()}>
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
