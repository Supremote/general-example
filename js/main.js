var socket = io("https://www.supremote.com");

var pageStatus = {  
   "mainHeader":"Supremote Test",
   "fontColor":"Black",
   "font": "Helvetica",
   "fontSize": 14,
   "fruit":"Apple",
   "limit":10,
   "colorSectionEnabled":false,
   "table":5
};

var fruits = {
  "Apple": {
    "img": "img/apple.png",
    "description": "Apples are the quintessential fruit. An apple a day keeps the doctor away!"
  },
  "Grape": {
    "img": "img/grape.png",
    "description": "My favorite fruit is grapes. Because with grapes, you always get another chance. 'Cause, you know, if you have a crappy apple or a peach, you're stuck with that crappy piece of fruit. But if you have a crappy grape, no problem - just move on to the next."
  },
  "Pear": {
    "img": "img/pear.png",
    "description": "It is, in my view, the duty of an apple to be crisp and crunchable, but a pear should have such a texture as leads to silent consumption."
  },
  "Pineapple": {
    "img": "img/pineapple.png",
    "description": "Q: When is an apple not an apple? A: When it’s a pineapple!"
  }
};



var fonts = {

  "Helvetica":  "Helvetica, Arial, sans-serif",
  "Times": "'Times New Roman', 'Times', serif",
  "Comic Sans / Cursive": "'Comic Sans MS', cursive",
  "Courier": "Courier"
};

socket.on("connect", function(data) {
  socket.emit("join", "app_general_example");
});

socket.on("join", function(data) {
  pageStatus = data;
  console.log(pageStatus["mainHeader"]);
  processStatus();
});

socket.on("update", function(data) {
  pageStatus = data;
  processStatus();
});

function processStatus() {
  console.log(pageStatus);
  $('#mainHeader').text(pageStatus.mainHeader);

  var fruit = fruits[pageStatus.fruit];
  $('#fruit-name').text(pageStatus.fruit);
  $('#fruit-img').attr('src', fruit.img);
  $('#fruit-quote').text(fruit.description);

  if(!pageStatus.colorSectionEnabled) {
    $('#colors-content').hide();
    $('#colors-header').html("This Section is Disabled! <small>Use the app to enable it!</small>");
  } else {
    $('#colors-content').show();
    $('#colors-header').html("Fonts <small>Well done!</small>");
  }

  $('#passage').css('color', pageStatus.fontColor.toLowerCase());
  $('#passage').css('font-size', pageStatus.fontSize);
  $('#passage').css('font-family', fonts[pageStatus.font]);

   $('#multiplication-table').empty();

      for(var i = 1; i <= pageStatus.limit; i++) {
        $('#multiplication-table').append(
          '<tr><td>' + pageStatus.table + ' &times; ' + i + ' </td><td>=</td><td> ' + '</td><td><b>' + pageStatus.table * i + '</b></td></tr>'
        );
    }
}