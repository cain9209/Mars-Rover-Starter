button.addEventListener("click", function (event) {
    console.log("button clicked");
    event.stopPropagation();
});

//Just in case for message class//