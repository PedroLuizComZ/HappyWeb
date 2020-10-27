import React, { FormEvent, useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";

import "../../../styles/pages/aprove-orphanage.css";
import Sidebar from "../../../components/Sidebar";
import mapIcon from "../../../utils/mapIcon";
import api from "../../../services/api";
import { useHistory, useParams } from "react-router-dom";

interface OrphanageParams {
	id: string;
}

export default function OrphanageAprove() {
	const history = useHistory();
	const params = useParams<OrphanageParams>();

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [instructions, setInstructions] = useState("");
	const [opening_hours, setOpeningHours] = useState("");
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	useEffect(() => {
		api.get(`orphanages/${params.id}`).then((response) => {
			if (response.status === 200) {
				const {
					name,
					about,
					instructions,
					opening_hours,
					open_on_weekends,
					images,
					latitude,
					longitude,
				} = response.data;

				setName(name);
				setAbout(about);
				setInstructions(instructions);
				setOpeningHours(opening_hours);
				setOpenOnWeekends(open_on_weekends);
				setPosition({ latitude: latitude, longitude: longitude });

				const previewImages = images.map((image: any) => {
					return image.url;
				});

				setPreviewImages(previewImages);
			}
		});
	}, [params.id]);

	async function handleAproveBtn() {
		api.post(`/orphanage_aproved/${params.id}`).then((response) => {
			alert(response.data.message);
			history.push("/dashboard");
		});
	}

	async function handleDisapproveBtn() {
		await api
			.delete(`/orphanages/${params.id}`)
			.then((response) => {
				alert(response.data.message);
				history.push("/dashboard");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div id="page-create-orphanage">
			<Sidebar />
			<main>
				<form className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[-23.1881649, -46.8931377]}
							style={{ width: "100%", height: 280 }}
							zoom={15}
						>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
							/>

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={mapIcon}
									position={[
										position.latitude,
										position.longitude,
									]}
								/>
							)}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input
								id="name"
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
								disabled
							/>
						</div>

						<div className="input-block">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
							<textarea
								id="name"
								maxLength={300}
								value={about}
								onChange={(event) =>
									setAbout(event.target.value)
								}
								disabled
								className={"resize-none"}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">
								{previewImages.map((image) => {
									return (
										<img
											key={image}
											src={image}
											alt={name}
										/>
									);
								})}
							</div>
						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea
								id="instructions"
								value={instructions}
								onChange={(event) =>
									setInstructions(event.target.value)
								}
								disabled
								className={"resize-none"}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">
								Horário de funcionamento
							</label>
							<input
								id="opening_hours"
								value={opening_hours}
								onChange={(event) =>
									setOpeningHours(event.target.value)
								}
								disabled
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">
								Atende fim de semana
							</label>

							<div className="button-select">
								<button
									type="button"
									className={open_on_weekends ? "active" : ""}
								>
									Sim
								</button>
								<button
									type="button"
									className={
										!open_on_weekends ? "active" : ""
									}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>
					<div className={"actions-container"}>
						<button
							onClick={handleAproveBtn}
							className="confirm-button"
							type="button"
						>
							Aceitar
						</button>
						<button
							onClick={handleDisapproveBtn}
							className="warning-button"
							type="button"
						>
							Recusar
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
