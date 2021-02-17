$(document).ready(function() {
    $("#tabs").tabs();
    $(".location__counrty").html($("#country-change option:selected").html());
    
    function getRequest() { 
        $(".location__city").html($("#city option:selected").html());
        $(".tabs-active-city").html($("#city option:selected").html());
        $.get(
            // "http://api.openweathermap.org/data/2.5/forecast?q=Moscow,ru&appid=765d4b04d523ef3ec636b57484e5cb1a",
            "https://api.openweathermap.org/data/2.5/forecast",
            {
                "q": $("#city option:selected").html() + "," + $("#country-change option:selected").val(),
                "appid": "765d4b04d523ef3ec636b57484e5cb1a"
            },
            function (data) {
                let out = "";
                function weatherFiveDays(a, i) {
                    // давление
                    $(".tabs-" + a +"-weather__pressure span").html(Math.round(data.list[i].main.pressure*0.00750063755419211*100));
                    // Влажность
                    $(".tabs-" + a +"-weather__temp span").html(data.list[i].main.humidity);
                    // ветер
                    $(".tabs-" + a +"-weather__wind span").html(data.list[i].wind.speed);

                    // Температура основная
                    out = Math.round(data.list[i].main.temp-273);
                    if(out > 0) {
                        $(".tabs-" + a +"-weather__icon p span").html("+" + out);
                    } else if (out < 0) {
                        $(".tabs-" + a +"-weather__icon p span").html(out);
                    } else {
                        $(".tabs-" + a +"-weather__icon p span").html(out);
                    }

                    // Осадки
                    $(".tabs-" + a +"-weather__main span").html(data.list[i].weather[0].main);
                    $(".tabs-" + a +"-weather__icon img").attr("src", "./img/weather-icon/" + data.list[i].weather[0].icon + ".png");
                    $(".tabs-1" + a + "-weather").html(data.list[i].weather[0].main);
                }
                weatherFiveDays(2, 0);
                weatherFiveDays(1, 8);
                weatherFiveDays(3, 16);
                weatherFiveDays(4, 24);
                weatherFiveDays(5, 32);
                
                function weatherHourly(n) {
                    for(let i = 1; i <= 6; i++) {
                        // осадки почасовка 1й день
                        $(".tabs-0_table_icon" + i +" div").html(data.list[n].weather[0].main);
                        $(".tabs-0_table_icon" + i +" img").attr("src", "./img/weather-icon/" + data.list[n].weather[0].icon + ".png");
                        // температура почасовка 1й день
                        out = Math.round(data.list[n].main.temp-273);
                        if(out > 0) {
                            $(".tabs-0_table_temp"+i).html("+" + out);
                        } else if (out < 0) {
                            $(".tabs-0_table_temp"+i).html("-" + out);
                        } else {
                            $(".tabs-0_table_temp"+i).html(out);
                        }
                        // ветер 1й день почасовка
                        $(".tabs-0_table_wind"+i).html(data.list[n].wind.speed);
                        //время почасовка
                        let time = data.list[n].dt_txt;
                        $(".tabs-0_table_time"+i).html(time[11] + time[12] + time[13]+time[14]+time[15]);
                        
                        n++;
                    }
                };
                weatherHourly(0);
                $("#tabs-4-link, #tabs-7-link").click(function() {
                    weatherHourly(0);  
                });
                $("#tabs-5-link, #tabs-8-link").click(function() {
                    weatherHourly(6);
                });
                $("#tabs-6-link, #tabs-9-link").click(function() {
                    weatherHourly(14);
                });
                $("#tabs-10-link").click(function() {
                    weatherHourly(22);
                });
                $("#tabs-11-link").click(function() {
                    weatherHourly(30);
                });
                // Вывод даты
                function setDate(index, num) {
                    let day = data.list[index].dt_txt;
                    let month = "января";   
                    if(day[5] == "0") {
                        if(day[6] == "1") {
                            month = " января";
                        } else if(day[6] == "2") {month = " февраля"}
                        else if(day[6] == "3") {month = " марта"}
                        else if(day[6] == "4") {month = " апреля"}
                        else if(day[6] == "5") {month = " мая"}
                        else if(day[6] == "6") {month = " июня"}
                        else if(day[6] == "7") {month = " июля"}
                        else if(day[6] == "8") {month = " августа"}
                        else if(day[6] == "9") {month = " сентября"}
                    } else {
                        if(day[6] == "0") {
                            {month = " октября"}
                        } else if(day[6] == "1") {month = " ноября"}
                        else if(day[6] == "2") {month = " декабря"}
                    }
                    $(".tabs-2-menu__time"+num).html(day[8] + day[9] + month);
                };
                setDate(0, 1);
                setDate(8, 2);
                setDate(16, 3);
                setDate(24, 4);
                setDate(32, 5);
                console.log(data);

            }
        )
        // autocomplete
        let cityName = [];
        $('#city option').each(function(){
            cityName.push(this.text);
            });
        console.log(cityName);
        $( "#city" ).autocomplete({
            source: cityName,
            delauy: 5000
          });

        // запрос на другие города
        let count = 0;
        for(let i = 0; i < $("#city option").length; i++) {
            count++;     
        }
        
        
        for(let i =  1; i <= 3; i++) {
            $.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                {
                    "q": document.getElementById("city")[(randomInteger(1, count)) - 1].innerHTML + "," + $("#country-change option:selected").val(),
                    "appid": "765d4b04d523ef3ec636b57484e5cb1a"
                },
                function(data) {
                    $(".anotherСity"+i).html(data.city.name);
                    out = Math.round(data.list[0].main.temp-273);
                    if(out > 0) {
                        $(".anotherСity_desc"+i+" p span").html("+" + out);
                    } else if (out < 0) {
                        $(".anotherСity_desc"+i+" p span").html("-" + out);
                    } else {
                        $(".anotherСity_desc"+i+" p span").html(out);
                    }
                    $(".anotherСity_desc"+i+" img").attr("src", "./img/weather-icon/" + data.list[0].weather[0].icon + ".png");
                }
            )
        } 
    }
    getRequest(city);

    // смена города по клику на дополнительный город
    $(".anotherСity1").click(function(e) {
        $("#city option:selected").html($(this).html());
        getRequest();
    });
    $(".anotherСity2").click(function(e) {
        $("#city option:selected").html($(this).html());
        getRequest();
    });
    $(".anotherСity3").click(function(e) {
        $("#city option:selected").html($(this).html());
        getRequest();
    });

    // подключение API
    $.getJSON("./current.city.list.json", function(data) {
        $("#country-change").on("change", function () {
        $(".location__counrty").html($("#country-change option:selected").html());
        var out = "";
        for(var key in data) {
            if(data[key].country==$("#country-change option:selected").val()) {
            out += `<option value="${data[key].id}">${data[key].name}</option>`;
            }
        }
        $("#city").html(out);
       
        $("#city").on("change", getRequest);

        });
    });

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }



});
