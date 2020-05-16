$(document).ready(function(){

    
    var shows = ["Kids In The Hall", "SNL", "Portlandia", "Key and Peele", "Kroll Show", "Tim and Eric", "Chappelle's Show", "Mr.Show"]
    GIFs = " "
    
   
    
    
    function renderButtons() {
    
    
    $(".buttons").empty();
    
   
    for (var i=0; i < shows.length; i++) {
    
   
    var a = $('<button>');
    
    a.addClass('show');
    
    
    a.attr('data-name', shows[i]);
   
    a.text(shows[i]);
    
    $(".buttons").append(a);
    }
    s=
    $("#inputBox").focus();
    
    }
    
    renderButtons();
    
    
    $("#addShow").on('click', function() {
    
    
    event.preventDefault();
    
    
    var show = $("#inputBox").val().trim();
    
    
    shows.push(show);
    
    
    renderButtons();
    
    });
    
    
        $(document).on('click', 'button',  function() {
            
                $('#GIFs').empty(); 
                var b = $(this).attr('data-name');		
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=S9A1YTDoTr46XMZmKGKMawkSBLhfxXuX&limit=10&rating=R";  
                console.log(queryURL); 
    
                
                $.ajax({
                        url: queryURL,
                        method: 'GET'
                    })
                
                    .done(function(response) {
                        console.log(response);
                  
                        var results = response.data;
               
                        for (var i = 0; i < results.length; i++) {
                
                        var gifDiv = $('<div class="item">');
                       
                        var rating = results[i].rating;
                 
                        var r = $('<p>').text("Rating: " + rating);
                
                        var gifImage = $('<img>');
                
                            gifImage.attr('src', results[i].images.fixed_height_still.url)
                                    .attr('data-still', results[i].images.fixed_height_still.url)
                                    .attr('data-animate', results[i].images.fixed_height.url)
                                    .attr('data-state', "still")
                                    .addClass("showImage");
                
                            gifDiv.append(r)
                                  .append(gifImage);	                    
    
                            	  
                            $('#GIFs').prepend(gifDiv);
                        }
    
                    });
            });
    
    
    //====================Still and Animate Image ==================================
        // Listens for a click on any image (dynamic)
        // $('.showImage').on('click', function(){ --> won't work here
        $(document).on('click', '.showImage',  function() {
    
            var state = $(this).data('state');
            //If the clicked image's state is still, update its src attribute to what its data-animate value is
            if (state == "still") {
                console.log("still image works");
             // Then, set the image's data-state to animate
                $(this).attr('src', $(this).data('animate'))
                       .data('state', 'animate');
            } else {
            //  else set src to the data-still value
                console.log("animated image works");
                $(this).attr('src', $(this).data('still'))
                       .data('state', 'still');               
            }
    
        });
    
    });