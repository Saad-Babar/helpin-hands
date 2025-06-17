'use client'
import { useState, useEffect } from 'react';

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

    // Fetch states when selectedCountry changes
    useEffect(() => {
        if (!selectedCountry) {
            setStates([]);
            return;
        }
        const fetchStates = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: selectedCountry.label || selectedCountry.value })
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
        };
        fetchStates();
    }, [selectedCountry]);

    // Fetch cities when selectedCountry and selectedState change
    useEffect(() => {
        if (!selectedCountry || !selectedState) {
            setCities([]);
            return;
        }
        const fetchCities = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        country: selectedCountry.label || selectedCountry.value,
                        state: selectedState.label || selectedState.value
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
        };
        fetchCities();
    }, [selectedCountry, selectedState]);

    return {
        countries,
        states,
        cities,
        loading,
        error
    };
};

export default useLocationData;