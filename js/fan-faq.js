$(".fan-faq-question").on("click", function () {
    const question = $(this);
    const isOpen = question.attr("aria-expanded") === "true";

    question.attr("aria-expanded", String(!isOpen));
    question.find(".fan-faq-icon").text(isOpen ? "+" : "−");
    question.next(".fan-faq-answer").slideToggle(200);
});
