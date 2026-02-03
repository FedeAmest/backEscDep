const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    console.log('requireRole middleware triggered');
    console.log('req.tipo:', req.tipo);
    try {
      const { tipo } = req;

      if (!tipo) {
        return res.status(401).json({
          message: 'Rol no encontrado en el contexto'
        });
      }

      if (!allowedRoles.includes(tipo)) {
        return res.status(403).json({
          message: 'No tiene permisos para esta acción'
        });
      }

      next();
    } catch (error) {
      console.error('requireRole error:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
};
module.exports = { requireRole };