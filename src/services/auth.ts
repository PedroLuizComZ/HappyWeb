import api from "./api";

export async function checkToken() {
	return new Promise(async (resolve, reject) => {
		const jwtToken = localStorage.getItem("jwtToken");
		await api({
			method: "post",
			url: "/check_token",
			data: { token: jwtToken },
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					resolve(true);
				}
			})
			.catch((error) => {
				console.log(error);
				resolve(false);
			});
	});
}
