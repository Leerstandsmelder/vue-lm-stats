import repository from "../api.js";
import { store } from "../../store";

export default {
  

  getStatistic(filter) {
    let filter_query = "";
    if (filter) {
      filter_query = "?filter=" + filter;
    }
    console.log("in get", store);
    let url = "/Movies/groupBy" + filter_query;
    return repository.get(url);
  }

  
};
