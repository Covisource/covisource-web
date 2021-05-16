import axios from "axios";
import { debounce } from "debounce";
import Cookies from "js-cookie";

// schemas
import LocationHit from "~schema/LocationHitSchema";

export const locationSearchHandler = debounce(async (e, hereToken) => {
  const input = e.target.value;
  let toReturn: LocationHit[] = [];

  if (input.replace(" ", "").length > 0) {
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
          toReturn.push(location);
        }
      });
      return toReturn;
    } catch (err) {
      console.error(err);
    }
  } else {
    return [];
  }
}, 500);

export const resourceSearchHandler = debounce(
  async (e, setResults, setLoading) => {
    const input = e.target.value;

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
        const toInsert = [];

        res.data.forEach((resource) => {
          toInsert.push(resource);
        });
        setResults(toInsert);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      getAllResources(setResults);
    }
  },
  500
);

export const getAllResources = async (setResults) => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/findCategory`)
    .then((res) => res.data);

  if (!res.success) {
    return console.error(res.message);
  }

  const resources = [];

  res.data.forEach((resource) => {
    resources.push(resource);
  });

  setResults(resources);
};

export const autoDetectLocation = ({ setInputValue }) => {
  if ("geolocation" in navigator) {
    document.getElementById("homeLocationSearchPopup").style.display = "none";

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
    });
  } else {
    console.log("Auto location is not available.");
  }
};
