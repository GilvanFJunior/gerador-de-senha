function getCharTypes() {
  const uppercase = document.querySelector("#include_uppercase").checked;
  const lowercase = document.querySelector("#include_lowercase").checked;
  const number = document.querySelector("#include_number").checked;
  const specialCharacter = document.querySelector(
    "#include_special_caractere"
  ).checked;

  const charTypes = [];

  if (uppercase) {
    charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }

  if (lowercase) {
    charTypes.push("abcdefghijklmnopqrstuvwxyz");
  }
  if (number) {
    charTypes.push("0123456789");
  }
  if (specialCharacter) {
    charTypes.push("!@#$%^&*()_+-=[]\\{}|;:' .,<>?/~");
  }
  return charTypes;
}

function getPasswordSize() {
  const size = document.querySelector("#size").value;
  if (isNaN(size) || size < 4 || size > 128) {
    message("Dite um número entre 4 e 128!", "danger");
  }
  return size;
}

function randomCharType(charTypes) {
  const randomIndex = Math.floor(Math.random() * charTypes.length);

  return charTypes[randomIndex][
    Math.floor(Math.random() * charTypes[randomIndex].length)
  ];
}

function generatePassword(size, charTypes) {
  let passwordGenerated = "";

  const selectedChars = charTypes.join("");

  charTypes.forEach((type) => {
    passwordGenerated += type[Math.floor(Math.random() * type.length)];
  });
  while (passwordGenerated.length < size) {
    passwordGenerated +=
      selectedChars[Math.floor(Math.random() * selectedChars.length)];
  }
  passwordGenerated = passwordGenerated
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return passwordGenerated;
}

function message(text, status = "sucess") {
  Toastify({
    text: text,
    duration: 3000,
    style: {
      background: status === "sucess" ? "#84cc16" : "#dc2626",
      boxShadow: "none",
    },
  }).showToast();
}

document.querySelector("#generate").addEventListener("click", function () {
  const size = getPasswordSize();
  const charTypes = getCharTypes();

  if (!size) {
    return;
  }
  if (!charTypes.length) {
    message("Selecione ao menos um tipo de caractere", "danger");
    return;
  }

  const passwordGenerated = generatePassword(size, charTypes);

  document.querySelector("#password_container").classList.add("show");
  document.querySelector("#password").textContent = passwordGenerated;
});

document.querySelector("#copy").addEventListener("click", function () {
  navigator.clipboard.writeText(
    document.querySelector("#password").textContent
  );
  message("Senha Copiada", "sucess");
});