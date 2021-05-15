import axios from "axios";
import { debounce } from "debounce";

// schemas
import LocationHit from "~schema/LocationHitSchema";

export const locationSearchHandler = debounce(
  async (e, setResults, setLoading, hereToken) => {
    const input = e.target.value;

    if (input.replace(" ", "").length > 0) {
      try {
        setLoading(true);
        setResults([]);
        const res = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autosuggest?q=${input}&in=countryCode:IND&at=-13.163068,-72.545128`,
          {
            headers: {
              Authorization: "Bearer " + hereToken,
            },
          }
        );
        const toInsert: LocationHit[] = [];

        (res.data.items as LocationHit[]).forEach((location) => {
          if (location.position || location.access?.length > 0) {
            toInsert.push(location);
          }
        });
        setResults(toInsert);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  },
  500
);

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
