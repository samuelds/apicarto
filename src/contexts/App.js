import { createContext, useState } from "react";

const AppContext = createContext({
    insee: null,
    setInsee: () => { },
    bounds: null,
    setBounds: () => { },
    zoom: null,
    setZoom: () => { }
});

const AppProvider = ({ children }) => {

        const [insee, setInsee] = useState(null);
        const [bounds, setBounds] = useState([]);
        const [zoom, setZoom] = useState(null);

        return (
            <AppContext.Provider value={{
                insee,
                setInsee,
                bounds,
                setBounds,
                zoom,
                setZoom
            }}>
                {children}
            </AppContext.Provider>
        );
}

export {
    AppContext,
    AppProvider
}