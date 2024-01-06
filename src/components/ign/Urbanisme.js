import React, { useContext, useEffect } from 'react';
import L from 'leaflet';
import { AppContext } from "../../contexts/App";
import { useLeafletContext } from "@react-leaflet/core";
import axios from "axios";

// https://apicarto.ign.fr/api/gpu/zone-urba?partition=
const ZoneUrbanisme = () => {

    const app = useContext(AppContext);
    const context = useLeafletContext();

    useEffect(() => {

        if (app.bounds.length === 0 || app.zoom < 15) {
            return;
        }

        const geom = JSON.stringify({
            "type": "Polygon",
            "coordinates": [app.bounds]
        });

        try {
            axios.get(
                'https://apicarto.ign.fr/api/gpu/zone-urba',
                {
                    params: {
                        geom: geom,
                    }
                })
                .then(response => {

                    // Reset map
                    context.map.eachLayer(layer => {
                        if (layer.options.pane === 'overlayPane') {
                            context.map.removeLayer(layer);
                        }
                    });

                    const data = response.data;
                    const features = data.features;

                    features.forEach(feature => {
                        const layer = L.geoJSON(feature);
                        const properties = feature.properties;
                        // set popup content by feature properties
                        layer.bindPopup(`
                            <h2>${properties.libelle}</h2>
                            <p>
                                libelong: ${properties.libelong}<br />
                                partition : ${properties.partition}<br /> 
                                nomfic : ${properties.nomfic}<br />
                                datvalid : ${properties.datvalid}<br />            
                            </p>
                        `);
                        layer.addTo(context.map);
                    });

                });
        } catch (error) {
            console.error(error);
        }

    }, [app.bounds]);

};

const SecteurCarteCommunale = () => {

};

export {
    ZoneUrbanisme,
    SecteurCarteCommunale
}