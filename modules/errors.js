module.exports = function(error) {
  if(error.includes("code 1:")) {
    return "Error code 1: No such file or directory (usually means you have to create the directory first!)";
  }
}