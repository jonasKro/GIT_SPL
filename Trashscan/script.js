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

  const markers = [
    {
      lat: 47.401391236282066,
      lng: 9.751958834731964,
      title: "Start",
      icon: "blue",
    },
    {
      lat: 47.4125,
      lng: 9.74355,
      title: "Marker 1",
      icon:
        "https://developer.here.com/documentation/maps/topics/markers/img/red-dot.png",
    },
    {
      lat: 47.418,
      lng: 9.747,
      title: "Marker 3",
      icon:
        "https://developer.here.com/documentation/maps/topics/markers/img/red-dot.png",
    },
    {
      lat: 47.42,
      lng: 9.749,
      title: "Marker 4",
      icon:
        "https://developer.here.com/documentation/maps/topics/markers/img/red-dot.png",
    },
    { lat: 47.422, lng: 9.751, title: "Marker 5", icon: "green" },
    { lat: 47.424, lng: 9.753, title: "Marker 6", icon: "green" },
    {
      lat: 47.409602701097,
      lng: 9.724056374784443,
      title: "Marker 8",
      icon: "green",
    },
    {
      lat: 47.41000393653498,
      lng: 9.743496003903328,
      title: "Marker 7",
      icon: "red",
    },
    {
      lat: 47.42478185167308,
      lng: 9.726834342681482,
      title: "Marker 10",
      icon: "red",
    },
    {
      lat: 47.43410765032678,
      lng: 9.741204591191707,
      title: "Marker 11",
      icon: "green",
    },
    {
      lat: 47.422068581745755,
      lng: 9.748640359570645,
      title: "Marker 12",
      icon: "red",
    },
  ];

  /*  markers.forEach((markerInfo) => {
    const icon = new H.map.Icon(
      `https://developer.here.com/documentation/maps/topics/markers/img/${markerInfo.icon}-dot.png`
      
    );
    const marker = new H.map.Marker(
      { lat: markerInfo.lat, lng: markerInfo.lng },
      { icon: icon }
    );
    map.addObject(marker);
  });*/
}

initMap();
