import { translationsObj } from "./dict.js";

export function summaryCreator(city, count) {
	const summaryTitle = document.querySelector(".results-summary-title");
	const cityPill = document.querySelector(".summary-filters-wrapper");
	const totalCount = count.toLocaleString("pt-br", {
		minimumFractionDigits: 0,
	});

	if (city == "sao-paulo") {
		summaryTitle.innerHTML = `<strong class="results-summary-count">${totalCount}</strong> Imóveis à venda em São Paulo - SP`;
		cityPill.innerHTML = `<li class="summary-filters-pill"><span class="summary-filters-pill-span">São Paulo - SP &#10240;&#128937;</span></li>`;
	}
	if (city == "rio-de-janeiro") {
		summaryTitle.innerHTML = `<strong class="results-summary-count">${totalCount}</strong> Imóveis à venda em Rio de Janeiro - RJ`;
		cityPill.innerHTML = `<li class="summary-filters-pill"><span class="summary-filters-pill-span">Rio de Janeiro - RJ &#10240;&#128937;</span></li>`;
	}
}

export function cardCreator(data) {
	const resultsPanel = document.querySelector(".results-panel");
	resultsPanel.innerHTML = "";
	const errorDiv = document.querySelector(".error-div");
	errorDiv ? errorDiv.remove() : "";

	const apiData = data.search.result.listings;

	apiData.map((item) => {
		const cardContainer = document.createElement("div");
		const article = document.createElement("article");
		const imgContainer = document.createElement("div");
		const img = document.createElement("img");
		const infoDiv = document.createElement("div");

		cardContainer.classList.add("result-container");
		article.classList.add("result-article");
		imgContainer.classList.add("img-container");
		img.classList.add("loc-img");
		infoDiv.classList.add("loc-info");

		img.setAttribute("width", " 100%");
		img.setAttribute("height", "100%");
		img.setAttribute("src", `${item.medias[0].url}`);

		resultsPanel.append(cardContainer);
		cardContainer.append(article);
		article.append(imgContainer);
		imgContainer.append(img);
		article.append(infoDiv);

		const title = document.createElement("h2");
		const address = document.createElement("span");
		const mainTitle = document.createElement("span");
		const propertiesUl = document.createElement("ul");
		const amenitiesUl = document.createElement("ul");
		const pricingSection = document.createElement("section");
		const pricingDiv = document.createElement("div");
		const condoDiv = document.createElement("div");

		title.classList.add("card-title");
		address.classList.add("address-title");
		mainTitle.classList.add("main-title");
		propertiesUl.classList.add("prop-ul");
		amenitiesUl.classList.add("am-ul");
		pricingSection.classList.add("pricing-sec");
		pricingDiv.classList.add("pricing-div");
		condoDiv.classList.add("condo-div");

		infoDiv.append(title);
		title.append(address);
		title.append(mainTitle);
		infoDiv.append(propertiesUl);
		infoDiv.append(amenitiesUl);
		infoDiv.append(pricingSection);
		pricingSection.append(pricingDiv);
		pricingSection.append(condoDiv);

		address.innerText = `${item.link.data.city} - ${item.link.data.neighborhood} - ${item.link.data.street} - ${item.link.data.streetNumber} - ${item.link.data.zone}`;
		mainTitle.innerText = `${item.link.name}`;

		buildProps(item, propertiesUl);

		item.listing.amenities.map((value) => {
			const amLi = document.createElement("li");
			amLi.classList.add("am-li");
			amLi.innerText = `${translator(value)}`;
			amenitiesUl.append(amLi);
		});

		const price = item.listing.pricingInfos[0].price;
		const condoFee = item.listing.pricingInfos[0].monthlyCondoFee;

		pricingDiv.innerText = `R$ ${new Intl.NumberFormat().format(price)}`;
		if (condoFee) {
			condoDiv.innerHTML = `Condomínio: <strong style="font-weight:600;">R$ ${condoFee}</strong>`;
		}
	});
}

function buildProps(item, ul) {
	const props = ["m²", "Quartos", "Banheiros", , "Vagas"];
	props.map((val) => {
		const propLi = document.createElement("li");
		const propSpan1 = document.createElement("span");
		const propSpan2 = document.createElement("span");

		propSpan1.classList.add("f-prop-span");
		propSpan2.classList.add("s-prop-span");
		if (props.indexOf(val) == 0) {
			propSpan1.innerText = `${item.listing.usableAreas[0]} `;
		} else if (props.indexOf(val) == 1) {
			propSpan1.innerText = `${item.listing.bedrooms} `;
		} else if (props.indexOf(val) == 2) {
			propSpan1.innerText = `${item.listing.bathrooms} `;
		} else {
			propSpan1.innerText = `${item.listing.parkingSpaces} `;
		}
		propSpan2.innerText = val;

		propLi.append(propSpan1);
		propLi.append(propSpan2);
		ul.append(propLi);
	});
}

function translator(item) {
	return translationsObj
		.filter((str) => item === str.word)
		.reduce((ac, curr) => curr.translated, "");
}
