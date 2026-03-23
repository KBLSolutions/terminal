import { clear } from "../../util/screens.js";
import { waitForKey } from "../../util/io.js";

export const output = ["INITIALIZING USCMC RECREATION MODULE: PONG"];

const WIDTH = 34;
const HEIGHT = 18;
const TICK = 70;
const PADDLE_SIZE = 4;
const WIN_SCORE = 7;

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function center(text, width) {
	const pad = Math.max(0, Math.floor((width - text.length) / 2));
	return " ".repeat(pad) + text;
}

function makeBoard(state) {
	const {
		leftPaddle,
		rightPaddle,
		ball,
		playerScore,
		cpuScore,
		mode,
		message
	} = state;

	const lines = [];
	lines.push("+" + "-".repeat(WIDTH) + "+");

	for (let y = 0; y < HEIGHT; y++) {
		let row = "|";

		for (let x = 0; x < WIDTH; x++) {
			const onCenterLine = x === Math.floor(WIDTH / 2);

			const onLeftPaddle =
				x === 1 &&
				y >= leftPaddle &&
				y < leftPaddle + PADDLE_SIZE;

			const onRightPaddle =
				x === WIDTH - 2 &&
				y >= rightPaddle &&
				y < rightPaddle + PADDLE_SIZE;

			const onBall = x === ball.x && y === ball.y;

			if (mode === "start") {
				row += onCenterLine ? ":" : " ";
			} else if (onBall) {
				row += "O";
			} else if (onLeftPaddle || onRightPaddle) {
				row += "|";
			} else if (onCenterLine) {
				row += ":";
			} else {
				row += " ";
			}
		}

		row += "|";
		lines.push(row);
	}

	lines.push("+" + "-".repeat(WIDTH) + "+");
	lines.push(center(`PLAYER ${playerScore}   CPU ${cpuScore}`, WIDTH + 2));

	if (mode === "start") {
		lines.push(center("USCMC TRAINING SIM: PONG", WIDTH + 2));
		lines.push(center("W/S OR ARROW UP/DOWN", WIDTH + 2));
		lines.push(center("PRESS ANY KEY TO START", WIDTH + 2));
	} else if (mode === "gameover") {
		lines.push(center(message, WIDTH + 2));
		lines.push(center('TYPE "pong" TO RESTART', WIDTH + 2));
	}

	return lines.join("\n");
}

function render(screen, state) {
	screen.textContent = makeBoard(state);
}

function resetBall(direction = 1) {
	return {
		x: Math.floor(WIDTH / 2),
		y: Math.floor(HEIGHT / 2),
		vx: direction,
		vy: Math.random() > 0.5 ? 1 : -1
	};
}

export default async function pong() {
	clear();

	const terminal = document.querySelector(".terminal");
	const screen = document.createElement("pre");
	screen.style.margin = "0";
	screen.style.whiteSpace = "pre";
	screen.style.fontFamily = "monospace";
	screen.style.lineHeight = "1";
	screen.style.display = "inline-block";
	terminal.appendChild(screen);

	const state = {
		leftPaddle: Math.floor((HEIGHT - PADDLE_SIZE) / 2),
		rightPaddle: Math.floor((HEIGHT - PADDLE_SIZE) / 2),
		ball: resetBall(Math.random() > 0.5 ? 1 : -1),
		playerScore: 0,
		cpuScore: 0,
		mode: "start",
		message: ""
	};

	render(screen, state);
	await waitForKey();

	state.mode = "game";

	const onKeyDown = (event) => {
		const key = event.key.toLowerCase();

		if (key === "w" || key === "arrowup") {
			state.leftPaddle = clamp(state.leftPaddle - 1, 0, HEIGHT - PADDLE_SIZE);
		} else if (key === "s" || key === "arrowdown") {
			state.leftPaddle = clamp(state.leftPaddle + 1, 0, HEIGHT - PADDLE_SIZE);
		}
	};

	document.addEventListener("keydown", onKeyDown);

	await new Promise((resolve) => {
		const loop = setInterval(() => {
			// simple CPU movement
			const cpuCenter = state.rightPaddle + Math.floor(PADDLE_SIZE / 2);
			if (state.ball.y < cpuCenter) {
				state.rightPaddle = clamp(state.rightPaddle - 1, 0, HEIGHT - PADDLE_SIZE);
			} else if (state.ball.y > cpuCenter) {
				state.rightPaddle = clamp(state.rightPaddle + 1, 0, HEIGHT - PADDLE_SIZE);
			}

			let nextX = state.ball.x + state.ball.vx;
			let nextY = state.ball.y + state.ball.vy;

			// top/bottom bounce
			if (nextY < 0 || nextY >= HEIGHT) {
				state.ball.vy *= -1;
				nextY = state.ball.y + state.ball.vy;
			}

			// left paddle collision
			if (
				nextX === 1 &&
				nextY >= state.leftPaddle &&
				nextY < state.leftPaddle + PADDLE_SIZE
			) {
				state.ball.vx = 1;
				const offset = nextY - state.leftPaddle;
				if (offset === 0) state.ball.vy = -1;
				else if (offset === PADDLE_SIZE - 1) state.ball.vy = 1;
				nextX = state.ball.x + state.ball.vx;
			}

			// right paddle collision
			if (
				nextX === WIDTH - 2 &&
				nextY >= state.rightPaddle &&
				nextY < state.rightPaddle + PADDLE_SIZE
			) {
				state.ball.vx = -1;
				const offset = nextY - state.rightPaddle;
				if (offset === 0) state.ball.vy = -1;
				else if (offset === PADDLE_SIZE - 1) state.ball.vy = 1;
				nextX = state.ball.x + state.ball.vx;
			}

			// score check
			if (nextX < 0) {
				state.cpuScore++;
				if (state.cpuScore >= WIN_SCORE) {
					clearInterval(loop);
					document.removeEventListener("keydown", onKeyDown);
					state.mode = "gameover";
					state.message = "CPU WINS";
					render(screen, state);
					resolve();
					return;
				}
				state.ball = resetBall(1);
				render(screen, state);
				return;
			}

			if (nextX >= WIDTH) {
				state.playerScore++;
				if (state.playerScore >= WIN_SCORE) {
					clearInterval(loop);
					document.removeEventListener("keydown", onKeyDown);
					state.mode = "gameover";
					state.message = "PLAYER WINS";
					render(screen, state);
					resolve();
					return;
				}
				state.ball = resetBall(-1);
				render(screen, state);
				return;
			}

			state.ball.x = nextX;
			state.ball.y = nextY;

			render(screen, state);
		}, TICK);
	});

	await waitForKey();
}
