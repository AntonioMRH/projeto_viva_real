import { cardCreator, summaryCreator } from "./factory.js";
import { createErrorElement } from "./errorHandler.js";
import { fetchData } from "./dataFetch.js";
import { getInputValue, parseInput } from "./inputHandler.js";

const form = document.querySelector("form");

let timer = null;

form.addEventListener("keyup", (evt) => {
	evt.preventDefault();
	clearInterval(timer);
	timer = setTimeout(async function () {
		const searchTerm = getInputValue();
		try {
			const url = `https://private-9e061d-piweb.apiary-mock.com/venda?`;
			const parsedInput = parseInput(searchTerm);
			const dataObj = await fetchData(url, parsedInput);
			summaryCreator(parsedInput, dataObj.search.totalCount);
			cardCreator(dataObj);
		} catch (error) {
			createErrorElement();
		}
	}, 1500);
});
