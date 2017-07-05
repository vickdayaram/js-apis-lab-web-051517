//define functions here


function createGist(username, file_name, content, description, token) {
  console.log("got here")
  let newGist = {
    "description": description,
    "public": true,
    "files": {
      filename: {
        "content": content
      }
    }
  }

  $.ajax({
      url: `https://api.github.com/gists`,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(newGist),
      headers: {
        Authorization: `token ${token}`
      }
    })
    .then((response) => {
      console.log("creating a new gist===========", response);

      $('#gists ul').append(`<li>
        <a href="${response.url}">${response.description}</a>
        </li>`)
    })

}


function getPublicGists() {
  $('form#get-gists').on('submit', function(event) {
    let username = $('#username').val()
    let token = $('#token').val()
    let filename = $('#file_name').val()
    let content = $('#content').val()
    let description = $('#description').val()
    myGists(username, token)
    createGist(username, file_name, content, description, token)
    event.preventDefault()
  })
}

function myGists(username, token) {
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    success: function(data) {
      console.log("grabbing my gists***********", data);
      $('#gists ul').empty()
      debugger
      data.forEach((gist) => {
        $('#gists ul').append(`<li>
          <a href="${gist.html_url}">${gist.description}</a>
          </li>`)
      })
    }
  })
};

var bindCreateButton = function() {
  // call functions here


};

$(document).ready(function() {
  getPublicGists()
});
