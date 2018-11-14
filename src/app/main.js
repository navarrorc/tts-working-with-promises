/// <reference path="../../_typings/jquery.d.ts" />

import login from "./login.js";
import profile from "./profile.js";
import post from "./post.js";
import album from "./album.js";

if (location.pathname === "/login.html") {
  login(); // login page javascript code
}

if (location.pathname === "/profile.html") {
  profile();
}

if (location.pathname === "/post.html") {
  post();
}

if (location.pathname === "/album.html") {
  album();
}
