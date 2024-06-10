function SimpleTSP() {
  this.solve = function (positions) {
    if (positions.length <= 2) {
      return positions;
    }

    let shortestPath = null;
    let shortestDistance = Number.MAX_VALUE;

    const permutations = generatePermutations(positions.slice(1));

    for (const permutation of permutations) {
      const fullPath = [positions[0], ...permutation, positions[0]];
      const totalDistance = calculateTotalDistance(fullPath);

      if (totalDistance < shortestDistance) {
        shortestDistance = totalDistance;
        shortestPath = fullPath;
      }
    }

    return shortestPath;
  };

  function generatePermutations(arr) {
    if (arr.length === 0) {
      return [[]];
    }

    const firstElem = arr[0];
    const rest = arr.slice(1);
    const permutationsWithoutFirst = generatePermutations(rest);
    const allPermutations = [];

    for (const perm of permutationsWithoutFirst) {
      for (let i = 0; i <= perm.length; i++) {
        const newPerm = [...perm.slice(0, i), firstElem, ...perm.slice(i)];
        allPermutations.push(newPerm);
      }
    }

    return allPermutations;
  }

  function calculateTotalDistance(path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += calculateDistance(path[i], path[i + 1]);
    }
    return totalDistance;
  }

  function calculateDistance(pos1, pos2) {
    const lat1 = pos1.lat;
    const lon1 = pos1.lng;
    const lat2 = pos2.lat;
    const lon2 = pos2.lng;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const deltaLon = (Math.PI * (lon2 - lon1)) / 180;

    return (
      6371 *
      Math.acos(
        Math.sin(radLat1) * Math.sin(radLat2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(deltaLon)
      )
    );
  }
}

function initMap() {
  const platform = new H.service.Platform({
    apikey: "N0gPRVOQOQACbb8IUQ8mC9l3P_COW1JxYcWhzWwHJeo",
  });

  const defaultLayers = platform.createDefaultLayers();
  const map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map,
    {
      center: { lat: 47.4125, lng: 9.74355 },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1,
    }
  );

  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  let redIcon = new H.map.Icon("red.png");
  let greenIcon = new H.map.Icon("green.png");
  let blueIcon = new H.map.Icon("blue.png");

  const markers = [
    {
      lat: 47.401391236282066,
      lng: 9.751958834731964,
      title: "Start",
      icon: blueIcon,
    },
    { lat: 47.4125, lng: 9.74355, title: "Marker 1", icon: redIcon },
    { lat: 47.418, lng: 9.747, title: "Marker 3", icon: redIcon },
    { lat: 47.42, lng: 9.749, title: "Marker 4", icon: redIcon },
    { lat: 47.422, lng: 9.751, title: "Marker 5", icon: greenIcon },
    { lat: 47.424, lng: 9.753, title: "Marker 6", icon: greenIcon },
    {
      lat: 47.409602701097,
      lng: 9.724056374784443,
      title: "Marker 8",
      icon: greenIcon,
    },
    {
      lat: 47.41000393653498,
      lng: 9.743496003903328,
      title: "Marker 7",
      icon: redIcon,
    },
    {
      lat: 47.42478185167308,
      lng: 9.726834342681482,
      title: "Marker 10",
      icon: redIcon,
    },
    {
      lat: 47.43410765032678,
      lng: 9.741204591191707,
      title: "Marker 11",
      icon: greenIcon,
    },
    {
      lat: 47.422068581745755,
      lng: 9.748640359570645,
      title: "Marker 12",
      icon: redIcon,
    },
  ];

  markers.forEach((markerInfo) => {
    const marker = new H.map.Marker(
      { lat: markerInfo.lat, lng: markerInfo.lng },
      { icon: markerInfo.icon }
    );
    map.addObject(marker);
  });

  const redMarkerPositions = markers
    .filter((markerInfo) => markerInfo.icon === redIcon)
    .map((markerInfo) => ({ lat: markerInfo.lat, lng: markerInfo.lng }));

  const startingPoint = { lat: 47.401391236282066, lng: 9.751958834731964 };

  const tsp = new SimpleTSP();
  const optimizedOrder = tsp.solve([startingPoint, ...redMarkerPositions]);

  optimizedOrder.unshift(startingPoint);
  optimizedOrder.push(startingPoint);

  const waypoints = optimizedOrder
    .slice(1, optimizedOrder.length - 1)
    .map((position) => ({
      lat: position.lat,
      lng: position.lng,
    }));

  const router = platform.getRoutingService(null, 8);
  const routeRequestParams = {
    mode: "fastest;car",
    representation: "display",
    waypoint0: `geo!${waypoints[0].lat},${waypoints[0].lng}`,
    waypoint1: `geo!${waypoints[waypoints.length - 1].lat},${
      waypoints[waypoints.length - 1].lng
    }`,
    waypoint2: waypoints
      .slice(1)
      .map((waypoint, index) => `geo!${waypoint.lat},${waypoint.lng}`)
      .join("|"),
  };

  router.calculateRoute(routeRequestParams, onSuccess, onError);
}
function onSuccess(result) {
  const route = result.response.route[0];
  const totalDistance = route.summary.distance / 1000; // in kilometers
  const totalTime = route.summary.travelTime / 60 / 60; // in hours
  const distanceInKm = totalDistance.toFixed(2);
  const hours = Math.floor(totalTime);
  const minutes = Math.floor((totalTime - hours) * 60);

  document.getElementById("distance").innerHTML =
    "Distance: " + distanceInKm + " km";
  document.getElementById("duration").innerHTML =
    "Estimated Time: " + hours + "h " + minutes + "min";
}
