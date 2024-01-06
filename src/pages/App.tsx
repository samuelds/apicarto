import React from 'react';

import 'leaflet/dist/leaflet.css';
import '../styles/app.css';

import { AppProvider } from '../contexts/App';
import { Communes } from "../components/gouv/CodesPostaux";
import Map from "../components/Map";

function App() {
    return (
        <AppProvider>
            <Communes />
            <Map />
        </AppProvider>
    );
}

export default App;
