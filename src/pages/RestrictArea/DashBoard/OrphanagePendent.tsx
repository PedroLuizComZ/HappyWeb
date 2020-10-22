import React from "react";

import { FiArrowRight } from "react-icons/fi";

import { Map, Marker, TileLayer } from "react-leaflet";
import mapIcon from "../../../utils/mapIcon";

function OrphanagePendent() {
	return (
		<div id="orphanges-created-container">
			<div className={"orphanges-created-header"}>
				<h1>Cadastros pendentes</h1>
				<span>1 orfanato</span>
			</div>
			<div className={"orphanges-created-item"}>
				<div className="map-container">
					<Map
						center={[-23.1881649, -46.8931377]}
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
							position={[-23.1881649, -46.8931377]}
						/>
					</Map>

					<footer>
						<span>Orf. Esperança</span>
						<div>
							<button type="button">
								<FiArrowRight />
							</button>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default OrphanagePendent;
