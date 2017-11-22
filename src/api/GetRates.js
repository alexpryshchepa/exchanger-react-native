export default function GetRates(base, cb, error) {
  let url = 'http://api.fixer.io/latest?base=' + base;
  fetch(url)
    .then(response => {
    if (response.status === 200) {
      let data = JSON.parse(response._bodyInit);
      return data;
    } else {
      error();
    }
  }).then(function (data) {
    let names = [];
    for (let key in data.rates) {
      names.push(String(key));
    }
    cb(data, names);
  })
}