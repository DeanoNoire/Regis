

function reimageSvetla(id_svetla, state){
  console.log("Světlo "+id_svetla+" má stav "+state);
  var element = document.getElementById(id_svetla);
  if(state == 'S1'){
    element.classList.add("sviti");
  }
  if(state == 'S0'){
    element.classList.remove("sviti");
  }
  
};


const MLbutton = document.getElementById('MLButton');
MLbutton.addEventListener('click', function(e) {
  fetch('/MLSwitch', {method: 'POST'})
    .then(function(response) {
      if(response.status = 200) {
        
          reimageSvetla("MLButton",response.statusText);
          return;
      }
      throw new Error('Request failed.');

    })
    .catch(function(error) {
      console.log(error);
    });
});

const SLbutton = document.getElementById('SLButton');
SLbutton.addEventListener('click', function(e) {
  fetch('/SLSwitch', {method: 'POST'})
    .then(function(response) {
      if(response.status = 200) {
        
          reimageSvetla("SLButton",response.statusText);
          return;
      }
      throw new Error('Request failed.');

    })
    .catch(function(error) {
      console.log(error);
    });
});




/*
setInterval(function() {

  fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
    })
    .catch(function(error) {
      console.log(error);
    });
}, 1000);
*/