app.setter = {};

app.setter.data = JSON.parse(getFile('http://94.199.200.240/~darksoftware/not-al/getjson/class'));
app.setter.Rdata = JSON.parse(getFile('http://94.199.200.240/~darksoftware/not-al/getjson/reversedClass'));
app.setter.adsData = JSON.parse(getFile('http://94.199.200.240/~darksoftware/not-al/getjson/ads'));

app.setter.class = function(){
  app.setter.remove();
  app.setter.navigate(0,null,null);
  app.setter.navigate(1,null,null);
  let class_;
  for(class_ in app.setter.data){
    let class_list = app.creator.listElement(class_);

    $(class_list).click(
      function(){
        setTimeout(function(){
          app.setter.navigate(0,class_list.getAttribute("data"),
            function(){
                app.setter.class();
              }
            );

            app.setter.navigate(1,null,null);

            app.setter.lesson( class_list.getAttribute("data") );
          },000);
      }
    );
    app.areas.list.appendChild(class_list);
  }
}

app.setter.lesson = function(class_){
  app.setter.navigate(1,null,null);

  app.setter.remove();
  let lesson;
  for(lesson in app.setter.data[class_]){
    let lessonElement = app.creator.listElement(lesson);


    $(lessonElement).click(function(){
      setTimeout(function(){
        app.setter.navigate(1,lessonElement.getAttribute("data"),function(){
          app.setter.lesson(class_);
        });

        app.setter.topic(class_,lessonElement.getAttribute("data"));
      },000)
    });


    app.areas.list.appendChild(lessonElement);
  }
}

app.setter.topic = function(class_,lesson){
    app.setter.remove();
    let topic;
    for(topic in app.setter.data[class_][lesson]){
      let topicElement = app.creator.listElement(topic);

      $(topicElement).click(function(){
        setTimeout(function(){
          app.setter.note(class_,lesson,topic);
        },000);
      });

      app.areas.list.appendChild(topicElement);
    }
};

app.setter.note = function(class_,lesson,topic){
  function controllSwipe(){
    if(document.querySelector(".pswp") == null){
      let a = getFile("libs/PhotoSwipe/html.html");
      document.querySelector("extra").innerHTML = a;
    }
    $(".pswp__button--share").click(function(){
      window.plugins.socialsharing.share(
          'Ana Yazı!',
          'Açıklama',
          'https://www.google.nl/images/srpr/logo4w.png',
          'http://link.com')
    });
  }
  controllSwipe();
  var pswpElement = document.querySelectorAll('.pswp')[0];
  let Rtopic = app.setter.Rdata[class_][lesson][topic].number;
  let Rlesson = app.setter.Rdata[class_][lesson].number;
  let Rclass_ = app.setter.Rdata[class_].number;
  let adsid = app.setter.adsData.Main.Default.ADS;
  console.log("REKLAM ID:",adsid);
  app.setter.ads.gecis(adsid);
  let finalize = '/' + Rclass_ + '/' + Rlesson + '/' + Rtopic + '/';
  console.log(class_,lesson,topic);
  // build items array
  var items = [];
  for (var i = 0; i < app.setter.data[class_][lesson][topic].length; i++) {
    items.push(
      {
        src: 'http://94.199.200.240/~darksoftware/not-al/getimage'+finalize+app.setter.data[class_][lesson][topic][i],
        w: 3120,
        h: 4160
      }
    );
    console.log('http://94.199.200.240/~darksoftware/not-al/getimage'+finalize+app.setter.data[class_][lesson][topic][i]);
  }
  // define options (if needed)
  var options = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
  };

  // Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
}
app.setter.removeFirst = true;
app.setter.remove = function(){
  if(!app.setter.removeFirst){
    app.areas.list.innerHTML = "";
  }
  else{
    app.setter.removeFirst = false;
  }
}

app.setter.navigate = function(number,data,function_){
  if(number == 0){
    $(app.areas.navigate).css("width",(data == null)? "0px":"max-content");
    $(app.areas.navigate).css("box-shadow",(data == null)? "unset":"0px 5px 33px 10px rgba(0,0,0,0.75)");
  }

  if(number == 1){
    (app.areas.navigates[0]).classList.add((data == null)? "a":"split");
    (app.areas.navigates[0]).classList.remove((data == null)? "split":"a");
    $(app.areas.navigates[1]).css("padding",(data == null)? "0":"0 10px");
  }

  app.areas.navigates[number].innerText=data;
  $(app.areas.navigates[number]).unbind("click");
  $(app.areas.navigates[number]).click(function_);
}

app.setter.ads = {
  banner:function(){
    console.log("banner açılıyor");
    AdMob.createBanner({
      adId: "ca-app-pub-3940256099942544/6300978111",
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      autoShow: true
    });

  },
  gecis:function(id){
    console.log("gecis açılıyor");
    id = "ca-app-pub-3940256099942544/1033173712";
    AdMob.prepareInterstitial( {adId:id, autoShow:true} );
  }
}
document.addEventListener("deviceready", function(){
  app.setter.class();
  app.setter.ads.banner();
}, false);
