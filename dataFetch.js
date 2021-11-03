function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}

export async function fetchData(url, city) {
	const cities = {
		sp: "sao-paulo",
		rj: "rio-de-janeiro",
	};
	const state = getKeyByValue(cities, city);
	const response = await fetch(url + `state=${state}&city=${city}`);
	return await response.json();
}
