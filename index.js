const getBot = document.querySelectorAll("#get-bot");
const commands = document.getElementById("commands");
const cmdScreen = document.getElementById("cmd-screen");
const cmdList = document.getElementById("cmd-list");
const astronautHead = document.getElementById("astronaut-head");
const awakeBot = "./assets/Astronaut.png";
const sleepingBot = "./assets/Astronaut-sleeping.png";

const botURL =
  "https://discord.com/api/oauth2/authorize?client_id=958406193569738762&permissions=3155968&scope=bot";

getBot.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    astronautHead.style.backgroundImage = `url(${awakeBot})`;
  });
  btn.addEventListener("mouseleave", () => {
    astronautHead.style.backgroundImage = `url(${sleepingBot})`;
  });
  btn.addEventListener("click", () => {
    window.open(botURL);
  });
});

let mouseIn = false;
let commandOpen = false;
cmdList.addEventListener("mouseover", (_) => {
  mouseIn = true;
});
cmdList.addEventListener("mouseleave", (_) => {
  mouseIn = false;
});
commands.addEventListener("click", () => {
  if(!commandOpen) {
    openCommands();
    commandOpen = true;
  }
});
cmdScreen.addEventListener("click", (_) => {
  if (!mouseIn && commandOpen) {
    closeCommands();
    commandOpen = false;
  }
});

function openCommands() {
  cmdScreen.style.display = "block";
  cmdList.classList.remove("command-fadeout");
  cmdList.classList.add("command-fadein");
  cmdScreen.classList.remove("cmdscreen-fadeout");
  cmdScreen.classList.add("cmdscreen-fadein");
}
function closeCommands() {
  cmdList.classList.remove("command-fadein");
  cmdList.classList.add("command-fadeout");
  cmdScreen.classList.remove("cmdscreen-fadein");
  cmdScreen.classList.add("cmdscreen-fadeout");

  setTimeout(() => {
    cmdScreen.style.display = "none";
  }, 200);
}
