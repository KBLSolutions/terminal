	await type(getMenuText(), {
		lineWait: 150,
		initialWait: 150,
		finalWait: 150
	});

	let answer = await prompt("SELECT RECORD:");
	answer = answer.trim().toLowerCase();

	if (answer === "exit") {
		await type("CLOSING STATUS DATABASE...");
		return;
	}

	const record = records.find((r) => r.id === answer);

	if (!record) {
		await type("INVALID RECORD ID");
		return;
	}

	clear();
	await type(record.text, {
		initialWait: 150,
		finalWait: 150
	});
}
