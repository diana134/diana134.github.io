const Http = new XMLHttpRequest();
const url='https://api.ravelry.com/current_user.json';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}