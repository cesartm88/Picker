import axios from 'axios';
import env from 'react-native-config';

const CONFIG = {
    medicsslapi: env.API_HOST,
    static: env.UPLOAD_HOST,
    debug: true
}

function createClient(url, headers) {
    const { debug } = CONFIG;
    const client = axios.create({
        baseURL: url,
        headers
    });

    if (debug) {
        const getUrl = properties => {
            return properties.url;
        }

        // Intercept all request
        client.interceptors.request.use(
            interRequest => {
                console.log(
                    "\n\n----------------------------------------------------------\n",
                    `    [${interRequest.method.toUpperCase()}] ${url}${getUrl(interRequest)}`,
                    "\n----------------------------------------------------------"
                );
                return interRequest;
            },
            error => Promise.reject(error),
        );

        // Intercept all responses
        client.interceptors.response.use(async interResponse => {
            const { data, headers } = interResponse.config;
            console.log(
                `${getUrl(interResponse.config)} response with status ${interResponse.status}\n`,
                "SendData", data, "\n",
                "Headers", headers, "\n",
                "Env :", env.API_HOST, "\n"
            );
            console.log("____env___:",env);
            return interResponse;
        }, error => {
            console.log(error);
            if(error.response){
                const { data, headers } = error.response.config;
                console.log(
                    `\n${getUrl(error.response.config)} response with status ${error.response.status}\n`,
                    "SendData", data, "\n",
                    "Headers", headers, "\n",
                    "Env :", env.API_HOST, "\n"
                );
                console.log("____env___:",env);
            }else{
                console.log(
                    "Env :", env.API_HOST, "\n"
                );
                console.log("____env___:",env);
                alert(JSON.stringify(error));
            }
            
        return Promise.reject(error);
        });
    }

    return client;
}

const api = createClient(CONFIG.medicsslapi, {
    "content-type": "application/json",
});

// Only for list files
const api_static = createClient(CONFIG.static, {
    "content-type": "application/json",
});

export {
    api,
    api_static
};