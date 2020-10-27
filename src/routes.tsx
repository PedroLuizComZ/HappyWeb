import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";
import Login from "./pages/RestrictArea/Login";
import Dashboard from "./pages/RestrictArea/DashBoard/Dashboard";
import OrphanageEdit from "./pages/RestrictArea/DashBoard/OrphanageEdit";
import OrphanageAprove from "./pages/RestrictArea/DashBoard/OrphanageAprove";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={"/"} component={Landing} />
				<Route path={"/app"} component={OrphanagesMap} />

				<Route path={"/orphanage/create"} component={CreateOrphanage} />
				<Route path={"/orphanage/:id"} component={Orphanage} />

				{/* RestrictArea */}
				<Route path={"/admin"} component={Login} />
				<Route path={"/dashboard"} component={Dashboard} />
				<Route path={"/orphanage-edit/:id"} component={OrphanageEdit} />
				<Route
					path={"/orphanage-aprove/:id"}
					component={OrphanageAprove}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
