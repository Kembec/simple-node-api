document.getElementById("createUserForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = document.getElementById("createEmail").value;
	const password = document.getElementById("createPassword").value;
	const name = document.getElementById("createName").value;
	const lastName = document.getElementById("createLastName").value;

	const response = await fetch("/api/v1/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password, name, lastName }),
	});
	const data = await response.json();

	document.getElementById("response").appendChild(makeBlockCode(data));

	// eslint-disable-next-line no-undef
	Prism.highlightAll();
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = document.getElementById("loginEmail").value;
	const password = document.getElementById("loginPassword").value;

	const response = await fetch("/api/v1/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();

	document.getElementById("response").appendChild(makeBlockCode(data));
	// eslint-disable-next-line no-undef
	Prism.highlightAll();
});

document.getElementById("deleteUserForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const id = document.getElementById("deleteUserId").value;

	const response = await fetch(`/api/v1/users/${id}`, {
		method: "DELETE",
	});
	const data = await response.json();

	document.getElementById("response").appendChild(makeBlockCode(data));
	// eslint-disable-next-line no-undef
	Prism.highlightAll();
});

function makeBlockCode(data) {
	const pre = document.createElement("pre");
	const code = document.createElement("code");
	code.className = "language-json";
	code.textContent = JSON.stringify(data, null, 4);

	pre.appendChild(code);

	return pre;
}
