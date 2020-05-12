import { api, api_static } from './HttpClient';

export default {
    enrollment        : data  => api.post("/app/validate"          , data),
    account_link      : data  => api.post("/app/account_link"      , data),
    create_account    : data  => api.post("/app/patient_account"   , data),
    sendMailPassword  : data  => api.post("/app/sendMailPassword"  , data),
    mailUserVerify    : data  => api.post("/app/mailUserVerify"    , data),
    saveUnverifiedUser: data  => api.post("/app/saveUnverifiedUser", data),
    onChangePicture   : data  => api.post(`/app/onChangePicture/${data.uuid}`, data),
    onTraceRoute      : data  => api.post(`/medics/onTraceRoute`   , data,
    {
      headers: {
        'apikey': data.uuid,
      },
    }),
    synchronize_app   : data  => api.post("/user/Synchronize_app"  , data,
    {
      headers: {
        'apikey': data.uuid,
      },
    }),
    getHospitals : (data)     => api.post("user/Search/HospitalsTest/"+data.page, data,
    {
      headers: {
        'apikey': data.uuid,
      },
    }),
    getMedics : (data)     => api.post(`medics/find/${data.page}`,data,
    {
      headers: {
        'apikey': data.uuid,
      },
    }),
    setError : (data)         => api.post("app/add_debug/"+data.uuid, data,
    {
      headers: {
        'apikey': data.uuid,
      }
    }),
    getFilesList : ({ hashcode, uuid }) => api_static.post(`/${hashcode}`,{},
    {
      headers: {
        'Authorization-key': uuid,
      },
    }),
    getPictureFromUrl : ({ URLimages,uuid }) => api_static.post(`/fromUrl`,URLimages,
    {
      headers: {
        'Authorization-key': uuid,
      },
    })
};