import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { FiPlus } from "react-icons/fi";

import "../../../styles/pages/create-orphanage.css";
import Sidebar from "../../../components/Sidebar";
import mapIcon from "../../../utils/mapIcon";
import api from "../../../services/api";
import { useHistory, useParams } from "react-router-dom";

interface OrphanageParams {
	id: string;
}

export default function OrphanageEdit() {
	const history = useHistory();
	const params = useParams<OrphanageParams>();

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [instructions, setInstructions] = useState("");
	const [opening_hours, setOpeningHours] = useState("");
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<File[]>([]);
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
				setImages(images);
				setPosition({ latitude: latitude, longitude: longitude });

				const previewImages = images.map((image: any) => {
					return image.url;
				});

				setPreviewImages(previewImages);
			}
		});
	}, [params.id]);

	function handleMapClick(event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;
		setPosition({ latitude: lat, longitude: lng });
	}

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const { latitude, longitude } = position;

		const data = new FormData();

		data.append("id", params.id);
		data.append("name", name);
		data.append("about", about);
		data.append("latitude", String(latitude));
		data.append("longitude", String(longitude));
		data.append("instructions", instructions);
		data.append("opening_hours", opening_hours);
		data.append("open_on_weekends", String(open_on_weekends));
		images.forEach((image) => {
			data.append("images", image);
		});

		api.put("orphanages", data).then((response) => {
			alert("Orfanato editado com sucesso");
			history.push("/dashboard");
		});
	}

	function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) {
			return;
		}

		const selectedImages = Array.from(event.target.files);

		setImages(selectedImages);

		const selectedImagesPreview = selectedImages.map((image) => {
			return URL.createObjectURL(image);
		});

		setPreviewImages(selectedImagesPreview);
	}

	return (
		<div id="page-create-orphanage">
			<Sidebar />
			<main>
				<form onSubmit={handleSubmit} className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[-23.1881649, -46.8931377]}
							style={{ width: "100%", height: 280 }}
							zoom={15}
							onClick={handleMapClick}
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

								<label className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
							</div>
							<input
								multiple
								onChange={handleSelectImages}
								type="file"
								id="image[]"
							/>
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
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">
								Atende fim de semana
							</label>

							<div className="button-select">
								<button
									type="button"
									onClick={() => setOpenOnWeekends(true)}
									className={open_on_weekends ? "active" : ""}
								>
									Sim
								</button>
								<button
									type="button"
									onClick={() => setOpenOnWeekends(false)}
									className={
										!open_on_weekends ? "active" : ""
									}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}
