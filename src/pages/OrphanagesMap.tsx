import React, { useEffect, useState } from "react";

import "../styles/pages/orphanages-map.css";

import mapMarquerImg from "../images/map-marker.svg";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

function OrphanagesMap() {
	useEffect(() => {
		api.get("orphanages").then((response) => {
			setOrphanages(response.data);
		});
	}, []);

	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarquerImg} alt={"Happy"} />
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Jundiaí</strong>
					<span>São Paulo</span>
				</footer>
			</aside>

			<Map
				center={[-23.1881649, -46.8931377]}
				zoom={15}
				style={{ width: "100%", height: "100%" }}
			>
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>
				{orphanages.map((orphanage: Orphanage) => {
					return (
						<Marker
							key={orphanage.id}
							icon={mapIcon}
							position={[orphanage.latitude, orphanage.longitude]}
						>
							<Popup
								closeButton={false}
								minWidth={240}
								maxWidth={240}
								className={"map-popup"}
							>
								{orphanage.name}
								<Link to={`/orphanage/${orphanage.id}`}>
									<FiArrowRight size={20} color={"#fff"} />
								</Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>

			<Link to={"/orphanage/create"} className={"create-orphanage"}>
				<FiPlus />
			</Link>
		</div>
	);
}

export default OrphanagesMap;
