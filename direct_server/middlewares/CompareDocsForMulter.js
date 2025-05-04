const compareDocs = async (oldValue, newValue) => {
  let finalValue = [];
  oldValue.map((e, i) => {
    newValue.map((sub_e, sub_i) => {
      if (e.name === sub_e.name) {
        finalValue.push(sub_e);
      }
    });
  });
  return finalValue;
};
module.exports = { compareDocs };
