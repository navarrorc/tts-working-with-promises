/// <reference path="../../_typings/jquery.d.ts" />

import $ from "jquery";

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

export default function() {
  // get post
  function getPost(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
      function(response) {
        return response.json();
      }
    );
  }

  function getUser(post) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        post.user = user;
        return post;
      });
  }

  function getComments(post) {
    return fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(comments) {
        post.comments = comments;
        return post;
      });
  }

  var id = new URLSearchParams(location.search).get("id");
  var commentsHTML = "<ul style='list-style:none'>";
  getPost(id)
    .then(getUser)
    .then(getComments)
    .then(function(post) {
      // console.log(post);
      // profile-link
      $("#profile-link").html(`
        <a href="profile.html?userName=${
          post.user.username
        }">Back to Profile</a>
      `);
      // post-title
      $("#post-title").html(post.title);
      // post-body
      $("#post-body").html(post.body);
      // post-comments
      $("#comments-label").toggleClass("d-none"); // make visible
      post.comments.forEach(function(comment) {
        commentsHTML += `
        <li class="border mb-1 p-1">
          <p class="mb-1">${comment.body}</p>
          <div class="text-right"><strong>email:</strong> ${
            comment.email
          } <strong>name:</strong> ${comment.name}</div>
        </li>
      `;
      });
      commentsHTML += "</ul>";
      $("#post-comments").html(commentsHTML);
    });
}
