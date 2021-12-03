var flicker_store = 0;
//Client app for Carbon.to

$(document).ready(function() {

  //Initialize event-bindings

  conversions = {
    "lightbulb" : {"slug":"lightbulb","name":"Light bulb","carbon":0.00354,"color":"#F29559","unit":"hours lit lightbulb","id":1,"description":"Incandescent light bulb 60W","category_id":1,"amount":282,"base_value":1},
    "apples" : {"slug":"apples","name":"Apples","color":"#28502E","carbon":0.033528,"unit":"number of apples","id":2,"description":"A local fresh apple","category_id":2,"amount":30,"base_value":1},
    "bananas" : {"slug":"bananas","name":"Bananas","color":"#28502E","carbon":0.09906,"icon":null,"unit":"number of bananas","id":3,"description":"An overseas banana","category_id":2,"amount":10,"base_value":1},
    "flight" : {"slug":"flight","name":"Flight","color":"#99A1A6","carbon":98.736,"icon":null,"unit":"hours flying","id":4,"description":"Long haul flight","category_id":3,"amount":0,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "flight-distance" : {"slug":"flight-distance","name":"Flight distance","color":"#99A1A6","carbon":0.1122,"icon":null,"unit":"km of flight","id":5,"description":"Long haul flight","category_id":3,"amount":9,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "train" : {"slug":"train","name":"Train","color":"#99A1A6","carbon":0.015,"icon":null,"unit":"km by train","id":6,"description":"Train travel in Sweden","category_id":3,"amount":67,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "underground" : {"slug":"underground","name":"Underground","color":"#99A1A6","carbon":0.078,"icon":null,"unit":"km by subway","id":7,"description":"The London Underground","category_id":3,"amount":13,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "carrots" : {"slug":"carrots","name":"Carrots","color":"#28502E","carbon":0.014478,"icon":null,"unit":"number of carrots","id":8,"description":"A local fresh carrot","category_id":2,"amount":69,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "cups-of-tea" : {"slug":"cups-of-tea","name":"Cups of tea","color":"#F29559","carbon":0.00236,"icon":null,"unit":"cups of tea","id":10,"description":"A cup of tea prepared with a kettle","category_id":1,"amount":424,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "laptop" : {"slug":"laptop","name":"Laptop","color":"#F29559","carbon":0.002,"icon":null,"unit":"hours using a laptop","id":11,"description":"Using a laptop","category_id":1,"amount":500,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "car" : {"slug":"car","name":"Car","color":"#99A1A6","carbon":0.173,"icon":null,"unit":"km by car","id":12,"description":"Driving","category_id":3,"amount":6,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "mobile-charges" : {"slug":"mobile-charges","name":"Mobile charges","color":"#F29559","carbon":0.000236,"icon":null,"unit":"mobile phone charges","id":13,"description":"Full charging a mobile phone","category_id":1,"amount":4237,"base_value":1,"created_at":"2009-09-12T00:10:00Z"}  ,
    "tomatoes" : {"slug":"tomatoes","name":"Tomatoes","color":"#28502E","carbon":0.35052,"icon":null,"unit":"number of tomatoes","id":14,"description":"Greenhouse cultivated tomatoes","category_id":2,"amount":3,"base_value":1,"created_at":null}  ,
    "milk" : {"slug":"milk","name":"Milk","color":"#28502E","carbon":0.3631,"icon":null,"unit":"liters of milk","id":15,"description":"Swedish 1.5% milk","category_id":2,"amount":3,"base_value":1,"created_at":null}  ,
    "beef" : {"slug":"beef","name":"Beef","color":"#28502E","carbon":5.5098,"icon":null,"unit":"kg of beef","id":16,"description":"Cooked beef meat","category_id":2,"amount":0,"base_value":1,"created_at":null}  ,
    "fridge" : {"slug":"fridge","name":"Fridge","color":"#F56960","carbon":10.443,"icon":null,"unit":"years running a fridge","id":17,"description":"A-rated fridge","category_id":1,"amount":0,"base_value":1,"created_at":null}  ,
    "tv" : {"slug":"tv","name":"TV","color":"#F56960","carbon":0.009617,"icon":null,"unit":"hours of watching TV","id":18,"description":"Flatscreen 32\"","category_id":1,"amount":104,"base_value":1,"created_at":null}  ,
    "salmon" : {"slug":"salmon","name":"Salmon","color":"#28502E","carbon":6.7056,"icon":null,"unit":"kg of salmon","id":19,"description":"Farmed salmon","category_id":2,"amount":0,"base_value":1,"created_at":null}  ,
    "rice" : {"slug":"rice","name":"Rice","color":"#28502E","carbon":0.08382,"icon":null,"unit":"portions of rice","id":20,"description":"Rice portion","category_id":2,"amount":12,"base_value":1,"created_at":null}  ,
    "shrimps" : {"slug":"shrimps","name":"Shrimps","color":"#28502E","carbon":16.764,"icon":null,"unit":"kg of shrimps","id":21,"description":"Shrimps without shell","category_id":2,"amount":0,"base_value":1,"created_at":null}  ,
    "bread" : {"slug":"bread","name":"Bread","color":"#28502E","carbon":0.03352,"icon":null,"unit":"loafs of bread","id":22,"description":"From a local bakery","category_id":2,"amount":30,"base_value":1,"created_at":null}  ,
    "heating" : {"slug":"heating","name":"Heating","color":"#F56960","carbon":253.0,"icon":null,"unit":"years heating a flat","id":23,"description":"Heating a 60sqm flat with pellets","category_id":1,"amount":0,"base_value":1,"created_at":null}  ,
    "beers" : {"slug":"beers","name":"Beer","color":"#28502E","carbon":0.2286,"icon":null,"unit":"bottles of beer","id":24,"description":"Bottles of beer","category_id":2,"amount":4,"base_value":1,"created_at":null}  ,
    "co2" : {"slug":"co2","name":"CO2","color":"#B89300","carbon":1.0,"icon":null,"unit":"kg of CO2","id":25,"description":null,"category_id":1,"amount":1,"base_value":0,"created_at":null}
  };

  index = [
    "lightbulb"  ,  "apples"  ,  "bananas"  ,  "flight"  ,  "flight-distance"  ,  "train"  ,  "underground"  ,  "carrots"  ,  "cups-of-tea"  ,  "laptop"  ,  "car"  ,  "mobile-charges"  ,  "tomatoes"  ,  "milk"  ,  "beef"  ,  "fridge"  ,  "tv"  ,  "salmon"  ,  "rice"  ,  "shrimps"  ,  "bread"  ,  "heating"  ,  "beers"  ,  "co2"
  ];

  converter = new Carbon.Converter(conversions, index);
  converter.paint_left(true);
  converter.paint_right(true);
  //Expand the conversion drawer
  $(".toggle-conversions").bind("click", function(){
    var conversions = $(this).siblings(".conversions");

    if(conversions.hasClass("opened")){
      conversions.animate({"height": "0px"}, 500, "easeinout");
      conversions.removeClass("opened");
      $(this).removeClass("opened");
    }else{
      conversions.animate({"height": "150px"}, 500, "easeinout");
      conversions.addClass("opened");
      $(this).addClass("opened");
    }
  });

  // Add and subtract
  $("ul.add-subtract li.add").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      if (amount < 1){
    amount = 1;
    }else{
      amount = amount + 1;
    }
      conv.find(".number").html(amount);
      converter.paint_right(true);
    }else{
      var amount = converter.right_amount();
      if (amount < 1){
    amount = 1;
    }else{
      amount = amount + 1;
    }
      conv.find(".number").html(amount);
      converter.paint_left(true);
    }
  });

  // Function for resetting to one
  $("ul.add-subtract li.r").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      amount = 1;
      conv.find(".number").html(amount);
      converter.paint_right(true);
    }else{
      var amount = converter.right_amount();
      amount = 1;
      conv.find(".number").html(amount);
      converter.paint_left(true);
    }
  });

  $("ul.add-subtract li.subtract").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      if(amount != 0) amount = amount - 1;
      conv.find(".number").html(amount);
      converter.paint_right(true);
    }else{
      var amount = converter.right_amount();
      if(amount != 0) amount = amount - 1;
      conv.find(".number").html(amount);
      converter.paint_left(true);
    }
  });

  $(".conversions ul li").bind("click", function(){
    if ($('#'+$(this).attr("class")).length == 0){
      $(this).parent().parent().siblings(".inner-converter").attr("id", $(this).attr("id"));
      if ($(this).parent().parent().parent().attr('id') == "left"){
        converter.paint_right(false);
        converter.paint_left(true);
      }else{
        converter.paint_left(false);
        converter.paint_right(true);
      }

    }
  });

  });



  /*
  * jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
  *
  * Uses the built in easing capabilities added in jQuery 1.1
  * to offer multiple easing options
  *
  * Copyright (c) 2007 George Smith
  * Licensed under the MIT License:
  *   http://www.opensource.org/licenses/mit-license.php
  */

  /* Extending jQuery easing functions here with the one required for the player */

  jQuery.easing = jQuery.extend({
  easeinout: function(x, t, b, c, d) {
    if (t < d/2) return 2*c*t*t/(d*d) + b;
    var ts = t - d/2;
    return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b;
  }
  },jQuery.easing);

  var Carbon = Carbon || {};
  $.extend(Carbon, {
  Class: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
  });

  Carbon.Converter = Carbon.Class();
  Carbon.Converter.prototype = {
  initialize: function(conversions, index) {
    this.conversions = conversions;
    this.index = index;
    this.current = 0;
    //$("#converter_background").css("background-image", "url('images/units/"+this.left_data().slug+".jpg')");
    //$("#converter_background2").css("background-image", "url('images/units/"+this.right_data().slug+".jpg')");
  },
  data: function(id){
    return this.conversions[id];
  },
  random: function(){
    this.current = rand(this.index.length)
  // Avoiding haveing 0 vs 0 or CO2 vs CO2
  while ((this.current.right_amount() < 1) || (this.current.right_amount == this.current.left_amount)) {
    this.current = rand(this.index.length)
    };
    return this.conversions[this.index[this.current]];
  },
  next: function(){
    this.current ++;
    if (this.current >= this.index.length) this.current = 0;
    return this.conversions[this.index[this.current]];
  },
  previous: function(){
    this.current --;
    if (this.current < 0) this.current = this.index.length-1;
    return this.conversions[this.index[this.current]];
  },

  calculate_amount: function(slug, co2){
    return co2/this.conversions[slug].carbon;
  },

  left:function(){
    return $('#left div.inner-converter');
  },

  left_data:function(){
    return this.data(this.left()[0].id);
  },

  left_amount:function(){
    amount = this.left().find('.number').html();
  if (amount == "&lt;1"){
    amount = "0";
  };
    return parseInt(amount);

  },

  left_co2:function(){
    return this.left_amount()*this.left_data().carbon;
  },


  right:function(){
    return $('#right div.inner-converter');
  },

  right_data:function(){
    return this.data(this.right()[0].id);
  },

  right_amount:function(){
    var amount = this.right().find('.number').html();
  if (amount == "&lt;1"){
    amount = "0";
  };
    // amount = amount.replace('&lt;','');
    return parseInt(amount);
  },

  right_co2:function(){
    return this.right_amount()*this.right_data().carbon;
  },

  paint_left: function(recalculate){
    var container = this.left();
    var number = container.find('.number');
    var unit = container.find('.unit');
    var bg = container.find("converter_background");
    var html_amount = '';

    if(recalculate){
      var amount = Math.round(this.calculate_amount(this.left_data().slug,this.right_co2()));
      var do_spin = ((amount != this.left_amount()) && this.left_amount != 0 );
      if(amount == 0 && this.right_amount() != 0){
        html_amount = "&lt;1";
      }else{
        html_amount = amount.toString();
      }
      if (do_spin){
        this.spin_number(number, html_amount, amount.toString().length);
      }else{
        number.html(html_amount);
      }
      number.css('font-size',this.font_size(amount.toString().length));
      number.css('padding-top',25);
      unit.css('color', this.conversions[container.attr("id")].color)
    }
  //$("#converter_background").css("background-image", "url('images/units/"+this.left_data().slug+".jpg')");
  unit.html(this.conversions[container.attr("id")].unit);
  //console.log(this.left_data().slug + " in " + this.right_data().slug);
  //actlog.info(this.left_data().slug + " in " + this.right_data().slug);
  },

  paint_right: function(recalculate){
    var container = this.right();
    var number = container.find('.number');
    var unit = container.find('.unit');
    var html_amount = '';


    if(recalculate){
      var amount = Math.round(this.calculate_amount(this.right_data().slug,this.left_co2()));
      var do_spin = ((amount != this.right_amount()) && this.right_amount != 0 );
      if(amount == 0 && this.left_amount() != 0){
        html_amount = "&lt;1";
      }else{
        html_amount = amount.toString();
      }
      if (do_spin){
    this.spin_number(number, html_amount, amount.toString().length);
      }else{
        number.html(html_amount);
      }
      number.css('font-size',this.font_size(amount.toString().length));
      number.css('padding-top',25);
    }

    unit.html(this.conversions[container.attr("id")].unit);
    unit.css('color', this.conversions[container.attr("id")].color)

  //actlog.info(this.left_data().slug + " in " + this.right_data().slug);
  },

  font_size:function(digits){
    switch(digits){
      case 1:
      case 2:
      case 3:
        return "120px"
        break;
      case 4:
        return "120px"
        break;
      case 5:
        return "120px"
        break;
      case 6:
        return "120px"
        break;
      case 7:
        return "120px"
        break;
      case 8:
        return "120px"
        break;
      case 9:
      case 10:
      case 11:
        return "80px"
        break;
      case 12:
      case 13:
      case 14:
        return "60px"
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return "28px"
        break;
      default:
        return "10px"
        break;

    }
  },

  font_padding:function(digits){
    switch(digits){
      case 1:
      case 2:
      case 3:
        return "0px"
        break;
      case 4:
        return "0px"
        break;
      case 5:
        return "0px"
        break;
      case 6:
        return "0px"
        break;
      case 7:
        return "0px"
        break;
      case 8:
        return "90px"
        break;
      case 9:
      case 10:
      case 11:
        return "102px"
        break;
      case 12:
      case 13:
      case 14:
        return "102px"
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return "105px"
        break;
      default:
        return "110px"
        break;
      }
  },

  spin_number: function(number, html_amount, amount_length){
    var foo = 0;
    for(i = 0; i < 20; i++){
      foo += 20;
      setTimeout(function(){
        number.html(rand(Math.pow(10, amount_length)));
      }, foo);
    }
    setTimeout(function(){
      number.html(html_amount);
    }, 400);
  }
  }


  function rand(n){
  return ( Math.floor ( Math.random() * n )  );
  }
