window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureSpan = document.querySelector('.temperature span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/02cb764404b9df0b2a7a14137c930726/${lat},${long}`;
			fetch(api)
			  .then(response =>{
			  	return response.json();
			  })
			  .then(data => {
			  	const {temperature, summary, icon} = data.currently;
			  	//Set DOM elements from API
			  	temperatureDegree.textContent = temperature;
			  	temperatureDescription.textContent = summary;
			  	locationTimezone.textContent = data.timezone;

			  	//celsius formula
			  	let celsius = (temperature - 32) * (5 / 9);
			  	//set icons
			  	setIcons(icon, document.querySelector('.icon'));

			  	//Change temperature to Celsius/Fahrenheit
			  		temperatureSection.addEventListener("click", () => {
			  			if(temperatureSpan.textContent === "F"){
			  				temperatureSpan.textContent = "C";
			  				temperatureDegree.textContent = Math.floor(celsius);
			  			}
			  			else{
			  				temperatureSpan.textContent = "F";
			  				temperatureDegree.textContent = temperature;
			  			}
			  		});
				});
		});
		
	}
	else{
		h1.textContent = "Geolocation not turned on";
	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color : "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});