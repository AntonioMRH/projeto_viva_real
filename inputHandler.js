export function getInputValue() {
	const searchInput = document.querySelector("#main-input");
	const form = document.querySelector("form");
	const searchTerm = searchInput.value;
	form.reset();
	return searchTerm;
}

export function parseInput(str) {
	const sp = ["sp", "sao paulo", "são paulo"];
	const rj = ["rj", "rio de janeiro"];
	const fixedStr = str.trim().toLowerCase();

	if (sp.indexOf(fixedStr) !== -1) {
		return "sao-paulo";
	} else if (rj.indexOf(fixedStr) !== -1) {
		return "rio-de-janeiro";
	}
}
