async function userLog() {
  const formLog = document.querySelector("#form-log");
  console.log(formLog);
  formLog.addEventListener("click", async function (event) {
    event.preventDefault();
    const emailLog = document.getElementById("email");
    const email = emailLog.value;
    console.log(email);
    const passwordLog = document.getElementById("password");
    const password = passwordLog.value;
    console.log(password);

    const iDLogin = { email: email, password: password };
    const chargeUtile = JSON.stringify(iDLogin);
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
    console.log(reponse);
    console.log(`status: ${reponse.status}`);
    const logToken = await reponse.json();
    console.log(logToken);
    console.log(logToken.token);

    window.localStorage.setItem("token", logToken.token);
    window.localStorage.getItem("token");

    const loginPage = document.querySelector(".log");
    if (reponse.status === 200) {
      window.location.href = "index.html";
      loginPage.innerHTML = "";
      loginPage.innerHTML = "connecté";
    } else {
      const errorLog = document.getElementById("error_log");
      errorLog.innerText ="Email ou Mot de passe incorrecte !";
      errorLog.style.color = "red";
      }
    });
}
const valueToken = window.localStorage.getItem("token");
console.log(valueToken);
if (valueToken === null) {
  userLog();
} else {
  window.location.href = "index.html";
  console.log("connecté");
}
