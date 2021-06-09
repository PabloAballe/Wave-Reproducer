import  i18n  from '../consts/traslations'

const baseURL="https://pablo970616.pythonanywhere.com/ytapi";


class MusicService {
  getAll( limit, query, lang , reg) {
    return fetch(`${baseURL}/videos/${limit}/${query}-${i18n.t('music')}/${lang}/${reg}/`);

  }

  getAudio(videoid) {
    return fetch(`${baseURL}/audiourltmp/${videoid}/`);
  }
  getVideo(videoid) {
    return fetch(`${baseURL}/videourltmp/${videoid}/`);
  }
  getInfoVideo(videoid){
    return fetch(`${baseURL}/infovideo/${videoid}/`);
  }

}

export default new MusicService();