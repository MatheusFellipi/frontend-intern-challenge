// variaveis html
let form = document.querySelector('#forms')
let inputURL = document.querySelector('#encurte')
let totalDeCliques = document.querySelector('.cliques-links')
let btn = document.querySelector('.btnEncurta')
let btnlimpar = document.querySelector('.btnFechar')
let btntroca = document.querySelector('#troca')

// img
let imgADD = '../Assets/fechar.png'

// chama o arquivo json
var url = './urls.json'
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();

//pega o valor do html
form.addEventListener('submit', (event) => {
    geturl()
    event.preventDefault()
})
btnlimpar.addEventListener('click', (event) => {
    inputURL.value = '';
    btntroca.innerHTML = 'ENCURTAR'
    event.preventDefault()
})

//encurta a pega a shortUrl do json
const geturl = request.onload = (url) => {
    let data = request.response;
    const encurtaUrl = inputURL;

    let shortUrlp;
    console.log(data);


    if (encurtaUrl.value) {

        btntroca.classList.add('fa-blink')
        btnlimpar.classList.add('fa-blink')
        inputURL.classList.add('fa-blink')
        inputURL.classList.add('mudarInput');



        var time = setTimeout(() => {
            data.forEach((url) => {
                if (encurtaUrl.value == url.url) {


                    encurtaUrl.value = url.shortUrl;

                    btn.classList.add('mudarBtn');

                    btntroca.innerHTML = "COPIAR"
                    btnlimpar.classList.add('btnFecharAparecer')

                    inputURL.value = url.shortUrl;
                    inputURL.classList.add('mudarInput1');

                }

            })

        }, 990);
    }

    console.log(time);
}



const getHits = request.onload = () => {
    let data = request.response;
    //console.log(data);
    var totalArr = [];
    var total = 0;
    let arrHits = []
    let addDiv;
    let textLi;
    let addSpan;
    let textSpan;


    // chama a funcao de sort
    data.sort(sortJson("hits"))
        //console.log(data);

    //mostra os top 5
    data.forEach((url) => arrHits.push(url.hits));
   // console.log(arrHits);
    data.forEach(url => {
        for (var i = 0; i < 5; i++) {

            if (arrHits[i] == url.hits) {
                //console.log(arrHits[i] + `${url.url} hist ${url.hits}`);

                addDiv = document.createElement('div')
                addSpan = document.createElement('span')

                textLi = document.createTextNode(`${url.shortUrl}`)
                textSpan = document.createTextNode(`${url.hits}`)

                addDiv.appendChild(textLi)
                addSpan.appendChild(textSpan)

                document.querySelector('.top_Cinco').appendChild(addDiv).classList.add('url_top')
                document.querySelector('.top_Cinco').appendChild(addSpan).classList.add('hits_top')

            }
        }
    })

    //mostra o total de hits
    data.forEach((url) => totalArr.push(url.hits))
    for (var i = 0; i < totalArr.length; i++)
        total = total + totalArr[i]

    totalDeCliques.innerHTML = total;

}


//organiza a json maior para menor
// (a, b) for <0, então a será classificado para um índice inferior a b. Assim, um virá primeiro.
// (a, b) for> que 0, então b será classificado para um índice inferior a a. Portanto, b virá primeiro.
function sortJson(prop) {
    return function(a, b) {
        if (a[prop] < b[prop]) {

            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;
    }
}


function showScreenResults(results) {

}