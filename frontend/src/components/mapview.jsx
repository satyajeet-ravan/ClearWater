import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});


import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import AutoZoom from "../helpers/zooming.helper";
import { useRef } from "react";

function MapView({ state, district, river }) {
  const [data, setData] = useState([]);
  const markerRef = useRef({});

  useEffect(() => {
    if (!state || !district) return;

    let url = `/api/rivers?state=${state}&districts=${district}`;
    if (river) url += `&river=${river}`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        {
          setData(res)
        })
      .catch(console.error);

  }, [state, district, river]);

  useEffect(() => {
    if(!river || data.length === 0) return;

    const label = markerRef.current[river];
    if(label){
    label.openPopup();
    }
  }, [river, data]);

  

  return (
    <MapContainer
      key={`${state}-${district}-${river}`}
      center={[19.0760, 72.8777]}
      zoom={5}
      style={{ height: "1000px", width: "1000px" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AutoZoom data={data} selectedRiver={river}/>

      {data.map((item) => {
        if (!item.lattitude || !item.longitude) return null;
        const key = item["Monitoring Location"];
        return (
          <Marker 
          key={key}
          position={[Number(item.lattitude), Number(item.longitude)]}
          ref={(ref) => {
            if(ref){
              markerRef.current[key] = ref;
            }
          }}>
            <Popup>
              <strong>{key}</strong><br />
              <p>District: {district}</p>
              <p>State: {state}</p>
            </Popup>
            </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;