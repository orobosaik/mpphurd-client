import { useEffect, useRef, useState } from "react";
import "./mapViewCard.css";
import Map, {
	AttributionControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { getThemeColor } from "../../utilities/themeColor";

export default function MapViewCard({ data }) {
	const [showPopup, setShowPopup] = useState(true);

	const theme = getThemeColor();
	const style =
		theme === "light"
			? "mapbox://styles/mapbox/streets-v12"
			: "mapbox://styles/mapbox/dark-v11";

	const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

	const zoomLevel = 12;
	const location = {
		address: "1600 Amphitheatre Parkway, Mountain View, california.",
		longitude: 5.62575,
		latitude: 6.33815,
	};

	return (
		<>
			<div className="mapViewCard">
				<Map
					reuseMaps
					mapboxAccessToken={mapboxAccessToken}
					initialViewState={{
						longitude: location.longitude,
						latitude: location.latitude,
						zoom: zoomLevel,
					}}
					// mapStyle="mapbox://styles/mapbox/navigation-night-v1">
					// mapStyle="mapbox://styles/mapbox/navigation-day-v1">
					// mapStyle="mapbox://styles/mapbox/dark-v11">
					mapStyle={style}
					scrollZoom={false}
					attributionControl={false}>
					<FullscreenControl />
					{/* {showPopup && (
						<Popup
							longitude={location.longitude}
							latitude={location.latitude}
							anchor="bottom"
							onClose={() => setShowPopup(false)}>
							You are here
						</Popup>
					)} */}
					<GeolocateControl
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
					/>
					<Marker longitude={location.longitude} latitude={location.latitude} />
					<NavigationControl position="top-left" />
					{/* <AttributionControl customAttribution="Map design by me" /> */}

				</Map>
			</div>
		</>
	);
}
