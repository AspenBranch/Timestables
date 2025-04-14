//initialise
$('#multiplyContainer').hide();
$('#countingContainer').hide();
$('#answersContainer').hide();
$('#againButton').hide();
var answers = [];

$("#hover").hover(function(){
    $("#hoverMessage").hide();
    $("#hoverMessage").show();
});

//recursive function to repeatedly display random times tables
function getRandom(min, max, remaining, time) {
  //generate another if remaining else return to start screen
  if(remaining > 0) {
    //document.getElementById("tick").play();
    
    var multiplesArray = $('#multiples').val().split(",");
    multiplesArray[Math.floor(Math.random() * multiplesArray.length)];
    
    var left = Math.floor(Math.random() * (max - min + 1)) + min;
    if($('#multiples').val() == ''){
      var right = Math.floor(Math.random() * (max - min + 1)) + min;}
    else{
      var right = multiplesArray[Math.floor(Math.random() * multiplesArray.length)];
    }
    $('#leftNumber').text(left);
    $('#rightNumber').text(right);
    
    var color = randomColor({luminosity: 'dark'});
    $('body').css('background-color', color);
    answers.push({left: left, right: right, color: color});
    
    var time =  $('#time').val();
    $('.animate').css('animation-duration', time+'s');
  
    setTimeout(getRandom, time*1000, min, max, remaining-1, time*1000);
  }
  else {
    //document.getElementById("explosion").play();
    $('body').css('background-color', 'white');
    $('#multiplyContainer').hide();
    $('#answersContainer').show();
  }
}

$('#startButton').click(function() {
  $('#startContainer').hide();
  
  var counting = $('#counting');
  var countingContainer = $('#countingContainer');
  
  //countdown from 3 then start times tables
  var counter = 4;//3;
  var countdown = setInterval(function() {
    countingContainer.show();
    if (counter == 0) {
      countingContainer.hide();
      clearInterval(countdown);
      
      var min = parseInt($('#minimum').val());
      var max =  parseInt($('#maximum').val());
      var quant =  parseInt($('#quantity').val());
      var time =  parseInt($('#time').val())*1000;
      //check valid entries here

      $('#multiplyContainer').show();
      getRandom(min, max, quant, time);
    }
    if (counter == 1){
      counting.text('GO!');
      --counter;
    }
    else{
      counting.text(--counter);}
  }, 1200);
});


$('#answersButton').click(function(){
  for(var answer of answers) {
    $('#answersTable').append('<tr bgcolor="'+answer.color+'"><td class="leftAnswer">'+answer.left+'</td><td class="times">\u00D7</td><td class="rightAnswer">'+answer.right+'</td><td class="equals">=</td><td class="actualAnswer">'+(answer.left*answer.right)+'</td></tr>');
  }
  $('#answersButton').hide();
  $('#againButton').show();
});

$('#againButton').click(function(){
  $('#againButton').hide();
  $('#answersContainer').hide()
  $('#answersTable').empty();
  $('#answersButton').show();
  $('#startContainer').show();
  answers = [];
});

//$('#startButton').click();
