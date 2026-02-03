
module.exports = (req, res, next) => {
  const host = req.headers.host; // ejemplo: "club1.miservicio.com:3000"
  const baseDomain = process.env.BASE_DOMAIN || 'miservicio.com';

  if (host.endsWith(baseDomain)) {
    const subdomainPart = host.replace(`.${baseDomain}`, '').split(':')[0];
    if (subdomainPart && subdomainPart !== 'www') {
      const clubId = parseInt(subdomainPart.replace(/\D/g, ''), 10); // extrae número si es club1, club2, etc.
      if (!isNaN(clubId)) {
        req.clubId = clubId;
      }
    }
  }
  next();
};
