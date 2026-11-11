
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // =====================================
    // AUTOMATIC FOOTER YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(`
        .marketplace-heading,
        .marketplace-card,
        .marketplace-form-wrapper,
        .about-grid,
        .principle-card,
        .contact-copy,
        .contact-actions,
        .contact-detail-card,
        .footer-brand-column,
        .footer-column
    `);

    if ("IntersectionObserver" in window) {

        revealElements.forEach((element, index) => {

            element.classList.add("reveal-on-scroll");

            // Slight stagger between cards and columns
            const delay = index % 4;

            element.style.setProperty(
                "--reveal-delay",
                `${delay * 100}ms`
            );

        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    // =====================================
    // WHATSAPP ENQUIRY FORMS
    // =====================================

    const whatsappNumber = "27659065016";

    function connectForm(formId, enquiryType, fields) {

        const form = document.getElementById(formId);

        if (!form) return;

        form.addEventListener("submit", event => {

            event.preventDefault();

            const values = {};

            fields.forEach(field => {

                const element = document.getElementById(field.id);

                values[field.label] = element
                    ? element.value.trim()
                    : "";

            });

            let message = `Hello Shiloh Chrome Ventures,

I would like to submit a ${enquiryType}.

`;

            Object.entries(values).forEach(([label, value]) => {

                message += `${label}: ${value || "Not provided"}\n`;

            });

            message += `

Please contact me to discuss this enquiry.

Thank you.`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    // BUYER FORM

    connectForm("buyerForm", "BUYING ENQUIRY", [
        { id: "buyerName", label: "Full name" },
        { id: "buyerCompany", label: "Company name" },
        { id: "buyerProduct", label: "Chrome product required" },
        { id: "buyerQuantity", label: "Required quantity" },
        { id: "buyerLocation", label: "Delivery destination" },
        { id: "buyerSpecifications", label: "Specifications" }
    ]);


    // SELLER FORM

    connectForm("sellerForm", "SELLING ENQUIRY", [
        { id: "sellerName", label: "Full name" },
        { id: "sellerCompany", label: "Company name" },
        { id: "sellerProduct", label: "Chrome product available" },
        { id: "sellerQuantity", label: "Available quantity" },
        { id: "sellerLocation", label: "Material location" },
        { id: "sellerSpecifications", label: "Specifications" }
    ]);


    // =====================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);

            }

        });

    });

});
