const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "james-01") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Api_key_no_es_correcto" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "Algo_ocurrio_en_el_custom_header" });
  }
};
module.exports = customHeader;
