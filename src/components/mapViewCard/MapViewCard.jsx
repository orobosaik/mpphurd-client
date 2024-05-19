import { useRef, useState } from "react";
import "./mapViewCard.css";
import {
	ExpandLessRounded,
	ExpandMoreRounded,
	LaunchRounded,
} from "@mui/icons-material";
import GoogleMapReact from "google-map-react";
import MapLocationPin from "../mapLocationPin/MapLocationPin";
import Map, {
	AttributionControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { getThemeColor } from "../../utilities/themeColor";

export default function MapViewCard({ data }) {
	const [showComment, setShowComment] = useState(false);
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
				{/* <GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg" }}
				// bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
				defaultCenter={location}
				defaultZoom={17}>
				<MapLocationPin
					lat={location.lat}
					lng={location.lng}
					text={location.address}
				/>
			</GoogleMapReact> */}

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
					{/* <Marker longitude={location.longitude} latitude={location.latitude} /> */}
					<NavigationControl position="top-left" />
					<FullscreenControl />
					{/* <AttributionControl customAttribution="Map design by me" /> */}
				</Map>
			</div>
		</>
	);
}
