// const request = require("request");
// const cfg = require("../config");
// const auth =
//   "Basic " +
//   Buffer.from("IFSTG:F14vX558pgfAYn/HYAY8j7JYDaoCa8iB").toString("base64"); // obtener la authorization en el formato adecuado
// const options = {
//   method: "PUT",
//   // 'url': 'http://IP Nuestro Ambiente:8080/rest_api/v1.0.0/HMM_IWS_LEADS/ID del Registro'
//   url:
//     "http://34.207.118.135:8080/rest_api/v1.0.0/HMM_IWS_LEADS/604058eb8484d7b16ec55767",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: auth,
//   },
//   body: JSON.stringify({
//     INTERFACE_LOG_IWS: "Z",
//     INTERFACE_MESSAGE: "PRUEBA PUT",
//   }),
// };

// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
