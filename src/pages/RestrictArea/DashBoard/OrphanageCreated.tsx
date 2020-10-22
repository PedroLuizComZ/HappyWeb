import React, { useEffect, useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import mapIcon from "../../../utils/mapIcon";

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

function OrphanageCreated() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get("orphanages").then((response) => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id="orphanges-created-container">
			<div className={"orphanges-created-header"}>
				<h1>Orfanatos Cadastrados</h1>
				<span>{orphanages.length} orfanatos</span>
			</div>
			<div className={"orphanges-created-item"}>
				{orphanages.map((orphanage: Orphanage) => {
					return (
						<div className="map-container" key={orphanage.id}>
							<Map
								center={[
									orphanage.latitude,
									orphanage.longitude,
								]}
								zoom={16}
								style={{ width: "100%", height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}
							>
								<TileLayer
									url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
								/>
								<Marker
									interactive={false}
									icon={mapIcon}
									position={[
										orphanage.latitude,
										orphanage.longitude,
									]}
								/>
							</Map>

							<footer>
								<span>{orphanage.name}</span>
								<div>
									<Link
										to={`/orphanage-edit/${orphanage.id}`}
										type="button"
									>
										<FiEdit3 />
									</Link>
									<Link
										to={`/orphanage-edit/${orphanage.id}`}
										type="button"
									>
										<FiTrash />
									</Link>
								</div>
							</footer>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrphanageCreated;
