app.creator = {}

app.creator.listElement = function(data) {
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
