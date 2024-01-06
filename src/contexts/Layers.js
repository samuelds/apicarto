import { createContext, useState } from "react";

const LayersContext = createContext({
    layers: [],
    addLayer: () => { },
    removeLayer: () => { },
    toggleLayer: () => { },
    setLayers: () => { },
    resetLayers: () => { }
});

const LayersProvider = ({ children }) => {

        const [layers, setLayers] = useState([]);

        const addLayer = (layer) => {
            setLayers([...layers, layer]);
        }

        const removeLayer = (layer) => {
            setLayers(layers.filter(l => l !== layer));
        }

        const toggleLayer = (layer) => {
            if (layers.includes(layer)) {
                removeLayer(layer);
            } else {
                addLayer(layer);
            }
        }

        const resetLayers = () => {
            setLayers([]);
        }

        return (
            <LayersContext.Provider value={{
                layers,
                addLayer,
                removeLayer,
                toggleLayer,
                setLayers,
                resetLayers
            }}>
                {children}
            </LayersContext.Provider>
        );
}

export {
    LayersContext,
    LayersProvider
};
