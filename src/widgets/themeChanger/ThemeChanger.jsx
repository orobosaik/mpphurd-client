import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/userSlice";
import "./themeChanger.css";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { AutoModeRounded, DarkModeRounded, LightModeRounded } from "@mui/icons-material";

export default function ThemeChanger({client}) {
	const { theme } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleThemeClick = (theme) => {
		return () => {
		theme === "light"
		? lightTheme()
			: theme === "dark"
			? darkTheme()
			: systemTheme();
			// alert(theme);
		};
	};

	const systemTheme = () => {
		// media query for default theme
		const isDark = window.matchMedia("(prefers-color-scheme: dark)");

		const doc = document.querySelector("html");
		const icon = document.querySelector(".theme-icon");
		// const path = document.querySelector(".theme-icon path");
		// path.setAttribute("d", dayAndNightIcon);
		// icon.classList = "theme-icon theme-system";

		dispatch(setTheme("system"));

		!isDark ? (doc.dataset.theme = "dark") : (doc.dataset.theme = "light");
	};
	const darkTheme = () => {
		const doc = document.querySelector("html");
		// const icon = document.querySelector(".theme-icon");
		// const path = document.querySelector(".theme-icon path");

		dispatch(setTheme("dark"));

		doc.dataset.theme = "dark";
		// path.setAttribute("d", nightIcon);
		// icon.classList = "theme-icon theme-dark";
	};
	const lightTheme = () => {
		const doc = document.querySelector("html");
		// const icon = document.querySelector(".theme-icon");
		// const path = document.querySelector(".theme-icon path");
		dispatch(setTheme("light"));

		doc.dataset.theme = "light";
		// path.setAttribute("d", dayIcon);
		// icon.classList = "theme-icon theme-light";
	};

	useEffect(() => {
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

		return () => {
			theme === "light"
				? lightTheme()
				: theme === "dark"
				? darkTheme()
					: systemTheme();
			// alert("heyyy")
		};
	}, []);

	return (
		<Dropdown>
			<MenuButton className="dropdown-button">
				{theme === "light" ? (
					<LightModeRounded className="theme-icon" />
				) : theme === "dark" ? (
					<DarkModeRounded className="theme-icon" />
				) : (
					<AutoModeRounded className="theme-icon" />
				)}
				<span>Theme</span>
			</MenuButton>
			<Menu
				className="dropdown"
				slotProps={{
					listbox: { className: "dropdown-listbox" },
				}}>
				<MenuItem className="dropdown-item" onClick={handleThemeClick("light")}>
					<LightModeRounded className="theme-icon" />
					<span>Light</span>
				</MenuItem>
				<MenuItem className="dropdown-item" onClick={handleThemeClick("dark")}>
					<DarkModeRounded className="theme-icon" />
					<span>Dark</span>
				</MenuItem>
				<MenuItem
					className="dropdown-item"
					onClick={handleThemeClick("system")}>
					<AutoModeRounded className="theme-icon" />
					<span>System</span>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}
