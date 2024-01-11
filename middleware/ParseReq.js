const ParseRequiset = async (req, res, next) => {
  const chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    req.rawBody = Buffer.concat(chunks);
    next(); 
  });
};


module.exports = ParseRequiset