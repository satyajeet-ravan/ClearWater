//LOAD THEN .env VARIABLES
import dotenv from "dotenv"
dotenv.config({
    path: "../../.env"
});

//DB CONNECTION
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_PROJECT_URI,
    process.env.SUPABASE_ANON_KEY
);

//FETCH THE OPENCAGE API
const API_KEY = process.env.OPENCAGE_API_KEY;

async function geocoding(query){
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if(!data.results.length) return null;

    return {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng
    };
}


const delay = (ms) => new Promise(res => setTimeout(res, ms));

const cleanString = (str) => {
    return str
    .replace(/\(.*?\)/g, "") // remove brackets
    .replace(/RIVER/gi, "")
    .replace(/AT/gi, "")
    .replace(/DOWN-STREAM.*?/gi, "") // remove industrial text
    .replace(/TEXTILE.*?/gi, "")
    .replace(/DISTRICT/gi, "")
    .replace(/\./g, "")
    .trim();
};

async function getCoords(i){
    const district = i["District"];
    const state = i["State Name"];

    const queries = [
        `${cleanString(i["Monitoring Location"])}, ${district}, ${state}, India`,
        `${district}, ${state}, India`
    ];

    for(const q of queries){
        const coord = await geocoding(q);
        if(coord) return coord;
    }
    return null;

}
async function start(){
const { data : rows } = await supabase
.from("water_quality_data")
.select('id, "Monitoring Location", "District", "State Name"')
.is("lattitude", null)

for(const i of rows){
    const coords = await getCoords(i);

    if(coords){
        await supabase
        .from("water_quality_data")
        .update({
            lattitude: coords.lat,
            longitude: coords.lng
        }).
        eq("id", i.id)
        console.log(i.id);
    }
    else{
        console.error("unable to update");
    }
    await delay(1000) //Due to rate Limit of OpenCage 
}
}

start();