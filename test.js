// fetch("https://race.styc.org/race_info/Blakely Rock Benefit/2025/boats.csv").then((res) => {
//     console.log(res);
//     res.text().then((r) => {
//         console.log(r);
//     });
// });

const newBoat = {
    boatName: "Kari-J",
    info: {
        sailNumber: "none",
        boatType: "San Juan 28",
        skipper: "Parker"
    },
    photo: "none"
};

// fetch("https://regattamaster.boats/API/saveBoat.php", {
//     method: "POST",
//     body: JSON.stringify({
//         boatName: newBoat.boatName,
//         info: JSON.stringify(newBoat.info),
//         photo: newBoat.photo
//     })
// }).then((res) => {
//     res.json().then((r) => {
//         console.log(r);
//     });
// });

// fetch("https://regattamaster.boats/API/getAllBoats.php", {
//     method: "POST"
// }).then((res) => {
//     res.json().then((r) => {
//         console.log(r);
//     });
// });

fetch("https://regattamaster.boats/API/updateBoat.php", {
    method: "POST",
    body: JSON.stringify({
        id: 2,
        boatName: "Jerry-K",
        info: JSON.stringify(newBoat.info),
        photo: newBoat.photo
    })
}).then((res) => {
    res.json().then((r) => {
        console.log(r);
    });
});