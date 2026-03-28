import { type } from "../../util/io.js";
import { getScreen, clear } from "../../util/screens.js";

export const output = [];

export default async function botos() {
	clear();

	const screen = getScreen("botos-screen");
	screen.style.overflow = "auto";
	screen.style.padding = "12px";

	const wrapper = document.createElement("div");
	wrapper.style.display = "flex";
	wrapper.style.gap = "16px";
	wrapper.style.alignItems = "flex-start";
	wrapper.style.flexWrap = "wrap";
	screen.appendChild(wrapper);

	const image = document.createElement("img");
	image.src = "img/Botos.PNG";
	image.alt = "Imre Botos";
	image.style.width = "220px";
	image.style.maxWidth = "100%";
	image.style.border = "1px solid currentColor";
	image.style.display = "block";
	image.style.objectFit = "cover";
	wrapper.appendChild(image);

	const content = document.createElement("div");
	content.style.whiteSpace = "pre-wrap";
	content.style.fontFamily = "monospace";
	content.style.margin = "0";
	content.style.flex = "1";
	content.style.minWidth = "280px";
	wrapper.appendChild(content);

	await type(
		`> QUERY: BOTOS

ПОИСК ПО БАЗЕ ДАННЫХ...
СОВПАДЕНИЯ НАЙДЕНЫ

----------------------------------------
FULL NAME: IMRE BOTOS
ВОЗРАСТ: 33

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
			initialWait: 150,
			finalWait: 150,
			wait: 10,
			useContainer: true
		},
		content
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
