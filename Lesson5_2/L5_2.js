//GET
getMetod.onclick = function sendGetMetod() {

    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    let sumaUAN = document.getElementById("sumaUAN").value
    let nameValut = [["EUR", 'євро'], ["USD", 'дол'], ["RUR", "руб"]];
    let nameValutCurent = [];
    
    if (typeof (+sumaUAN) === 'number') {
        promiseGET(url)
            .then(function (response) {
                    let answer = JSON.parse(response);

                    let result = '';
                    for (let i = 0; i < answer.length; i++) {
                        nameValutCurent = nameValut.find(function (elem, id) {
                            if (elem[0] === answer[i].ccy) return true;
                        });

                        if (nameValutCurent !== undefined) {
                            result += sumaUAN + ' грн = ' + (sumaUAN / +answer[i].buy).toFixed(3) + ' ' + nameValutCurent[1] + '   <br><br>'
                        };
                    }
                    document.getElementById("result").innerHTML = result;

                },
                function (error) {
                    alert(error);
                });
    } else {
        document.getElementById("sumaUAN").style.background = 'rgb(250,200,200,0.5)';
        console.log(document.getElementById("sumaUAN").style.color);
       document.getElementById("sumaUAN").value = '';
    }
}

sumaUAN.onkeydown = function a() {
    document.getElementById("sumaUAN").style.background = 'white';
};
//
function promiseGET(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        }
        xhr.onerror = function () {
            reject(new Error('Nerwork error'));
        };
        xhr.send();
    });
}
