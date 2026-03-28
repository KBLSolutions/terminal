import { type } from "../../util/io.js";
import { getScreen, clear } from "../../util/screens.js";

export const output = [];

export default async function botos() {
	clear();

	const screen = getScreen("botos-screen");
	screen.style.overflow = "auto";
	screen.style.padding = "12px";

	const content = document.createElement("div");
	content.style.whiteSpace = "pre-wrap";
	content.style.fontFamily = "monospace";
	content.style.margin = "0";
	screen.appendChild(content);

	const topText = document.createElement("div");
	content.appendChild(topText);

	await type(
		`> QUERY: BOTOS

ПОИСК ПО БАЗЕ ДАННЫХ...
СОВПАДЕНИЯ НАЙДЕНЫ

----------------------------------------
FULL NAME: IMRE BOTOS
ВОЗРАСТ: 33
`,
		{
			wait: 10,
			initialWait: 150,
			finalWait: 100,
			useContainer: true
		},
		topText
	);

	const image = document.createElement("img");
	image.src = "/img/botos.png";
	image.alt = "Imre Botos";
	image.style.display = "block";
	image.style.margin = "12px 0";
	image.style.maxWidth = "220px";
	image.style.border = "1px solid currentColor";
	image.style.background = "#000";
	content.appendChild(image);

	const bottomText = document.createElement("div");
	content.appendChild(bottomText);

	await type(
		`
ОПИСАНИЕ:
— мужчина
— длинные тёмные волосы
— жёсткие скулы
— чёткая линия челюсти
— тяжёлый, фиксирующий взгляд

ПРОФИЛЬ:
— бывший боевой инженер (USCMC)
— служба завершена с почётом

РЕЕСТР КОЛОНИИ:
— вернулся на Ариаркус ~3 года назад
— вскоре после прибытия исчез
— статус: местонахождение неизвестно

ТЕКУЩАЯ ОЦЕНКА:
— предполагаемый лидер повстанцев

ОЦЕНКА УГРОЗЫ:
ВЫСОКАЯ

РЕКОМЕНДАЦИЯ:
— при обнаружении: задержать
— возможное вооружённое сопротивление

----------------------------------------
СТАТУС:
АКТИВНЫЙ ОБЪЕКТ РОЗЫСКА

PRESS ANY KEY TO EXIT`,
		{
			wait: 10,
			initialWait: 50,
			finalWait: 150,
			useContainer: true
		},
		bottomText
	);

	await new Promise((resolve) => {
		const exit = () => {
			document.removeEventListener("keydown", exit);
			screen.remove();
			resolve();
		};

		document.addEventListener("keydown", exit, { once: true });
	});
}
