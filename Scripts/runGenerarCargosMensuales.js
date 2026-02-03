const { generarCargosMensuales } = require('./generarCargosMensuales');

(async () => {
  try {
    await generarCargosMensuales(1);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();