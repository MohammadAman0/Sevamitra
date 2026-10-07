document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("sevaLoader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("loader-hidden");

            }, 450);

        });

    }


    // Internal page transition

    document.querySelectorAll("a").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href.startsWith("#") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:") ||
            href.startsWith("http")
        ) {
            return;
        }


        link.addEventListener("click", (event) => {

            event.preventDefault();


            if (loader) {

                loader.classList.remove("loader-hidden");

            }


            setTimeout(() => {

                window.location.href = href;

            }, 350);

        });

    });

});
