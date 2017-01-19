var append_article = function(article) {
  $('section.results').append(
    "<article class='result'>" +
      "<h2>" + article.author_name + "</h2>" +
      "<h3>" + article.part_name   + "</h3>" +
      "<p>"  + article.text        + "</p>"  +
      "</article>"
  );
};

$(document).ready(function(){
  var id  = location.search.split("=")[1];
  var url = "http://" + location.hostname + ":8000/json/" + id + "/search.json";

  $.getJSON(url, function(data){
    $.each(data, function(i, line) {
      append_article(line);
    });
  });

  $("#search").on("keyup", function() {
    var query = $(this).val();

    $("article.result").each(function() {
      var text = $(this).text();

      if(text.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        $(this).show();
      else
        $(this).hide();
    });
  });
});
