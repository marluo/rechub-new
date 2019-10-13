const recruiter = (req, res, next) => {
  //gör om till string för att vara säker,
  //kanske inte behöves
  if (req.role !== "recruiter") {
    return res.json({ msg: "only recruiters have access to this" });
  }
};

module.exports = recruiter;
