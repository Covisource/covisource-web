import axios from "axios";
import { debounce } from "debounce";
import Cookies from "js-cookie";

// schemas
import LocationHit from "~schema/LocationHitSchema";

export const locationSearchHandler = debounce(
  async ({ input, setLoading, setResults, hereToken }) => {
    let results = [];

    if (input.replace(" ", "").length > 0) {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autosuggest?q=${input}&in=countryCode:IND&at=-13.163068,-72.545128`,
          {
            headers: {
              Authorization: "Bearer " + hereToken,
            },
          }
        );

        (res.data.items as LocationHit[]).forEach((location) => {
          if (location.position || location.access?.length > 0) {
            results.push({
              heading: location.title,
              subHeading: location.address.label,
              coordinates: location.position
                ? {
                    lat: location.position.lat,
                    long: location.position.lng,
                  }
                : {
                    lat: location.access[0].lat,
                    long: location.access[0].lng,
                  },
            });
          }
        });
      } catch (err) {
        console.error(err);
      }
    }

    setResults(results);
    setLoading(false);
  },
  500
);

export const resourceSearchHandler = debounce(
  async ({ input, setResults, setLoading }) => {
    let resources;
    if (input.replace(" ", "").length > 0) {
      try {
        setLoading(true);
        setResults([]);
        const res = await axios
          .get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/category/findCategory?q=${input}`
          )
          .then((res) => res.data);

        if (!res.success) {
          return console.error(res.message);
        }
        resources = [];

        res.data.forEach((resource) => {
          resources.push({
            heading: resource.name,
          });
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      resources = getAllResources();
    }
    
    setLoading(false);
    setResults(resources);
  },
  500
);

export const getAllResources = async () => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/findCategory`)
    .then((res) => res.data);

  if (!res.success) {
    return console.error(res.message);
  }

  const resources = [];

  res.data.forEach((resource) => {
    resources.push({
      heading: resource.name,
    });
  });

  return resources;
};

export const autoDetectLocation = ({
  setInputValue,
  setIsVisible,
  setLoading,
}) => {
  if ("geolocation" in navigator) {
    setIsVisible(false);
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/reverse.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        ).then((res) => res.json());

        Cookies.set("coviUserLocationLat", position.coords.latitude.toString());
        Cookies.set(
          "coviUserLocationLong",
          position.coords.longitude.toString()
        );
        Cookies.set("coviUserLocationDisplay", res.display_name);

        // set the input value to the title of what they select
        setInputValue(res.display_name);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    });
  } else {
    console.log("Auto location is not available.");
  }
};
