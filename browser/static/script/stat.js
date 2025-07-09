/*
 * @Description:
 * @Author: wangfuyuan
 * @Email: wangfuyuan#nuo.com
 * @Date: 2025-07-09 10:25:44
 * @LastEditors: wangfuyuan
 * @LastEditTime: 2025-07-09 11:21:08
 * @FilePath: \a\static\script\stat.js
 * Copyright (c) 2025 by 诺诺网 , All Rights Reserved.
 *
 */
if (
  location.protocol.indexOf("http") > -1 &&
  location.hostname.indexOf("fuyuan.wang") == -1
) {
} else {
  !(function (p) {
    "use strict";
    !(function (t) {
      var s = window,
        e = document,
        i = p,
        c = "".concat(
          "https:" === e.location.protocol ? "https://" : "http://",
          "sdk.51.la/js-sdk-pro.min.js"
        ),
        n = e.createElement("script"),
        r = e.getElementsByTagName("script")[0];
      (n.type = "text/javascript"),
        n.setAttribute("charset", "UTF-8"),
        (n.async = !0),
        (n.src = c),
        (n.id = "LA_COLLECT"),
        (i.d = n);
      var o = function () {
        s.LA.ids.push(i);
      };
      s.LA ? s.LA.ids && o() : ((s.LA = p), (s.LA.ids = []), o()),
        r.parentNode.insertBefore(n, r);
    })();
  })({
    id: "3MkSAD5CFT0WN5Ig",
    ck: "3MkSAD5CFT0WN5Ig",
  });
}
