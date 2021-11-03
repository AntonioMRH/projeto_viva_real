export function createErrorElement() {
	const resultsPanel = document.querySelector(".results-panel");
	const summaryWrapperTitle = document.querySelector(".results-summary-title");
	const summaryWrapperFilters = document.querySelector(
		".summary-filters-wrapper"
	);
	resultsPanel.innerHTML = "";
	summaryWrapperTitle ? (summaryWrapperTitle.innerHTML = "") : "";
	summaryWrapperFilters ? (summaryWrapperFilters.innerHTML = "") : "";
	const errorDiv = document.createElement("div");
	errorDiv.classList.add("error-div");
	resultsPanel.append(errorDiv);

	const firstM = document.createElement("h1");
	firstM.classList.add("error-text");
	firstM.innerText = "OOOOPS!";

	const secM = document.createElement("h1");
	secM.classList.add("error-text");
	secM.innerText = "ALGO DEU ERRADO NA SUA BUSCA.";

	const thirdM = document.createElement("h2");
	thirdM.classList = "red error-text";
	thirdM.innerText = "Status 500";

	const fourthM = document.createElement("h1");
	fourthM.classList.add("error-text");
	fourthM.innerText = "POR FAVOR TENTE NOVAMENTE.";

	errorDiv.append(firstM, secM, thirdM, fourthM);
}
