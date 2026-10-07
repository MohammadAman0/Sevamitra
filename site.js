document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("sevaLoader");

    if (!loader) {
        return;
    }

    // Loader sirf first website visit/open par show hoga
    const alreadyVisited = sessionStorage.getItem("sevaMitraVisited");

    if (alreadyVisited) {

        loader.classList.add("loader-hidden");

        return;

    }

    // First visit
    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loader-hidden");

            sessionStorage.setItem(
                "sevaMitraVisited",
                "true"
            );

        }, 700);

    });

});
