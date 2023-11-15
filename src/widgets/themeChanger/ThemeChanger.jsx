import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/userSlice";
import "./themeChanger.css"

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";

export default function ThemeChanger() {
	const { theme } = useSelector((state) => state.user);

	// const dispatch = useDispatch();

	const createHandleMenuClick = (theme) => {
		// theme === "light"
		// ? lightTheme()
		// 	: theme === "dark"
		// 	? darkTheme()
		// 	: systemTheme();
		return () => {

			alert(theme);
		}
	}

	const systemTheme = (isDark) => {
        const doc = document.querySelector("html");
        const icon = document.querySelector(".theme-icon");
        const path = document.querySelector(".theme-icon path");
        path.setAttribute("d", dayAndNightIcon);
        icon.classList = "theme-icon theme-system";
        isDark ? doc.dataset.theme = "dark" : doc.dataset.theme = "light";
    }
	const darkTheme = () => {
		const doc = document.querySelector("html");
		const icon = document.querySelector(".theme-icon");
		const path = document.querySelector(".theme-icon path");

		doc.dataset.theme = "dark";
		path.setAttribute("d", nightIcon);
		icon.classList = "theme-icon theme-dark";
	}
	const lightTheme = () => {
		const doc = document.querySelector("html");
		const icon = document.querySelector(".theme-icon");
		const path = document.querySelector(".theme-icon path");
		doc.dataset.theme = "light";
		path.setAttribute("d", dayIcon);
		icon.classList = "theme-icon theme-light";
	}

	// useEffect(() => {
	// 	// Remove Event
	// 	prefersDark.removeEventListener("change", (e) => {
	// 		systemTheme(e.matches);
	// 	});

	// 	// Theme Switcher
	// 	// media query for default theme
	// 	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
	// 	// media query event
	// 	prefersDark.addEventListener("change", (e) => {
	// 		systemTheme(e.matches);
	// 	});
	// 	// load default theme
	// 	systemTheme(prefersDark.matches);

	// 	return () => {
	// 		if (currentTheme === "dark") {
	// 			darkTheme();
	// 			dispatch(setTheme("dark"));
	// 		} else if (currentTheme === "light") {
	// 			lightTheme();
	// 			dispatch(setTheme("light"));
	// 		} else if (currentTheme === "system") {
	// 			systemTheme(prefersDark.matches);
	// 			dispatch(setTheme("system"));
	// 		}
	// 	};
	// }, [currentTheme]);

	return (
		<Dropdown>
			<MenuButton className="dropdown-button">My account</MenuButton>
			<Menu className="dropdown-container">
				<MenuItem className="dropdown-item" onClick={createHandleMenuClick("Profile")}>Profile</MenuItem>
				<MenuItem className="dropdown-item" onClick={createHandleMenuClick("Language settings")}>
					Language settings
				</MenuItem>
				<MenuItem className="dropdown-item" onClick={createHandleMenuClick("Log out")}>Log out</MenuItem>
			</Menu>
		</Dropdown>
	);
}
