$(function () {
    var $carsContainer = $("#cars-container");
    $.ajax({
        url: "/profile/getall/cars/from/db/by/ajax",
        method: "GET",
        // contentType: "application/json",
        success: function (cars) {
            let $list = $("<ul>");

            $(cars).each(function (index, car) {
                if (!car.imgUrl == undefined) {
                    car.imgUrl = "http://www.bmw.co.uk/vc/resources/img/no_img.png";
                };
                $("<li/>")
                    .addClass("cars-item")
                    .append(
                    $("<a>")
                        .attr('href', "/cars/" + car.id)
                        .append($("<p>")
                            .addClass("car-Mileage")
                            .html(car.Price + "€"))
                        .append($("<img>")
                            .addClass("car-img")
                            .attr('src', car.imgUrl))
                        // .append($("<p>")
                        //     .addClass("car-Mileage")
                        //     .html(car.Price))
                        .append($("<h3>")
                            .html(car.Makes)
                            .append($("<nav>")
                                .html(car.Mileage + "km")
                                .addClass("car-Mileage")
                            ).addClass("center-text"))
                        .append($("<nav>")
                            .html(car.location)
                            .addClass("car-Mileage")
                        )
                    ).appendTo($list).addClass("ul-cars")

            });

            $carsContainer.html($list.html());
        }
    });

    var $loggedINmessage = $("#something");
    $.ajax({
        url: "/profilemassage/ajax/massage",
        method: "GET",
        success: function (massage) {
            $loggedINmessage.html(massage);
        }
    });

});