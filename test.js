fetch("https://race.styc.org/race_info/Blakely Rock Benefit/2025/boats.csv").then((res) => {
    console.log(res);
    res.text().then((r) => {
        console.log(r);
    });
});