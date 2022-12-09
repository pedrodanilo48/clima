document.querySelector('.busca').addEventListener('submit', async (evento)=>{
    evento.preventDefault();

    let entrada = document.querySelector('#buscarEntrada').value;

    if(entrada !== '') {
        mostrarAviso('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(entrada)}&appid=7dd671ef277600273e84d5038e5fc419&units=metric&lang=pt_br`;
        let resultado = await fetch(url);
        let json = await resultado.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon
            })
        }else{
            showWarning("Não encontrado");
        }
    }
});
function showInfo(json){
    name: json.name,
    country: json.sys
}
function mostrarAviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}