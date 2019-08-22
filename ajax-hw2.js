const list = document.getElementById('list');
const ol = document.createElement('ol');
$.ajax({
    type: "GET",
    url: 'https://swapi.co/api/people/', // указываем URL
    dataType: "json",
    success: function(data) { // если запрос прошел удачно
        const dt = data.results;
        for ( let i =0; i < dt.length; i++) {
            const homeWorld = dt[i].homeworld;
            const starShips = dt[i].starships;
            $.ajax({
                type: "GET",
                url: homeWorld, // указываем URL
                dataType: "json",
                success: function (home) {
                    let obj = {
                        name: dt[i].name,
                        gender: dt[i].gender,
                        homeworld: home.name,
                        starships: dt[i].starships
                    };
                    render(obj);
                    const arrStarShip = [];
                    const arrStarShipObj = [];
                    for (let j = 0; j < starShips.length; j++) {

                        $.ajax({
                            type: "GET",
                            url: starShips[j], // указываем URL
                            dataType: "json",
                            success: function (ship) {
                                arrStarShipObj.push(ship);
                                arrStarShip.push(ship.name);

                            },
                            error: function (ship) {
                                console.log(ship);
                            }
                        });
                    }
                    obj.arrStarShips = arrStarShipObj;
                    obj.starshipName = arrStarShip;
                },
                error: function (home) {
                    console.log(home);
                }
            });
        }
    },
    error: function(data) {
        console.log(data);
    }
});

function render(obj) {
    const ob = obj;
    const li = document.createElement('li');
    li.innerHTML = `<p>Имя: ${ob.name}</p><p>Пол: ${ob.gender}</p><p>Родной мир персонажа: ${ob.homeworld}</p>`;
    if ($(ob.starships).length !== 0) {
        const btn = document.createElement('button');
        $(btn).text("Список кораблей");
        $(btn).attr('data-name', ob.name);
        $(li).append($(btn));

        $(btn).click(function () {
            let targ = event.target;
            clickBtn(ob);
            showStarsipsName(ob, targ);
        });

    }
    $(ol).append($(li));
    $(list).append($(ol));
}

function clickBtn(obj) {
    $(event.target).replaceWith(`<h3 id="${obj.name}">Пилотируемые корабли: </h3>`);

}
function showStarsipsName(obj, place) {
    const olShip = document.createElement('ul');

    for (let k = 0; k < obj.starshipName.length; k++) {
        const liShip = document.createElement('li');
        let a = document.createElement("a");
        $(a).html(`${obj.starshipName[k]}`);
        $(a).attr("href", "#");
        $(a).click(function () {
            clickLink(obj)
        });
        $(liShip).append($(a));
        $(olShip).append($(liShip));
    }
    const title = document.getElementsByTagName('h3');
    for (let r = 0; r < title.length; r++)  {
        if(place.dataset.name == title[r].id) {
            $(olShip).insertAfter($(title[r]));
        }
    }
}

function clickLink(obj) {
 const link = document.getElementsByTagName('a');
    for (let r = 0; r < link.length; r++)  {
        if (event.target == link[r]) {
            link[r].style.color = "green";
            rendlerListLink(obj);
        }
    }
}
function rendlerListLink(obj) {
    const liShipDetailsList = document.createElement("ul");
let targetLink = $(event.target).text();
let trg = event.target;

    for (let r = 0; r < obj.arrStarShips.length; r++)  {
        if (targetLink == obj.arrStarShips[r].name) {
            let liShipDetails = document.createElement('li');
            $(liShipDetails).html(`<p>Модель: ${obj.arrStarShips[r].model}</p><p>Класс: ${obj.arrStarShips[r].starship_class}</p><p>К-во пасажиров: ${obj.arrStarShips[r].passengers}</p>`);
            $(liShipDetailsList).append($(liShipDetails));
            $(liShipDetailsList).insertAfter($(trg));
        }
    }
}
