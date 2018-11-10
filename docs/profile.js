/// <reference path="../_typings/jquery.d.ts" />

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

(function($) {
  function getUser(userName) {
    return fetch(
      `https://jsonplaceholder.typicode.com/users?username=${userName}`
    ).then(function(response) {
      return response.json();
    });
  }

  function getPosts(user) {
    // console.log("user: ", user);
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(posts) {
        user.posts = posts;
        return user; // returns a new Promise() with resolve(user)
      });
  }

  function getAlbums(user) {
    // console.log("user: ", user);
    return fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(albums) {
        user.albums = albums;
        return user; // returns a new Promise() with resolve(user)
      });
  }

  function userResolveHandler(user) {
    return user[0]; // returns a new Promise() with resolve(user)
  }

  var userName = new URLSearchParams(location.search).get("userName");
  if (userName) {
    $("#user-name").val(userName);
    getUser(userName)
      .then(userResolveHandler)
      .then(getPosts)
      .then(getAlbums)
      .then(function(user) {
        var postsHTML = "<ul>";
        var albumsHTML = "<ul>";

        // User
        $("#full-name").val(user.name);

        // Posts
        user.posts.forEach(function(post) {
          postsHTML += `
            <li>
              <a href="post.html?id=${post.id}">${post.title}</a>
            </li>
          `;
        });
        postsHTML += "</ul>";
        $("#user-posts").html(postsHTML);

        // Albums
        user.albums.forEach(function(album) {
          albumsHTML += `
            <li>
              <a href="album.html?id=${album.id}">${album.title}</a>
            </li>
          `;
        });
        $("#user-albums").html(albumsHTML);
      })
      .catch(function(err) {
        console.error(err);
        alert(
          "User name provide is not valid! You will be redirected to the Login Page."
        );
        location.href = "login.html";
      });
  } else {
    alert("User profile not found! You will be redirected to the Login Page.");
    location.href = "login.html";
  }
})(jQuery);
