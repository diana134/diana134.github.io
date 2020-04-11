RavelryApi = function() {
    this.authUsername = '';
    this.authPassword = '';
  };
  
  
  RavelryApi.prototype.get = function(url) {
    const headers = new Headers();
    const debugFunction = this.debugFunction;
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    
    headers.append('Authorization', 'Basic ' + btoa(this.authUsername + ":" + this.authPassword));
    
    return fetch(url, { method: 'GET', headers: headers }).then(function(response) {
      return response.json();
    }).then(function(json) { 
      if (debugFunction) debugFunction(json);
      return json; 
    });
  };
  
  // Retrieve a list of projects for a user: https://www.ravelry.com/api#projects_list
  // Pagination is optional, default is no pagination
  
  RavelryApi.prototype.projectsList = function(username) {
    const url = 'https://api.ravelry.com/projects/' + username + '/list.json';
    return this.get(url);
  };

  // go go go!!!

  document.addEventListener("DOMContentLoaded", function() {
    const ravelryClient = new RavelryApi();

    ravelryClient.projectsList('wool-rat').then(function(result) {
        console.log(result.projects);
        let projects = result.projects;

        let resultsContainer = document.getElementById('results-container');

        // display project thumbnails
        projects.forEach(project => {
            const child = document.createElement('li');
            child.className = 'project__result';

            // show the thumbnail
            const img = document.createElement('img');
            img.src = project.first_photo.square_url;
            img.className = 'project__result__thumbnail';
            child.appendChild(img);

            // add the child
            resultsContainer.appendChild(child);
        });
    });
  });


 
