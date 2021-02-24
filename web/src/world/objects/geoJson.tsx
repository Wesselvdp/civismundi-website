// export default {
//   "type": "FeatureCollection",
//   "features": [
//     {
//     "type": "Feature",
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         // [ [60.0, 70.0], [50.0, 60.0], [30.0, 60.0], [30.0, 70.0], [60.0, 70.0] ]
//         // [ [0.0, 0.0], [30.0, 0.0], [0.0, 30.0], [30.0, 30.0], [0.0, 0.0] ]
//         [ [30.0, 30.0], [30.0, 0.0], [15.0, 0.0], [0.0, 0.0], [0.0, 30.0], [15.0, 30.0], [30.0, 30.0] ]
//       ]
//     }
//   },
//   {
//     "type": "Feature",
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         // [ [60.0, 70.0], [50.0, 60.0], [30.0, 60.0], [30.0, 70.0], [60.0, 70.0] ]
//         // [ [0.0, 0.0], [30.0, 0.0], [0.0, 30.0], [30.0, 30.0], [0.0, 0.0] ]
//         [ [60.0, 30.0], [60.0, 0.0], [45.0, 0.0], [30.0, 0.0], [30.0, 30.0], [45.0, 30.0], [60.0, 30.0] ]
//       ]
//     }
//   }
//   ]
// }

const LAT_MIN = -180;
const LAT_MAX = 180;
const LNG_MIN = -60;
const LNG_MAX = 60;

const WIDTH = 20;
const HEIGHT = 30;

//

const features = [];

for (let lat = LAT_MIN; lat < LAT_MAX; lat += HEIGHT) {
  const x = { from: lat + 0.25, half: lat + HEIGHT / 2, to: lat + HEIGHT - 0.25 };

  for (let lng = LNG_MIN; lng < LNG_MAX; lng += WIDTH) {
    const y = { from: lng + 0.25, to: lng + WIDTH - 0.25 }

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [ [x.to, y.to], [x.to, y.from], [x.half, y.from], [x.from, y.from], [x.from, y.to], [x.half, y.to], [x.to, y.to] ]
        //[ [TO, TO], [TO, FROM], [HALF, FROM], [FROM, FROM], [FROM, TO], [HALF, TO], [TO, TO] ]
        ]
      }
    })
  }
}

const geoGrid = {
  type: 'FeatureCollection',
  features
};

export default geoGrid;

// const features = [
//   {
//     "type": "Feature",
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         [ [30.0, 30.0], [30.0, 0.0], [15.0, 0.0], [0.0, 0.0], [0.0, 30.0], [15.0, 30.0], [30.0, 30.0] ]
//       ]
//     }
//   },
//   {
//     "type": "Feature",
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         [ [60.0, 30.0], [60.0, 0.0], [45.0, 0.0], [30.0, 0.0], [30.0, 30.0], [45.0, 30.0], [60.0, 30.0] ]
//       ]
//     }
//   }
// ]
