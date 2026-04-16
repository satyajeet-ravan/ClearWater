import { useState, useEffect } from "react";

const selectClass =
  "w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow appearance-none";

function Dropdown({ setState, setDistrict, setRiver }) {

    const [states, showStates] = useState([]);
    const [state, selectState] = useState("");

    const [district, showdistrict] = useState([]);
    const [districts, selectDistricts] = useState("");

    const [rivers, showRivers] = useState([]);

    const handleStateChange = (value) => {
        selectState(value);
        setState(value);
        showdistrict([]);
        selectDistricts("");
        showRivers([]);
    };

    const handleDistrictChange = (value) => {
        selectDistricts(value);
        setDistrict(value);
        showRivers([]);
    };

    const handleRiverChange = (value) => {
        setRiver(value);
    };

    useEffect(() => {
        fetch("/api/states")
            .then(res => res.json())
            .then(showStates);
    }, []);

    useEffect(() => {
        if (!state) return;

        fetch(`/api/districts/${encodeURIComponent(state)}`)
            .then(res => res.json())
            .then(showdistrict);
    }, [state]);

    useEffect(() => {
        if (!state || !districts) return;

        fetch(`/api/rivers?state=${encodeURIComponent(state)}&districts=${encodeURIComponent(districts)}`)
            .then(res => res.json())
            .then(showRivers);
    }, [state, districts]);

    return (
        <>
            <select onChange={(e) => handleStateChange(e.target.value)} value={state} className={selectClass}>
                <option value="">Select State</option>
                {states.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                ))}
            </select>

            <select onChange={(e) => handleDistrictChange(e.target.value)} value={districts} className={selectClass}>
                <option value="">Select District</option>
                {district.map((item, i) => (
                    <option key={i} value={item["District"]}>
                        {item["District"]}
                    </option>
                ))}
            </select>

            <select onChange={(e) => handleRiverChange(e.target.value)} className={selectClass}>
                <option value="">Select Monitoring Location</option>
                {rivers.map((item, i) => (
                    <option key={i} value={item["Monitoring Location"]}>
                        {item["Monitoring Location"]}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Dropdown;
