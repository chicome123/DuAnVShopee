"use strict";
function getUrlParameter(e) {
    var o = window.location.search;
    if (e) {
        var i = e.indexOf("?");
        i > -1 && (o = e.slice(i))
    }
    var t = o.substring(1);
    if ("" === t)
        return {};
    for (var n = t.split("&"), a = void 0, r = {}, c = 0; c < n.length; c++)
        a = n[c].split("="),
        r[a[0]] = decodeURIComponent(a[1]);
    return r
}
function getCDNSiteImagesURL(e) {
    return "https://cdngarenanow-a.akamaihd.net/gmc/official_web_site/web_static/categorized/" + e
}
function openGooglePlay(e) {
    var o = LINKS.android;
    if (o = browser.versions.isGasApp ? LINKS.directgoogle : LINKS.android,
    e) {
        var i = o.indexOf("?") >= 0 ? "&" : "?";
        o += i + e
    }
    location.href = o
}
function isSupportWebpFormat() {
    if (window.localStorage && "object" == typeof localStorage) {
        var e = "webpa";
        if (!localStorage.getItem(e) || "available" !== localStorage.getItem(e) && "disable" !== localStorage.getItem(e)) {
            var o = document.createElement("img");
            o.onload = function() {
                try {
                    localStorage.setItem(e, "available")
                } catch (o) {}
            }
            ,
            o.onerror = function() {
                try {
                    localStorage.setItem(e, "disable")
                } catch (o) {}
            }
            ,
            o.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
        }
    }
}
var browser = {
    versions: function() {
        var e = navigator.userAgent
          , o = {
            trident: e.indexOf("Trident") > -1,
            presto: e.indexOf("Presto") > -1,
            webKit: e.indexOf("AppleWebKit") > -1,
            gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") === -1,
            mobile: !!e.match(/AppleWebKit.*Mobile.*/),
            ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
            iPhone: e.indexOf("iPhone") > -1,
            iPad: e.indexOf("iPad") > -1,
            webApp: e.indexOf("Safari") === -1,
            inShopee: e.toLowerCase().indexOf("shopee") > -1,
            inGasApp: e.toLowerCase().indexOf("garenagas/") > -1
        };
        return o.inShopee && (o.shopeeVersion = e.match(/version=(\d+)/)[1]),
        o
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
LocalizedScrips.vi = function() {}
,
$(function() {
    function e() {
        browser.versions.ios ? $(".downloadLinks").children("a.googlePlay").hide() : $(".downloadLinks").children("a.appleStore").hide(),
        $("#contacts").children(".contact").on("click", function(e) {
            $(e.target).toggleClass("active").siblings(".contact").removeClass("active")
        }),
        browser.versions.inShopee ? ($("#nav, #footer, #contacts").hide(),
        $("body, #tofContent").css({
            margin: 0
        })) : "shopee.sg" === CURRENT_DOMAIN || "shopee.com.my" === CURRENT_DOMAIN || "shopee.co.id" === CURRENT_DOMAIN || "shopee.ph" === CURRENT_DOMAIN ? $(".nav-ig-import").children("a").text("IG Import") : "shopee.vn" === CURRENT_DOMAIN ? $(".nav-ig-import").children("a").text("IG Import") : "shopee.co.th" === CURRENT_DOMAIN && $(".nav-ig-import").children("a").text("นำเข้ารูปจาก IG")
    }
    function o() {
        $("body>.module").each(function(e, o) {
            var i = $(o)
              , t = i.position();
            i.scrollspy({
                min: t.top - 200,
                max: t.top + i.height() - 200,
                onEnter: function(e) {
                    $(e).addClass("active")
                },
                onLeave: function(e) {
                    $(e).removeClass("active")
                }
            })
        }),
        $("#backToBack").on("click", function() {
            $("html,body").animate({
                scrollTop: 0
            })
        }),
        setTimeout(function() {
            $(document.body).height() < $(window).height() && $("#footer").css({
                position: "fixed",
                bottom: 0,
                width: "100%"
            })
        }, 300)
    }
    function i() {
        var e = {
            "a.icon_facebook": LINKS.facebook
        }
          , o = function(e) {
            var o = $(e.target).attr("ohref");
            window.open(o)
        };
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var t = $(i)
                  , n = t.attr("href");
                t.attr("href", e[i]).attr("ohref", n).on("click", o)
            }
    }
    function t() {}
    function n() {
        "undefined" != typeof LocalizedScrips && LocalizedScrips[LANGUAGE_CODE] && LocalizedScrips[LANGUAGE_CODE]()
    }
    $(".icon_download").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#module_download").offset().top + 20
        })
    }),
    browser.versions.mobile ? (e(),
    browser.versions.ios ? i() : t()) : o(),
    n()
});
