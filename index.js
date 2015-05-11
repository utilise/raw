module.exports = function raw(selector, context){
  return (context ? context : document).querySelector(selector)
}