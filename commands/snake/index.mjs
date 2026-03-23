import { clear } from "../../util/screens.js";
import { waitForKey } from "../../util/io.js";

export const output = ["INITIALIZING USCMC RECREATION MODULE..."];

const WIDTH = 24;
const HEIGHT = 14;
const TICK = 120;

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function same(a, b) {
	return a.x === b.x && a.y === b.y;
}

function center(text, width) {
	const pad = Math.max(0, Math.floor((width - text.length) / 2));
	return " ".repeat(pad) + text;
}

function makeBoard(snake, food, score, state = "game") {
	let lines = [];

	lines.push("+" + "-".repeat(WIDTH) + "+");

	for (let y = 0; y < HEIGHT; y++) {
		let row = "|";

		for (let x = 0; x < WIDTH; x++) {
			if (state === "start") {
				row += " ";
				continue;
			}

			if (snake[0].x === x && snake[0].y === y) {
				row += "O";
			} else if (snake.slice(1).some((s) => s.x === x && s.y === y)) {
				row += "o";
			} else if (food.x === x && food.y === y) {
				row += "*";
			} else {
				row += " ";
			}
		}

		row += "|";
		lines.push(row);
	}

	lines.push("+" + "-".repeat(WIDTH) + "+");
	lines.push(center(`SCORE: ${score}`, WIDTH + 2));

	if (state === "start") {
		lines.push(center("USCMC TRAINING SIM: SNAKE", WIDTH + 2));
		lines.push(center("PRESS ANY KEY TO START", WIDTH + 2));
	}

	if (state === "gameover") {
		lines.push(center("GAME OVER", WIDTH + 2));
		lines.push(center('TYPE "snake" TO RESTART', WIDTH + 2));
	}

	return lines.join("\n");
}

function placeFood(snake) {
	let food;
	do {
		food = {
			x: rand(0, WIDTH - 1),
			y: rand(0, HEIGHT - 1)
		};
	} while (snake.some((s) => same(s, food)));
	return food;
}

function render(screen, snake, food, score, state) {
	screen.textContent = makeBoard(snake, food, score, state);
}

export default async function snake() {
	clear();

	const terminal = document.querySelector(".terminal");
	const screen = document.createElement("pre");
	screen.style.margin = "0";
	screen.style.whiteSpace = "pre";
	screen.style.fontFamily = "monospace";
	screen.style.lineHeight = "1";
	screen.style.display = "inline-block";
	terminal.appendChild(screen);

	let snake = [
		{ x: 12, y: 7 },
		{ x: 11, y: 7 },
		{ x: 10, y: 7 }
	];

	let dir = { x: 1, y: 0 };
	let nextDir = { x: 1, y: 0 };
	let food = placeFood(snake);
	let score = 0;

	render(screen, snake, food, score, "start");
	await waitForKey();

	const onKeyDown = (event) => {
		const key = event.key.toLowerCase();

		if ((key === "arrowup" || key === "w") && dir.y !== 1) {
			nextDir = { x: 0, y: -1 };
		} else if ((key === "arrowdown" || key === "s") && dir.y !== -1) {
			nextDir = { x: 0, y: 1 };
		} else if ((key === "arrowleft" || key === "a") && dir.x !== 1) {
			nextDir = { x: -1, y: 0 };
		} else if ((key === "arrowright" || key === "d") && dir.x !== -1) {
			nextDir = { x: 1, y: 0 };
		}
	};

	document.addEventListener("keydown", onKeyDown);

	await new Promise((resolve) => {
		const loop = setInterval(() => {
			dir = nextDir;

			const head = {
				x: snake[0].x + dir.x,
				y: snake[0].y + dir.y
			};

			const hitWall =
				head.x < 0 ||
				head.x >= WIDTH ||
				head.y < 0 ||
				head.y >= HEIGHT;

			const hitSelf = snake.some((s) => same(s, head));

			if (hitWall || hitSelf) {
				clearInterval(loop);
				document.removeEventListener("keydown", onKeyDown);
				render(screen, snake, food, score, "gameover");
				resolve();
				return;
			}

			snake.unshift(head);

			if (same(head, food)) {
				score++;
				food = placeFood(snake);
			} else {
				snake.pop();
			}

			render(screen, snake, food, score, "game");
		}, TICK);
	});

	await waitForKey();
}
