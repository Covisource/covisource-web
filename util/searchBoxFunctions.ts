import axios from "axios";
import { debounce } from "debounce";

// schemas
import HitSchema from "schema/HitSchema";

const locationSearchHandler = debounce(
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
        const toInsert: HitSchema[] = [];

        (res.data.items as HitSchema[]).forEach((location) => {
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

export { locationSearchHandler };
