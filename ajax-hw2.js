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
                    for (let j =0; j<starShips.length; j++) {

                        $.ajax({
                            type: "GET",
                            url: starShips[j], // указываем URL
                            dataType: "json",
                            success: function (ship) {
                                arrStarShip.push(ship.name);

                            },
                            error: function (ship) {
                                console.log(ship);
                            }
                        });
                    }
                    obj.starshipName = arrStarShip;
                    console.log(obj);
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
    li.innerHTML = `<p>Имя: ${obj.name}</p><p>Пол: ${obj.gender}</p><p>Родной мир персонажа: ${obj.homeworld}</p>`;
    if (obj.starships.length !== 0) {
        const btn = document.createElement('button');
        btn.textContent= "Список кораблей";
        btn.setAttribute('data-name', ob.name);
        li.appendChild(btn);

        btn.addEventListener('click', function () {
            let targ = event.target;
            clickBtn(ob);
            showStarsipsName(ob, targ);
        });

    }
    ol.appendChild(li);
    list.appendChild(ol);
}

function clickBtn(obj) {
    $(event.target).replaceWith(`<h3 id="${obj.name}">Пилотируемые корабли: </h3>`);

}
function showStarsipsName(obj, place) {
    const olShip = document.createElement('ul');

    for (let k = 0; k < obj.starshipName.length; k++) {
        const liShip = document.createElement('li');
        liShip.textContent = obj.starshipName[k];
        olShip.appendChild(liShip)
    }
    const title = document.getElementsByTagName('h3');
    for (let r=0; r<title.length; r++)  {
        if(place.dataset.name == title[r].id) {
            $(olShip).insertAfter($(title[r]));
        }
    }
}





















// const list = document.getElementById('list');
// let ol = document.createElement('ol');
// //
// let obj = $.ajax({
//     type: "GET",
//     url: 'https://swapi.co/api/people/',
//     dataType: "json",
//     success: function(data) { // если запрос прошел удачно
//         // console.log(data);
//         // console.log(data);
//         let arr =data.results;
//         for ( let i =0; i< arr; i++) {
//             let objPers = {};
//             objPers.namePerson = arr[i].name;
//             objPers.genderPerson = arr[i].gender;
//             objPers.addressWorld = arr[i].homeworld;
//             console.log(objPers);
//         }
//         return data;
//     },
//     error: function(data) {
//         console.log(data);
//     }
// });
// let namePerson, genderPerson, addressWorld, nameWorld;
// console.log(obj);
// let arr = [];
// let resJson = JSON.parse(obj);
// console.log(resJson);
// for ( let i =0; i< obj.results; i++) {
//     let objPers = {};
//     objPers.namePerson = obj.results[i].name;
//     objPers.genderPerson = obj.results[i].gender;
//     objPers.addressWorld = obj.results[i].homeworld;
//     console.log(objPers);
// let world = $.ajax({
//     type: "GET",
//     url: `${obj.result[i].homeworld}`,
//     dataType: "json",
//     success: function (data) { // если запрос прошел удачно
//         // console.log(data);
//         console.log(data);
//     },
//     error: function (data) {
//         console.log(data);
//     }
// });
// objPers.nameWorld = world.results.name;
// console.log(objPers);
//     arr.push(objPers);
//     console.log(arr);
// }


// function render(name, gender, homeName) {
//     let li = document.createElement('li');
//     li.innerHTML = `<p>Имя: ${name}</p><p>Пол: ${gender}</p><p>Родной мир персонажа: ${homeName}</p>`;
//     ol.appendChild(li);
// }

