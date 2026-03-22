import pause from "./pause.js";

const urlParams = new URLSearchParams(window.location.search);
const debugParam = urlParams.get("debug") ?? false;

const adverts = [
	"Weyland-Yutani - Secure the frontier. Whatever it takes.",
"Weyland-Yutani - Building Better Worlds for those who survive.",
"USCMC - First in. Last out.",
"USCMC - No bugs, no problems.",
"Seegson - Reliability you can trust in the dark.",
"Seegson Synthetics - They work. You survive.",
"Hyperdyne Systems - Your last line of defense.",
"Hyperdyne Systems - When humans fail, we don’t.",
"Armat Battlefield Systems - Stay alive longer.",
"Armat - Built for war. Proven in hell.",
"Henjin-Garcia Armament Co. - End the fight fast.",
"Henjin-Garcia - One shot is enough.",
"Kerchner Ammunition - Make every round count.",
"Kerchner - They won’t get back up.",
"Gates-Heidman Propulsion - Get in. Get out.",
"Gates-Heidman - Faster than fear.",
"Laratel Fusion Reactors - Power under pressure.",
"Laratel - When everything else fails.",
"Throop Rescue & Recovery - We come if you’re still breathing.",
"Throop - Extraction is not guaranteed.",
"San Cristobal Medical - We fix what’s left.",
"San Cristobal Medical - Try not to need us.",
"Arious Motion Trackers - If it moves, you’ll know.",
"Arious - They’re already closer than you think.",
"Gemba SysTec - Track it. Hunt it. Kill it.",
"Spearhead Armoury - Go loud or go home.",
"Spearhead - Overkill is underrated.",
"Weyland Drilling Corp - Dig deep. They’re down there.",
"Borgia Industries - Quiet solutions for loud problems.",
"Zippo - Light your way. Or your last stand.",
"CuppaJoe - Stay awake. Stay alive.",
"CuppaJoe - Sleep is how they get you.",
"Souta Dry - One drink before deployment.",
"Souta Lager - If you make it back.",
"Samani - Time matters. Yours is running out.",
"Aten Medical - See what’s inside. If you dare."
];

async function advert(pauseDuration) {
	if (!debugParam && Math.floor(Math.random() * 3) === 0) {
		let terminal = document.querySelector(".terminal");
		let access = document.createElement("div");
		access.setAttribute("class", "access-granted");
		const text = adverts[Math.floor(Math.random() * adverts.length)];
		access.innerHTML = "advert<br/>" + text;
		terminal.appendChild(access);
		await pause(pauseDuration);
		access.remove();
	}
}

export default advert;
