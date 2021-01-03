
$('.lockerCell').on("click", function(){
    $(this).stop().effect("highlight");
    zapisHesla($(this).attr('id'));
});

function zapisHesla(id){
    var cislo = id.replace("locker","")
    dosavadniText = $('#pass').text();
    console.log("Dosavadní text:"+dosavadniText);
    if(dosavadniText == 'Armed' || dosavadniText == 'Triggered' || dosavadniText == 'Unlocked'){
        $('#pass').empty();
        $('#pass').append(cislo);
        $('#passphrase').removeClass("zeleny").removeClass("cerveny");
        
    }

    if(dosavadniText.length < 4){
        $('#pass').append(cislo);
        $('#passphrase').removeClass("zeleny").removeClass("cerveny");
    }
    if(dosavadniText.length == 4){
        $('#pass').append(cislo);
        window.setTimeout(function(){vyhodnotHeslo($('#pass').text())},800);
    }
}

function vyhodnotHeslo(heslo){
    pass = heslo;
    console.log(pass);
    $('#pass').empty();

    fetch('/auth', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({pwd:pass})})
    .then(function(response) {
      if(response.status = 200) {
        
          reimagePassphrase(response.statusText);

          // pokud je Armed
          if(response.statusText == 'Armed'){
              setStateArmedCountdown(10);
          }
 
          return;
      }
      throw new Error('Request failed.');

    })
    .catch(function(error) {
      console.log(error);
    });

}
 
function reimagePassphrase(spravnost){
    $('#pass').text(spravnost)
    if(spravnost == 'Locked' || spravnost == 'Armed'){
        $('#passphrase').addClass("cerveny");
    }
    if(spravnost == 'Unlocked'){
        $('#passphrase').addClass("zeleny");
    }
}

function setStateArmedCountdown(cd){
    var timelimit = cd;
    var timeinit = 0;
    $('#passphrase').addClass('narrow');
    var timer = setInterval(function(){

        if(timeinit>=timelimit){
            clearInterval(timer);
            $('#passphrase').removeClass('narrow');
            setStateArmed();
            return;
        }
        $('#pass').text("Armed-"+(timelimit-timeinit));
        timeinit = timeinit + 1;
    },1000);
}

function setStateArmed(){
    $('#pass').text("Armed")
}




$('#simulDoor').on("click", function(){
    simulaceOtevreniDveri();
});

function simulaceOtevreniDveri(){
    if($('#pass').text() == 'Armed'){

    }
    else {
        console.log('Není stav Armed, nic nedělám');
        return;
    }
}


function setStateTriggeredCountdown(cd){
    var timelimit = cd;
    var timeinit = 0;
    $('#passphrase').addClass('narrow');
    var timer = setInterval(function(){

        if(timeinit>=timelimit){
            clearInterval(timer);
            $('#passphrase').removeClass('narrow');
            setStateArmed();
            return;
        }
        $('#pass').text("Triggered-"+(timelimit-timeinit));
        timeinit = timeinit + 1;
    },1000);
}