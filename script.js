document.querySelector('.busca').addEventListener('submit', async (evento)=>{
    evento.preventDefault();

    let entrada = document.querySelector('#buscarEntrada').value;

    if(entrada !== '') {
        limparInfo();
        mostrarAviso('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(entrada)}&appid=7dd671ef277600273e84d5038e5fc419&units=metric&lang=pt_br`;
        let resultado = await fetch(url);
        let json = await resultado.json();

        if(json.cod === 200) {
            mostrarInfo({
                nome: json.name,
                pais: json.sys.country,
                temperatura: json.main.temp,
                temperaturaIcone: json.weather[0].icon,
                velocidadeVento: json.wind.speed,
                anguloVento: json.wind.deg
            });
        }else{
            limparInfo("");
            mostrarAviso("Não encontrado");
        }
    }
});
function mostrarInfo(json){
    mostrarAviso('');
    
    document.querySelector(".titulo").innerHTML = `${json.nome}, ${json.pais}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temperatura}<sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.velocidadeVento}<span>km/h</span>`;
    document.querySelector(".temp img").setAttribute('src', `http://openweathermap.org/img/wn/${json.temperaturaIcone}@2x.png`);
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.anguloVento-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}
function limparInfo() {
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'none';
}
function mostrarAviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}