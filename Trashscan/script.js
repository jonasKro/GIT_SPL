function SimpleTSP() {
  this.solve = function (positions) {
    if (positions.length <= 2) {
      return positions;
    }

    let shortestPath = null;
    let shortestDistance = Number.MAX_VALUE;

    // Generate all permutations of positions (excluding the first position)
    const permutations = generatePermutations(positions.slice(1));

    for (const permutation of permutations) {
      const fullPath = [positions[0], ...permutation, positions[0]]; // Ensure the route starts and ends at the starting point
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
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4125, lng: 9.74355 },
    zoom: 13,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  // Your markers code remains unchanged.

  // Create an array of markers with their positions and custom titles
  let red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  let green = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  let blue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  const markers = [
    {
      lat: 47.401391236282066,
      lng: 9.751958834731964,
      title: "Start",
      icon: blue,
    },
    { lat: 47.4125, lng: 9.74355, title: "Marker 1", icon: red },
    //  { lat: 47.415, lng: 9.745, title: "Marker 2", icon: green },
    { lat: 47.418, lng: 9.747, title: "Marker 3", icon: red },
    { lat: 47.42, lng: 9.749, title: "Marker 4", icon: red },
    { lat: 47.422, lng: 9.751, title: "Marker 5", icon: green },
    { lat: 47.424, lng: 9.753, title: "Marker 6", icon: green },
    {
      lat: 47.409602701097,
      lng: 9.724056374784443,
      title: "Marker 8",
      icon: green,
    },
    {
      lat: 47.41000393653498,
      lng: 9.743496003903328,
      title: "Marker 7",
      icon: red,
    },
    /*    {
      lat: 47.4107193803123,
      lng: 9.733852370986181,
      title: "Marker 9",
      icon: green,
    }, */
    {
      lat: 47.42478185167308,
      lng: 9.726834342681482,
      title: "Marker 10",
      icon: red,
    },
    {
      lat: 47.43410765032678,
      lng: 9.741204591191707,
      title: "Marker 11",
      icon: green,
    },
    {
      lat: 47.422068581745755,
      lng: 9.748640359570645,
      title: "Marker 12",
      icon: red,
    },
  ];

  // Loop through the markers array and add them to the map
  markers.forEach((markerInfo) => {
    const marker = new google.maps.Marker({
      position: { lat: markerInfo.lat, lng: markerInfo.lng },
      map: map,
      title: markerInfo.title,
      icon: markerInfo.icon, // Set the custom icon for each marker
    });
  });

  // Extract the positions of red markers
  const redMarkerPositions = markers
    .filter((markerInfo) => markerInfo.icon === red)
    .map((markerInfo) => ({
      lat: markerInfo.lat,
      lng: markerInfo.lng,
    }));

  // Specify the fixed starting point
  const startingPoint = { lat: 47.401391236282066, lng: 9.751958834731964 };

  // Calculate the most efficient route using the Traveling Salesman Problem solver
  const tsp = new SimpleTSP();
  const optimizedOrder = tsp.solve([startingPoint, ...redMarkerPositions]);

  // Make the blue marker the starting and ending point of the route
  optimizedOrder.unshift(startingPoint);
  optimizedOrder.push(startingPoint);

  // Create waypoints in the optimized order (excluding the starting point, which is now the ending point)
  const waypoints = optimizedOrder
    .slice(1, optimizedOrder.length - 1)
    .map((position) => ({
      location: position,
      stopover: true,
    }));

  // Use the Directions Service to display the optimized route
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true, // Hide the lettered markers
  });

  const request = {
    origin: waypoints[0].location,
    destination: waypoints[waypoints.length - 1].location,
    waypoints: waypoints.slice(1),
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });

  let ammountRed = 0;
  let ammountGreen = 0;
  markers.forEach((markerInfo) => {
    if (markerInfo.icon == red) {
      ammountRed++;
    }
    if (markerInfo.icon == green) {
      ammountGreen++;
    }
  });

  document.getElementById("redBins").innerHTML =
    "<div class='red'>" + ammountRed + "</div>" + "&nbsp;&nbsp;bins are full.";
  document.getElementById("greenBins").innerHTML =
    "<div class='green'>" +
    ammountGreen +
    "</div>" +
    "&nbsp;&nbsp;bins aren't full.";
  document.getElementById("totalBins").innerHTML =
    "<div class='total'>" +
    (ammountGreen + ammountRed) +
    "</div>" +
    "&nbsp;&nbsp;active bins.";

  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);

      // Extract the route details from the response
      const route = response.routes[0]; // Assuming there's only one route
      const legs = route.legs; // Get the legs of the route

      let totalDistance = 0;
      let totalTime = 0;

      // Calculate the total distance and time from all legs
      for (let i = 0; i < legs.length; i++) {
        totalDistance += legs[i].distance.value; // Distance in meters
        totalTime += legs[i].duration.value; // Duration in seconds
      }

      // Convert totalDistance to kilometers
      const distanceInKm = (totalDistance / 1000).toFixed(2); // Convert to 2 decimal places

      // Convert totalTime to hours and minutes
      const hours = Math.floor(totalTime / 3600);
      const minutes = Math.floor((totalTime % 3600) / 60);

      // Display the distance and estimated time on the page
      document.getElementById("distance").innerHTML =
        "Distance: " + distanceInKm + " km";
      document.getElementById("duration").innerHTML =
        "Estimated Time: " + hours + "h " + minutes + "min";
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });
}

// Helper function to check if two positions are equal
function arePositionsEqual(pos1, pos2) {
  return pos1.lat === pos2.lat && pos1.lng === pos2.lng;
}

var today = new Date();
var date =
  today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
var hours = today.getHours();
var minutes = today.getMinutes();

// Add leading zeros if necessary
var hoursString = (hours < 10 ? "0" : "") + hours;
var minutesString = (minutes < 10 ? "0" : "") + minutes;

var time = hoursString + ":" + minutesString;
var dateTime = date + " " + time;

document.getElementById("date").innerHTML = dateTime;
