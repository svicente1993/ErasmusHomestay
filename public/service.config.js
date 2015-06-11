(function () {
    if (window.location.host.indexOf("localhost") !== -1) {
        window.serviceUrl = "http://localhost:55219/";
    }
    else if (window.location.host.indexOf("qa") !== -1) {
        window.serviceUrl = "http://qa.retailbanking.com/";
    }
    else if (window.location.host.indexOf("ie-sv-web1-dev")){
      window.serviceUrl = "http://ie-sv-web1-dev:83/";
    }
    else {
        window.serviceUrl = "http://retailbanking.com/"
    }
})();


// http://api.itextpdf.com/itext/
