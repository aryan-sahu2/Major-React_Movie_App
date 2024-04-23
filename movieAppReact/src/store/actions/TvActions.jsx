export { removeTV } from "../reducers/TVSlice";
import axios from "../../utils/axios";
import { loadTV } from "../reducers/TVSlice";

export const asyncloadTV =  (id) =>  async(dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let allDetails={
        detail: detail.data,
        externalId: externalId.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations.map((l)=>l.english_name),
        videos: videos.data.results.find((m)=>m.type ==="Trailer"),
        watchproviders: watchproviders.data.results.IN
    }
    dispatch(loadTV(allDetails))
  } catch (err) {
    console.log(err);
  }
};
