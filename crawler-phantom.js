var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
phantom.create().then(instance => {
    phInstance = instance;
    return instance.createPage();
}).then(page => {
    sitepage = page;
    return page.open('https://www.wikiwand.com/zh-tw/Wiki', function() {
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err) {
        setTimeout(function () {
          return page.evaluate(function () {
            console.log("kkkkkkkkkk");
            var h2Arr = [],
                pArr = [];

            $('h2').each(function () { h2Arr.push($(this).html()); });
            $('p').each(function () { pArr.push($(this).html()); });

            return {
              h2: h2Arr,
              p: pArr
            };
          }, function (err,result) {
            console.log("111111");
            console.log(result);
            phInstance.exit();
          });
        }, 5000);
      });
    });
}).then(status => {
    // console.log(status);
    return sitepage.property('content');
}).then(content => {
    // console.log(content);
    sitepage.close();
    phInstance.exit();
}).catch(error => {
    console.log(error);
    phInstance.exit();
});
