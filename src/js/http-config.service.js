/**
 * Created by Mooqi on 6-2.
 */


  var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
  var baseUrl = 'http://192.168.0.123:8080/';
  

  function get(url,option=null) {
    if(option){
      let paramsArray = [];
      //拼接参数  
      Object.keys(option).forEach(key => paramsArray.push(key + '=' + option[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&');
      } else {
          url += '&' + paramsArray.join('&');
      }
    }
    return fetch(`${baseUrl + url}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return handleResponse(`${baseUrl + url}`, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${baseUrl + url} . Message = ${err}`);
      return {error: {message: 'Request failed.'}};
    })
  }

  function post(url, data) {
    return fetch(`${baseUrl + url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }).then(response => {
      return handleResponse(`${baseUrl + url}`, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${baseUrl + url} . Message = ${err}`);
      return {error: {message: 'Request failed.'}};
    })
  }

  function handleResponse(url, response) {
    if (response.status < 500) {
      if(response.status === 200){
        return response.json();
      }else{
        console.error(`网络错误: ${response.status}`);
      }
    } else {
      console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
      return {error: {message: 'Request failed due to server error '}};
    }
  }

module.exports.post = post;
module.exports.get = get;
