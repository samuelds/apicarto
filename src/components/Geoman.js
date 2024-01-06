import { useLeafletContext } from '@react-leaflet/core';
import { useEffect } from "react";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const Geoman = () => {

    const context = useLeafletContext();

    useEffect(() => {

        const leafletContainer = context.layerContainer || context.map;
        leafletContainer.pm.addControls({
            drawCircleMarker: false
        });

    }, [context]);

    return null;
}

export default Geoman;