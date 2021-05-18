let pageUrl = window.location.href;
let shareTitle = "Pisces65个人博客";
let summary = "发现了一个好看的博客页面！";
let qzoneURL = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+pageUrl+"&sharesource=qzone&title="+shareTitle+"&&summary="+summary;
let twitterURL = "https://twitter.com/share?text="+shareTitle+"&url="+pageUrl;
$("#qzone").attr("href",qzoneURL);
$("#twitter").attr("href",twitterURL);