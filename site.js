document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("sevaLoader");

    if (!loader) {
        return;
    }

    // Page completely loaded hone ke baad loader hide karo
    window.addEventListener("load", function () {

        setTimeout(function () {

            loader.classList.add("loader-hidden");

        }, 700);

    });

});
