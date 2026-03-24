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

`SQUAD STATUS

LOADING UNIT DATA...
ACCESS LEVEL VERIFIED

----------------------------------------
UNIT DESIGNATION: CHARLIE SQUAD
----------------------------------------

STATUS: OPERATIONAL
STRENGTH: 7/7

[DISPLAYING PERSONNEL...]

----------------------------------------
СИЛЬВА, ГАБРИЭЛЬ
ЗВАНИЕ: КАПИТАН
РОЛЬ: ПОЛЕВОЙ КОМАНДИР

----------------------------------------
МЭЙСОН, ЛУКА
ЗВАНИЕ: ГАННЕРИ-СЕРЖАНТ
РОЛЬ: КОМАНДИР ОТДЕЛЕНИЯ / СПЕЦИАЛИСТ CBRN

----------------------------------------
ИОНА, КАЛЕ
ЗВАНИЕ: СЕРЖАНТ
РОЛЬ: ОПЕРАТОР СМАРТГАНА

----------------------------------------
ЧАПЛИН
ЗВАНИЕ: УОРРЕНТ-ОФИЦЕР
РОЛЬ: БОЕВОЙ ТЕХНИК / МЕДИК

----------------------------------------
ДАНТЕ, РУТГЕР
ЗВАНИЕ: РЯДОВОЙ ПЕРВОГО КЛАССА
РОЛЬ: ШТУРМОВИК

----------------------------------------
ЗМИЕВСКИ, СТЭНЛИ
ЗВАНИЕ: РЯДОВОЙ ПЕРВОГО КЛАССА
РОЛЬ: СТРЕЛОК

----------------------------------------
ХАММЕР, НАТАНАЙЭЛ
ЗВАНИЕ: РЯДОВОЙ
РОЛЬ: ОПЕРАТОР СМАРТГАНА

----------------------------------------
END OF FILE

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

