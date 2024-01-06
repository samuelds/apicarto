import { MapContainer, TileLayer } from "react-leaflet";

import Geoman from "./Geoman";
import { ZoneUrbanisme } from "./ign/Urbanisme";
import { useLeafletContext } from "@react-leaflet/core";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/App";

const EventsLisnner = () => {

    const context = useLeafletContext();
    const app = useContext(AppContext);

    useEffect(() => {
        const leafletContainer = context.layerContainer || context.map;
        leafletContainer.on('moveend', () => {
            const bounds = leafletContainer.getBounds();
            const zoom = leafletContainer.getZoom();
            app.setBounds([
                [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
                [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
                [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
                [bounds.getSouthWest().lng, bounds.getSouthWest().lat]
            ]);
            app.setZoom(zoom);
        });
    }, [context, app.setZoom, app.setBounds]);

    return null;
};

const Map = () => {

    const position = [48.863247, 2.350747];
    const zoomLv = 13;

    return (
        <MapContainer center={position} zoom={zoomLv} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={20}
            />
            <EventsLisnner />
            <Geoman />
            <ZoneUrbanisme />
        </MapContainer>
    );
};

export default Map;
