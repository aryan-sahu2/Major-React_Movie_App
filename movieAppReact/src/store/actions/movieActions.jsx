export { removeMovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";

export const asyncloadmovie =  (id) =>  async(dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let allDetails={
        detail: detail.data,
        externalId: externalId.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations.map((l)=>l.english_name),
        videos: videos.data.results.find((m)=>m.type ==="Trailer"),
        watchproviders: watchproviders.data.results.IN
    }
    dispatch(loadMovie(allDetails))
  } catch (err) {
    console.log(err);
  }
};
