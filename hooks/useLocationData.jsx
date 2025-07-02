'use client'
import { useState, useEffect, useCallback } from 'react';

const useLocationData = (selectedCountry, selectedState) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountry = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const transformedCountries = data.data.map(country => ({
                    value: country.name,
                    label: country.name,
                    img: country.flag
                }));
                setCountries(transformedCountries);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCountry();
    }, []);

    // Fetch states function - exposed for manual calls
    const fetchStates = useCallback(async (countryName) => {
        if (!countryName) {
            setStates([]);
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: countryName })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const transformedStates = data.data.states.map(state => ({
                value: state.name,
                label: state.name
            }));
            setStates(transformedStates);
        } catch (err) {
            setError(err.message);
            setStates([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch cities function - exposed for manual calls
    const fetchCities = useCallback(async (countryName, stateName) => {
        if (!countryName || !stateName) {
            setCities([]);
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: countryName,
                    state: stateName
                })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const transformedCities = data.data.map(city => ({
                value: city,
                label: city
            }));
            setCities(transformedCities);
        } catch (err) {
            setError(err.message);
            setCities([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch states when selectedCountry changes (for automatic updates)
    useEffect(() => {
        if (!selectedCountry) {
            setStates([]);
            return;
        }
        const countryName = selectedCountry.label || selectedCountry.value;
        fetchStates(countryName);
    }, [selectedCountry, fetchStates]);

    // Fetch cities when selectedCountry and selectedState change (for automatic updates)
    useEffect(() => {
        if (!selectedCountry || !selectedState) {
            setCities([]);
            return;
        }
        const countryName = selectedCountry.label || selectedCountry.value;
        const stateName = selectedState.label || selectedState.value;
        fetchCities(countryName, stateName);
    }, [selectedCountry, selectedState, fetchCities]);

    return {
        countries,
        states,
        cities,
        loading,
        error,
        fetchStates,
        fetchCities
    };
};

export default useLocationData;