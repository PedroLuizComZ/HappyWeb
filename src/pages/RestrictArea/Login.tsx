import React, { FormEvent, useState } from "react";

import "../../styles/pages/login.css";

import logoImg from "../../images/LogoColumn.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

function Login() {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		api({
			method: "post",
			url: "/check_user",
			data: { email: email, password: password },
		})
			.then((response) => {
				if (response.status === 200) {
					const { jwtToken } = response.data;
					localStorage.setItem("jwtToken", jwtToken);
					history.push("/dashboard");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div id="page-login">
			<div className={"splash-container"}>
				<img src={logoImg} alt={"Happy"} />
				<div className={"splash-data"}>
					<h1>Jundiaí</h1>
					<p>São Paulo</p>
				</div>
			</div>
			<div className={"form-container"}>
				<Link to={"/"}>
					<FiArrowLeft size={35} color={"#15C3D6"} />
				</Link>

				<h1>Fazer login</h1>
				<form onSubmit={handleSubmit}>
					<div className={"input-format"}>
						<label>E-mail</label>
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className={"input-format"}>
						<label>Senha</label>
						<input
							type="password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</div>
					<Link to={"/"}>Esqueci minha senha</Link>
					<button type={"submit"}>Entrar</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
