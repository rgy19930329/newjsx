/**
 * @desc 驼峰命名转中划线
 * @param {String} name 
 * @return {String}
 */
const camal2line = (name) => {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

exports.camal2line = camal2line;