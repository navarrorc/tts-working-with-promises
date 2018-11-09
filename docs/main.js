/// <reference path="../_typings/jquery.d.ts" />

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

(function($) {
  /**
   * Get a user and all its posts and posts comments
   *  */
  function getUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
      function(response) {
        return response.json();
      }
    );
  }

  function getPosts(user) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(posts) {
        user.posts = posts;
        return user; // returns a new Promise() with resolve(user)
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
        // throw new Error("My Error"); // for testing purposes
      });
  }

  function userResolveHandler(user) {
    return user; // returns a new Promise() with resolve(user)
  }

  getUser(1)
    .then(userResolveHandler)
    .then(getPosts) // appending posts to user object, returns the newly enhanced user object {id: 1, posts:[10] ...}
    .then(function resolveHandler(user) {
      // iterate through each user post and attach comments
      user.posts.forEach(function(post) {
        getComments(post)
          .then()
          .catch(function rejectHandler(err) {
            console.error("Oops my inner promise chain broke!!!!", err);
          });
      });
      console.log(user);
    })
    .catch(function rejectHandler(err) {
      console.error("Oops my outer promise chain broke!!!!", err);
    });
})(jQuery);
