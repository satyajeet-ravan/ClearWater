import { useMap } from "react-leaflet";
import { useEffect } from "react";

function AutoZoom({ data, selectedRiver }) {
  const map = useMap();

  useEffect(() => {
  if (!data || data.length === 0) return;

  const validData = data.filter(d => !isNaN(d.lattitude) && !isNaN(d.longitude));

  if(validData.length === 0) return;

  const points = validData
    .map(d => [
      Number(d.lattitude),
      Number(d.longitude)
    ]);

    console.log(points);

    const selected = validData.find(d => d["Monitoring Location"] === selectedRiver);
    console.log(selected);
    

  setTimeout(() => {
    map.invalidateSize();


    if (points.length === 1) {
      map.flyTo(points[0], 10, { duration: 1.2,
        easeLinearity: 0.25
       });
    }
    if(selectedRiver){
      const focuspoint = [
        Number(selected.lattitude),
        Number(selected.longitude)
      ];
       map.flyTo(focuspoint, 10, {
        duration: 1.2,
        easeLinearity: 0.25
       });
       return;
    }
    
    else {
      map.fitBounds(points, {
        padding: [50, 50],
        animate: true
      });
    }
  }, 100);
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [data, selectedRiver]);

console.log("Effect Triggered");

  return null;
}

export default AutoZoom;