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
      icon: new H.map.Icon(
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      ),
    },
    {
      lat: 47.4125,
      lng: 9.74355,
      title: "Marker 1",
      icon: new H.map.Icon(
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      ),
    },
    {
      lat: 47.418,
      lng: 9.747,
      title: "Marker 3",
      icon: new H.map.Icon(
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      ),
    },
    // Weitere Marker hier hinzufügen
  ];

  markers.forEach((markerInfo) => {
    const marker = new H.map.Marker(
      { lat: markerInfo.lat, lng: markerInfo.lng },
      { icon: markerInfo.icon }
    );
    map.addObject(marker);
  });
}

initMap();
