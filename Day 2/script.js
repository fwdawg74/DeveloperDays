function resetMessages() {
    $(
        ".NoUsername, .WrongUsername, .IncompleteUsername, .EverythingRight, .Fetched"
    ).fadeOut();
}

// Do something once the document is loaded.
$(function () {
    var FetchedDetails = null;
    $(".Fetched .WrongUsername, .IncompleteUsername, .EverythingRight").hide();
    // When you start typing on the text box, it needs to enable the check button, if value is not empty.
        $("#github-username").keyup(function () {
            // if the value is more than a single character...
            if ($(this).val().trim().length > 0) {
                // Enable the Check button
                $("#check").prop("disabled", false);
                // Reset Messages
                if (!$(".NoUsername").is(":visible")) {
                resetMessages();
                $(".NoUsername").fadeIn();
                }
            } else {
                // Disable the Check button
                $("#check").prop("disabled", true);
            }
        }); 
    // When the Check button is clicked do something
    $("#check").click(function (e) {
        e.preventDefault();
        $("#github-username, #check").prop("disabled", true);
        $.getJSON(
            "https://api.github.com/users/" + $("#github-username").val(),
            function (res) {
                FetchedDetails = res;
            if (
                res.login &&
                res.avatar_url &&
                res.name &&
                res.company &&
                res.blog &&
                res.location &&
                res.bio &&
                res.twitter_username
            ) {
                // It's a complete profile
                resetMessages();
                $(".EverythingRight").fadeIn();
                $("#fetch").prop("disabled", false);
            } else {
                // It's an imcomplete profile
                resetMessages();
                $(".IncompleteUsername").fadeIn();
            }
        }
        ).fail(function() {
          resetMessages();
          $(".WrongUsername").fadeIn();
        });
    });
// When the Fetch button is clicked do something
$("#fetch").click(function (e) {
    e.preventDefault();
    $(".Fetched #avatar_url").attr("src", FetchedDetails.avatar_url);
    $(".Fetched #login").text(FetchedDetails.login);
    $(".Fetched #name").text(FetchedDetails.name);
    $(".Fetched #company").text(FetchedDetails.company);
    $(".Fetched #hireable").text(FetchedDetails.hireable);
    $(".Fetched #blog").text(FetchedDetails.blog);
    $(".Fetched #location").text(FetchedDetails.location);
    $(".Fetched #bio").text(FetchedDetails.bio);
    $(".Fetched #twitter_username").text(FetchedDetails.twitter_username);
    resetMessages();
    $(".Fetched").fadeIn();
    $(this).after(
        '<button type="button class="btn btn-primary" onclick="location.reload();">Again</button>'
        );
});
});  