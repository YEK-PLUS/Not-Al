function getFile(theUrl,name){
  if(theUrl == undefined && name != undefined){
    return localStorage[name]
  }
  if(theUrl != undefined){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    if(name != undefined){
      localStorage[name]=xmlHttp.responseText;
    }
    return xmlHttp.responseText;
  }



}
function createListElement(data){
  let a = document.createElement('div');
      a.className = 'item';
      a.setAttribute('data',data)

  let b = document.createElement('span');
      b.innerText = data;

  let c = document.createElement('i');
      c.className = 'fa fa-arrow-right';

  a.appendChild(b);
  a.appendChild(c);

  return a;
}
