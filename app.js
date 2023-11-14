// const button = document.querySelector('button');
const searchBtn = document.getElementById('search');
const getJokeBtn = document.getElementById('getJokeBtn');
const jokeDiv = document.querySelector('.joke');
const selectCategory = document.querySelector('select');
const optionCategory = document.querySelector('option');
const currentCategory = null;
const input = document.querySelector('input');

const searchFunc = async () => {
	const searchInput = input.value;
	const res = await fetch(`https://api.chucknorris.io/jokes/search?query=${searchInput}`);
	const search = await res.json();
	jokeDiv.innerHTML = '';
	for (let i = 0; i < 5; i++) {
		console.log(search.result[i].value);
		const jokeP = document.createElement('p');
		// jokeP.textContent += search.result[i].value;
		jokeP.innerText += search.result[i].value;
		jokeDiv.appendChild(jokeP);
		jokeDiv.style.fontSize = '20px';
	}
};

searchBtn.addEventListener('click', searchFunc);

const getRandomJoke = async () => {
	const url = currentCategory ? `https://api.chucknorris.io/jokes/random?category=${currentCategory}` : 'https://api.chucknorris.io/jokes/random';
	const res = await fetch(url);
	const joke = await res.json();

	jokeDiv.innerText = joke.value;
};

const getJokeCategory = async () => {
	const res = await fetch('https://api.chucknorris.io/jokes/categories');
	const category = await res.json();
	console.log(category);
	for (let i = 0; i < category.length; i++) {
		const newOption = document.createElement('option');
		newOption.innerText = category[i];
		selectCategory.appendChild(newOption);
		newOption.value = category[i];
		// const valueOption = document.createAttribute('value');
		// valueOption.value = category[i];
		// newOption.setAttribute(valueOption);
		// console.log(newOption.getAttribute(category[i]));
	}
};

selectCategory.addEventListener('change', () => {
	currentCategory = selectCategory.value;
});

getJokeBtn.addEventListener('click', getRandomJoke);
// selectCategory.addEventListener('click', getJokeCategory);
// getJokeCategory();

document.addEventListener('DOMContentLoaded', getJokeCategory);
