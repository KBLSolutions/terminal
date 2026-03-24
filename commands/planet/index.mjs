import { type } from "../../util/io.js";
import { getScreen, clear } from "../../util/screens.js";

export const output = [];

export default async function briefing() {
	clear();

	const screen = getScreen("briefing-screen");
	screen.style.overflow = "auto";

	const content = document.createElement("div");
	content.style.whiteSpace = "pre-wrap";
	content.style.fontFamily = "monospace";
	content.style.margin = "0";
	screen.appendChild(content);

	await type(

`АРИАРКУС (KRUGER-60 AEM)
ТИП: ЛЕДЯНАЯ ЛУНА
ОРБИТА: ГАЗОВЫЙ ГИГАНТ «OBLIVION»

СТАТУС: КОЛОНИЯ В УПАДКЕ
НАСЕЛЕНИЕ: ~2 000 (СНИЖЕНИЕ С ~200 000)

ЭКОНОМИКА:
— НЕФТЕДОБЫЧА (ИСТОРИЧЕСКИ — ЧАСТНАЯ 
СОБСТВЕННОСТЬ КОЛОНИСТОВ)
— ПЕРЕХОД ПОД ВОЕННЫЙ КОНТРОЛЬ
— РЕЗКОЕ ПАДЕНИЕ ДОХОДОВ

ПРИЧИНЫ ДЕСТАБИЛИЗАЦИИ:
— НАЦИОНАЛИЗАЦИЯ АКТИВОВ
— ПОТЕРЯ РАБОЧИХ МЕСТ
— ВВЕДЕНИЕ ЛОТЕРЕИ ТРУДОУСТРОЙСТВА
— МАССОВЫЙ ОТТОК НАСЕЛЕНИЯ
— ОБНИЩАНИЕ ОСТАВШИХСЯ КОЛОНИСТОВ

ПОВСТАНЦЫ:
— БЫВШИЕ КОЛОНИСТЫ И РАБОЧИЕ
— НЕДОВОЛЬНЫЕ ВОЕННЫМ КОНТРОЛЕМ
— ПОДДЕРЖКА СО СТОРОНЫ UPP

АКТИВНОСТЬ:
— САБОТАЖ НЕФТЯНЫХ ПОЛЕЙ
— НАПАДЕНИЯ НА ИНФРАСТРУКТУРУ
— ДЕЙСТВИЯ В ЗАБРОШЕННЫХ СЕКТОРАХ

УСЛОВИЯ:
— ТЕМПЕРАТУРА: −23°C ДО 0°C
— ПОСТОЯННЫЕ СУМЕРКИ
— НИЗКАЯ ВИДИМОСТЬ

ИНФРАСТРУКТУРА:
— ФОРТ НЕБРАСКА (ВОЕННЫЙ УЗЕЛ)
— КОСМИЧЕСКИЙ ЛИФТ (КЛЮЧЕВАЯ ТОЧКА)
— ЗАБРОШЕННЫЕ ЖИЛЫЕ РАЙОНЫ

СТРАТЕГИЧЕСКИЙ СТАТУС:
— УГРОЗА ВТОРЖЕНИЯ UPP
— ЭВАКУАЦИЯ ПРИОСТАНОВЛЕНА
— РИСК ВОССТАНИЯ ВНУТРИ КОЛОНИИ

----------------------------------------
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
