import { useAttributePreference } from '../common/preferences';

const styleCustom = ({ tiles, minZoom, maxZoom, attribution, glyphs }) => {
  const source = {
    type: 'raster',
    tiles,
    attribution,
    tileSize: 256,
    minzoom: minZoom,
    maxzoom: maxZoom,
  };

  Object.keys(source).forEach((key) => source[key] === undefined && delete source[key]);
  return {
    version: 8,
    sources: {
      custom: source,
    },
    glyphs,
    layers: [
      {
        id: 'custom',
        type: 'raster',
        source: 'custom',
      },
    ],
  };
};

export default () => {
  const mapTilerKey = 'myKey';
  const locationIqKey = 'pk.0f147952a41c555a5b70614039fd148b';
  const bingMapsKey = 'myKey';
  const tomTomKey = 'myKey';
  const hereKey = 'myKey';
  const mapboxAccessToken = 'myKey';
  const myhostname = `${window.location.hostname}`;
  const port = 8484;
  const glyphs = useAttributePreference('glyphs', false)
    ? `http://${myhostname}:${port}/map/fonts/{fontstack}/{range}.pbf`
    : 'https://cdn.traccar.com/map/fonts/{fontstack}/{range}.pbf';

  return [
    {
      id: 'osm',
      title: 'mapOsm',
      style: styleCustom({
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        maxZoom: 19,
        attribution:
          '© <a target="_top" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        glyphs,
      }),
      available: true,
    },
    {
      id: 'locationIqStreets',
      title: 'mapLocationIqStreets',
      style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${locationIqKey}`,
      available: true,
    },
    {
      id: 'locationIqDark',
      title: 'mapLocationIqDark',
      style: `https://tiles.locationiq.com/v3/dark/vector.json?key=${locationIqKey}`,
      available: true,
    },
    {
      id: 'openTopoMap',
      title: 'mapOpenTopoMap',
      style: styleCustom({
        tiles: ['a', 'b', 'c'].map((i) => `https://${i}.tile.opentopomap.org/{z}/{x}/{y}.png`),
        maxZoom: 17,
        glyphs,
      }),
      available: true,
    },
    {
      id: 'carto',
      title: 'mapCarto',
      style: styleCustom({
        tiles: ['a', 'b', 'c', 'd'].map(
          (i) => `https://${i}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png`
        ),
        maxZoom: 22,
        attribution:
          '© <a target="_top" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>',
        glyphs,
      }),
      available: true,
    },
    {
      id: 'googleRoad',
      title: 'mapGoogleRoad',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map((i) => `https://mt${i}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga`),
        maxZoom: 20,
        attribution: '© Google',
        glyphs,
      }),
      available: true,
    },
    {
      id: 'googleSatellite',
      title: 'mapGoogleSatellite',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map((i) => `https://mt${i}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga`),
        maxZoom: 20,
        attribution: '© Google',
        glyphs,
      }),
      available: true,
    },
    {
      id: 'googleHybrid',
      title: 'mapGoogleHybrid',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map((i) => `https://mt${i}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga`),
        maxZoom: 20,
        attribution: '© Google',
        glyphs,
      }),
      available: true,
    },
    {
      id: 'mapTilerBasic',
      title: 'mapMapTilerBasic',
      style: `https://api.maptiler.com/maps/basic/style.json?key=${mapTilerKey}`,
      available: !!mapTilerKey,
      attribute: 'mapTilerKey',
    },
    {
      id: 'mapTilerHybrid',
      title: 'mapMapTilerHybrid',
      style: `https://api.maptiler.com/maps/hybrid/style.json?key=${mapTilerKey}`,
      available: !!mapTilerKey,
      attribute: 'mapTilerKey',
    },
    {
      id: 'bingRoad',
      title: 'mapBingRoad',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map(
          (i) =>
            `https://t${i}.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=en-US&it=G,L&shading=hill&og=1885&n=z`
        ),
        maxZoom: 21,
        glyphs,
      }),
      available: !!bingMapsKey,
      attribute: 'bingMapsKey',
    },
    {
      id: 'bingAerial',
      title: 'mapBingAerial',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map((i) => `https://ecn.t${i}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=12327`),
        maxZoom: 19,
        glyphs,
      }),
      available: !!bingMapsKey,
      attribute: 'bingMapsKey',
    },
    {
      id: 'bingHybrid',
      title: 'mapBingHybrid',
      style: styleCustom({
        tiles: [0, 1, 2, 3].map(
          (i) => `https://t${i}.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=en-US&it=A,G,L&og=1885&n=z`
        ),
        maxZoom: 19,
        glyphs,
      }),
      available: !!bingMapsKey,
      attribute: 'bingMapsKey',
    },
    {
      id: 'tomTomBasic',
      title: 'mapTomTomBasic',
      style: `https://api.tomtom.com/map/1/style/20.0.0-8/basic_main.json?key=${tomTomKey}`,
      available: !!tomTomKey,
      attribute: 'tomTomKey',
    },
    {
      id: 'hereBasic',
      title: 'mapHereBasic',
      style: `https://assets.vector.hereapi.com/styles/berlin/base/mapbox/tilezen?apikey=${hereKey}`,
      available: !!hereKey,
      attribute: 'hereKey',
    },
    {
      id: 'hereHybrid',
      title: 'mapHereHybrid',
      style: styleCustom({
        tiles: [1, 2, 3, 4].map(
          (i) =>
            `https://${i}.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?apiKey=${hereKey}`
        ),
        maxZoom: 20,
        glyphs,
      }),
      available: !!hereKey,
      attribute: 'hereKey',
    },
    {
      id: 'hereSatellite',
      title: 'mapHereSatellite',
      style: styleCustom({
        tiles: [1, 2, 3, 4].map(
          (i) =>
            `https://${i}.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?apiKey=${hereKey}`
        ),
        maxZoom: 19,
        glyphs,
      }),
      available: !!hereKey,
      attribute: 'hereKey',
    },
    {
      id: 'autoNavi',
      title: 'mapAutoNavi',
      style: styleCustom({
        tiles: [1, 2, 3, 4].map(
          (i) => `https://webrd0${i}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`
        ),
        minZoom: 3,
        maxZoom: 18,
        glyphs,
      }),
      available: true,
    },
    {
      id: 'ordnanceSurvey',
      title: 'mapOrdnanceSurvey',
      style: 'https://api.os.uk/maps/vector/v1/vts/resources/styles?key=EAZ8p83u72FTGiLjLC2MsTAl1ko6XQHC',
      transformRequest: (url) => ({
        url: `${url}&srs=3857`,
      }),
      available: true,
    },
    {
      id: 'mapboxStreets',
      title: 'mapMapboxStreets',
      style: styleCustom({
        tiles: [
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`,
        ],
        maxZoom: 22,
        glyphs,
      }),
      available: !!mapboxAccessToken,
      attribute: 'mapboxAccessToken',
    },
    {
      id: 'mapboxOutdoors',
      title: 'mapMapboxOutdoors',
      style: styleCustom({
        tiles: [
          `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`,
        ],
        maxZoom: 22,
        glyphs,
      }),
      available: !!mapboxAccessToken,
      attribute: 'mapboxAccessToken',
    },
    {
      id: 'mapboxSatelliteStreet',
      title: 'mapMapboxSatellite',
      style: styleCustom({
        tiles: [
          `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`,
        ],
        maxZoom: 22,
        glyphs,
      }),
      available: !!mapboxAccessToken,
      attribute: 'mapboxAccessToken',
    },
    {
      id: 'custom',
      title: 'mapCustom',
      style: styleCustom({
        tiles: [`http://${myhostname}:8080/tile/{z}/{x}/{y}.png`],
        maxZoom: 19,
        glyphs,
      }),
      available: true,
    },
  ];
};
