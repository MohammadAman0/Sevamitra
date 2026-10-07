
document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("sevaLoader");

    if (!loader) {
        return;
    }

    function hideLoader() {
        loader.classList.add("loader-hidden");
    }

    // Hide loader after the page has loaded.
    if (document.readyState === "complete") {
        setTimeout(hideLoader, 700);
    } else {
        window.addEventListener("load", function () {
            setTimeout(hideLoader, 700);
        }, { once: true });
    }

});
