$(document).ready(function () {
  const responses = {
    coffeeStyle: undefined,
    bean: undefined,
    coffeequant: undefined,
    grind: undefined,
    delivery: undefined,
  };

  const price250 = [7.2, 9.6, 12.0];
  const price500 = [13.0, 17.5, 22.0];
  const price1000 = [22.0, 32.5, 42.0];

  let finalPrice = undefined;

  //NAVIGATION
  $(".header__navBtn").on("click", function () {
    $(this).attr("aria-expanded") == "false"
      ? $(this).attr("aria-expanded", true)
      : $(this).attr("aria-expanded", false);
    $(document.body).toggleClass("menuOpen");
    $(".header__nav").fadeToggle();
  });

  //SHOW OPTIONS
  $(".plan__box button").on("click", function () {
    const $planBoxEl = $(this).parent();
    const elId = $planBoxEl.attr("id");

    $planBoxEl.toggleClass("active");
    $(`.plan__item[data-item = '${elId}']`).toggleClass("active");
  });

  //GET DATA ABOUT COFFEE FROM INPUTS AND SHOW IT IN SUMMARY
  $('input[type="radio"]').on("change", function () {
    const inputName = $(this).attr("name");
    const inputValue = $(this).val();
    responses[inputName] = inputValue;

    $(`.plan__blank[data-name='${inputName}']`).text(inputValue);

    if ($(this).attr("name") == "coffeequant") {
      const quantity = +$(this).val().slice(0, -1);
      const $priceEls = $(".product__price");

      switch (quantity) {
        case 250:
          price250.forEach((price, index) =>
            $priceEls.eq(index).text(`$${price.toFixed(2)}`)
          );
          break;
        case 500:
          price500.forEach((price, index) =>
            $priceEls.eq(index).text(`$${price.toFixed(2)}`)
          );
          break;
        case 1000:
          price1000.forEach((price, index) =>
            $priceEls.eq(index).text(`$${price.toFixed(2)}`)
          );
      }

      $(".product__text").text("per shipment. ");
    }

    const blankResponses = Object.values(responses).filter(
      (res) => res === undefined
    );

    if (!blankResponses.length) {
      $("#planBtn").attr("disabled", false);
    }
  });

  //SHOW FINAL PRICE
  $(".plan__form").on("submit", function (e) {
    e.preventDefault();
    finalPrice = +$('input[name="delivery"]:checked')
      .next()
      .find(".product__price")
      .text()
      .slice(1, -1);

    const deliveryOption = $('input[name="delivery"]:checked').attr("value");

    switch (deliveryOption) {
      case "every week":
        finalPrice = finalPrice * 4;
        break;
      case "every 2 weeks":
        finalPrice = finalPrice * 2;
        break;
    }

    if ($(window).width() > 768) {
      $(".summary__price").text(finalPrice.toFixed(2));
    } else {
      $(".summary__text-mobile").text(finalPrice.toFixed(2));
    }

    $(document.body).addClass("showSummary");
  });

  //LEAVING MODAL
  $(window).on("click", function () {
    if (!$(document.body).hasClass("showSummary")) return;
    $(document.body).removeClass("showSummary");
  });

  //OPTIONS NAV FUNCTIONALITY
  $(".plan__item").on("click", function () {
    const navData = $(this).attr("data-item");
    $("html,body").animate(
      {
        scrollTop: $(`#${navData}`).offset().top - 90,
      },
      1000
    );

    $(`#${navData}`).toggleClass("active");
    $(this).toggleClass("active");
  });

  //RESET DATA
  $("#checkoutBtn").on("click", function () {
    $(document.body).removeClass("showSummary");
    $("#planBtn").attr("disabled", true);
    $('input[type="radio"]').prop("checked", false);
    $(".plan__item").removeClass("active");
    $(".plan__box").removeClass("active");
    $(".plan__blank").text("_____");
    Object.keys(responses).forEach((key) => (responses[key] = undefined));
    setTimeout(() => {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
    }, 500);
  });
});
