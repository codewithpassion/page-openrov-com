"use strict";!function(e){e("#confirmationNumber").text(function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=o.exec(n);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}("number"))}($);