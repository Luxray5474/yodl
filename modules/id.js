module.exports = function(id) {
  return new Promise((resolve, reject) => {
    if(id == undefined) {
      reject(new Error('missingID'));
    }

    if(id.length > 11) {
      id = id.split('?v=')[1];
      if(id.includes('&t=')) id = id.split('&t=')[0];
      if(id.includes('&list=')) id = id.split('&list=')[0];
      if(id.includes('&start_radio=')) id = id.split('&start_radio=')[0];
    }

    if(id.length != 11) reject(new Error('badID')); else resolve(id);
  })
  
}