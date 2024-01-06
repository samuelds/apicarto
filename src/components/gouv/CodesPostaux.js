/*
    Provider : https://geo.api.gouv.fr/{service}/*?{paramètres}
 */

import React, { useContext, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

import '../../styles/communes.css';
import { AppContext } from "../../contexts/App";

const Communes = () => {

    const [communes, setCommunes] = useState([]);

    const app = useContext(AppContext);

    const onInputChange = (inputValue) => {
        if (inputValue.length < 3) {
            return;
        }

        try {
            axios.get(
                `https://geo.api.gouv.fr/communes`,
                {
                    params: {
                        nom: inputValue,
                        fields: 'code,nom,codesPostaux',
                    }
                })
                .then(response => {
                    const results = response.data.map(commune => {
                        return {
                            label: commune.nom,
                            codesPostaux: commune.codesPostaux,
                            value: commune.code,
                        }
                    });
                    setCommunes(results);
                });
        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (selectedOption) => {
        app.setInsee(selectedOption.value);
    }

    const formatOption = ({ label, codesPostaux, value }, { context }) => {
        return (
            <div>
                <span>{label} ({value})</span>
                {context !== 'value' && <><br/><span>{codesPostaux.join(', ')}</span></> }
            </div>
        );
    };

    return (
        <Select
            className={'selectCommunes'}
            options={communes}
            formatOptionLabel={formatOption}
            onInputChange={onInputChange}
            onChange={onChange}
        />
    );
}

export {
    Communes
};