
export const loader = (function(){

  function checkData(data) {
    if(data.length === 0) return 0;

    return true;
  };

  function getData(key) {

    var data = null;

    return new Promise((resolve, reject) => {
      try {
          data = JSON.parse(window.localStorage.getItem(key));
          if(data) {
            resolve(data);
          }
          else {
            reject();
          }
      }
      catch (e) {
          reject();
      }
    })
  };

  function saveData(key, data) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(data));
        reject({ status: 'ok' });
      }
      catch (e) {
        console.log(e);
        reject({ status: 'warning' });
      }
    });
  };

  return {
    getData,
    saveData,
    checkData
  }

}());
