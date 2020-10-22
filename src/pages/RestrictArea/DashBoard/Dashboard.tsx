import React, { useEffect, useState } from "react";

import "../../../styles/pages/dashboard.css";
import OrphanageCreated from "./OrphanageCreated";
import OrphanagePendent from "./OrphanagePendent";
import mapMarkerImg from "../../../images/map-marker.svg";
import { FiAlertCircle, FiMapPin, FiPower } from "react-icons/fi";
import { checkToken } from "../../../services/auth";
import { useHistory } from "react-router-dom";

function Dashboard() {
	const history = useHistory();
	useEffect(() => {
		async function validateUser() {
			const userAccess = await checkToken();
			if (!userAccess) {
				history.push("/admin");
			}
		}

		validateUser();
	}, [history]);

	const [activePage, setActivePage] = useState("CreatedOrphanages");

	function handleNavigateToCreateOrphanages() {
		setActivePage("CreatedOrphanages");
	}

	function handleNavigateToPendentOrphanages() {
		setActivePage("PendentOrphanages");
	}

	function handleLogout() {
		localStorage.removeItem("jwtToken");
		history.push("/admin");
	}

	return (
		<div id="page-dashboard">
			<aside>
				<img src={mapMarkerImg} alt="Happy" />
				<div className={"user-actions"}>
					<div
						className={
							activePage === "CreatedOrphanages" ? "active" : ""
						}
						onClick={handleNavigateToCreateOrphanages}
					>
						<FiMapPin size={28} />
					</div>
					<div
						className={
							activePage === "PendentOrphanages" ? "active" : ""
						}
						onClick={handleNavigateToPendentOrphanages}
					>
						<FiAlertCircle size={28} />
					</div>
				</div>
				<div className={"logoff"} onClick={handleLogout}>
					<FiPower size={28} />
				</div>
			</aside>
			<main>
				{activePage === "CreatedOrphanages" && <OrphanageCreated />}
				{activePage === "PendentOrphanages" && <OrphanagePendent />}
			</main>
		</div>
	);
}

export default Dashboard;
