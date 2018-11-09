/// <reference path="../_typings/jquery.d.ts" />

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

(function($) {
  // Get user and all its posts
  function getUser(userId) {
    return new Promise(function executor(resolve, reject) {
      $.get("https://jsonplaceholder.typicode.com/users/" + userId, function(
        user
      ) {
        resolve(user);
      }).fail(function(error) {
        console.error(error);
        reject(error);
      });
    }); // unfulfilled
  }

  function getPosts(user) {
    return new Promise(function executor(resolve, reject) {
      $.get(
        " https://jsonplaceholder.typicode.com/posts",
        { userId: user.id },
        function(posts) {
          user.posts = posts;
          resolve(user);
        }
      ).fail(function(error) {
        console.error(error);
        reject(error);
      });
    });
  }

  function getComments(post) {
    return new Promise(function executor(resolve, reject) {
      $.get(
        "https://jsonplaceholder.typicode.com/comments",
        { postId: post.id },
        function(comments) {
          post.comments = comments;
          resolve(); // done!
        }
      ).fail(function(error) {
        console.error(error);
        reject(error);
      });
    });
  }

  function userResolveHandler(user) {
    return user; // new Promise() with resolve(user)
  }

  getUser(1)
    .then(userResolveHandler)
    .then(getPosts) // appending posts to user object, returns the newly enhanced user object {id: 1, posts:[10] ...}
    .then(function resolveHandler(user) {
      // iterate through each user post and attach comments
      user.posts.forEach(function(post) {
        getComments(post)
          .then()
          .catch(function rejectHandler(error) {
            console.error("Oops my inner promise chain broke!!!!");
            console.error(error);
          });
      });
      console.log(user);
    })
    .catch(function rejectHandler(error) {
      console.error("Oops my outer promise chain broke!!!!");
      console.error(error);
    });
})(jQuery);
