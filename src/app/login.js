/// <reference path="../../_typings/jquery.d.ts" />

import $ from "jquery";

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

export default function() {
  // console.log("code from login.js is being executed");
  /**
   * Get a user and all its posts and posts comments
   *  */
  $("form").submit(function(e) {
    e.preventDefault();
    // console.log(e);
    var userName = $("#input-username").val();
    if (userName) {
      // console.log(userName);
      location.href = "profile.html?userName=" + userName;
    }
  });
}
