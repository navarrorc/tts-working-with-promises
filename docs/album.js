/// <reference path="../_typings/jquery.d.ts" />

/**
 * Create IIFE (Immediately Invoked Function Expression).
 * Now jQuery will be referenced as $ inside the function.
 * */

(function($) {
  var id = new URLSearchParams(location.search).get("id");
  var thumbnailsHTML = "";

  // get album
  function getAlbum(albumId) {
    return fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`).then(
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

  function getPhotos(album) {
    return fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(photos) {
        album.photos = photos;
        return album;
      });
  }

  function renderThumbnails(thumbnails) {
    // console.log(thumbnails);
    thumbnailsHTML = ""; // reset html content
    thumbnailsHTML += `
      <div class="col-12 text-center">Total Results: <strong>${
        thumbnails.length
      }</strong></div>
    `;
    thumbnails.forEach(function(photo) {
      thumbnailsHTML += `
        <div class="col m-2 font-weight-bold" data-toggle="tooltip" data-placement="top" title="${
          photo.title
        }">
          <div class="m-2 position-absolute text-light">
            ${photo.title.slice(0, 10)}
          </div>
          <img src="${photo.thumbnailUrl}" alt="${photo.title}">

        </div>
      `;
    });
    $("#thumbnails").html(thumbnailsHTML);
    $('[data-toggle="tooltip"]').tooltip(); // initialize tooltips, see: https://getbootstrap.com/docs/4.1/components/tooltips/
  }

  getAlbum(id)
    .then(getUser)
    .then(getPhotos)
    .then(function(album) {
      // wire up the event handler for the search box
      $("#input-search").keyup(function() {
        // console.log($(this).val());
        var query = $(this).val();
        var filteredThumbnails = album.photos.filter(function(photo) {
          return photo.title.includes(query);
        });
        renderThumbnails(filteredThumbnails);
      });
      // profile-link
      $("#profile-link").html(`
        <a href="profile.html?userName=${
          album.user.username
        }">Back to Profile</a>
      `);
      // thumbnails
      renderThumbnails(album.photos);
    });
})(jQuery);
