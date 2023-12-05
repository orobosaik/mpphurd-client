export const getFullName = (title, firstName, middleName, lastName, prefix) => {
	[title, firstName, middleName, lastName, prefix]
		.filter(function (value) {
			return value !== null && value !== "" && value !== undefined;
		})
		.join(" ");
};
