// ==UserScript==
// @name         Lovey Mod - New The End Hack of sploop.io!
// @namespace    http://tampermonkey.net/
// @version      Final Edition probably
// @description  https://loveymod.glitch.me
// @author       ilyax
// @require      https://cdn.jsdelivr.net/npm/msgpack-lite@0.1.26/dist/msgpack.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @require       https://code.jquery.com/ui/1.13.2/jquery-ui.min.js
// @match        https://sploop.io/
// @icon         https://sploop.io/img/ui/favicon.png
// @grant        none
// ==/UserScript==
/*

    Name: Lovey Mod
    Author: Ilyax
    Version: Final vNAB (Non-Antiban version)

    Credits:
    Ilyax: Owner, Everything is by me, menu, and all
    Bianos: Developer, Websockets setted up by him. and some helps.
    Emre: Developer, Keybind system.
*/



/*
Changelogs:

v0.4 Final Edition:
- New Anti Trap Tech (It will use degree and radius)
- Fix Auto Spike break High packet (Yes I'm noob at coding)
- Removed Autoclicker and Auto Break My Obj due to useless feature.
- Snow will fall forever.
- If Websockets are not working It will notifs you. And This will wont gone (thx dayte for having pro eyes)
- Now the script wont do anything when you died.
- Re-coded autoplace with newest angles and type
- Macro placers are will place in different ways

Note:
- Lovey-mod I will stop updating because I'm focusing with school
- I'm very, very sorry to disappoint you, but unfortunately Lovey Mod will not be getting any updates as school is important.
- Lovey-mod IS NOT COMPLETELY discontinued. Lovey-mod will work until Sploop.io developers put an end to it.


v0.3.1 (Still v0.3):
- Added winter mode for winter day
- Targethud Bug-fixes

v0.3:
- Autoheal will heal by using a different method
- AntiTrap will place traps everytime
- Autoplacer placing trap angles changed
- Added shadows
- Added high ping autoheal, now It will going to spam-heal per 200 millisecond to prevent high millisecond responding.
- Added Kill Effect (Disabled by default)
- Added Spam Autoheal If your ping is like around 70-100 Use this autoheal.
- KillChat now will auto insults ingame staffs.
- Array list will be hidden in default (Type .l HAL) when you need to enable.
- Added Dobule Musket shots. When you with another lovey mod you can execute (.l DMS) it. (another lovey mod user should also execute it tho.)
- Added Damage Effect
- Targethud bug-fixes
- Targethud new ui

Menu:
- Added Pumkin hat support

New Commands:
     - .l AHHP = Changes Autoheal High-Ping and Spam mode
     - .l HAL = Hides / Shows Array List
     - .l HKE = Hides / Show Kill Effect
     - .l DMS = Changes to dobule / Single musket shoots (If there is another lovey mod user or other hacks that has musket sync)
     - .l DMS = Changes Musket shot to Dobule (To hit by another lovey mod user) & Single
     - .l HDE = Hides / Shows Damage Effect

v0.2:

**Biggest Change**: There is commands in lovey mod and there is:
     - .l ABT = Anti Trap
     - .l TAB = Place Trap After Breaked
     - .l ABS = Auto break spike
     - .l ABW = Change the weapon to break (It looks like still breaking by secondary when you change it to primary but Its not.)

Other Changes:
- Reworked with the replacer, Now It should Place the spike when enemy breaks the trap (If you have enabled naginata sync) and It should places traps when enemy isnt trapped
- Reworked with the packet limiter, Now It should limit the packets.
- Reworked with the Anti Trap, Now It should Place traps behinds now and there is ReTrap player If replacer is enabled.
- Reworked with the Auto placer, Now It should calculate correctly to place the spikes and the traps.
- Reworked with the Target Hud, Now It should say "It's a tie" when you and enemy has the same health number.
- Added the Fps booster Now It should Auto disables grids and other things that Kills your FPS (bizim skylex istedi bende yapim dedim)
- Added Aimbot, It automaticly aims to enemy (fow bow spam or lazy ppls who use mouse)
- Autoplace should respond more faster to block boost spikers / insta-killers

For Menu:
- Added Aimbot Section

For Notify:
- It notifs when you are died

For The Entrie script:
- Sometimes scirpt is not loading patched.

v0.1:
First lovey mod
*/
alert("We're sorry to bother you, but this is very important! Since schools are important, Lovey-mod unfortunately will not receive updates, so use Lovey mod as much as you can, Enjoy. Unfortunately, after this script is patched, it will not be unpatched with the update.")
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let backgroundDiv = document.createElement("div");

backgroundDiv.style.position = "fixed";
backgroundDiv.style.top = "0";
backgroundDiv.style.left = "0";
backgroundDiv.style.width = "100%";
backgroundDiv.style.height = "100%";
backgroundDiv.style.background = "#212121";
backgroundDiv.style.backgroundSize = "cover";
backgroundDiv.style.backgroundRepeat = "no-repeat";
backgroundDiv.style.backgroundPosition = "center";
backgroundDiv.style.display = "flex";
backgroundDiv.style.justifyContent = "center";
backgroundDiv.style.alignItems = "center";
backgroundDiv.style.color = "white";
backgroundDiv.style.color = "white";
backgroundDiv.style.fontSize = "35px";
backgroundDiv.style.zIndex = "99999999";
backgroundDiv.style.transition = "0.5s";

backgroundDiv.innerHTML = `
<style>
h1 {
font-size: 50px;
}

</style>

<h1 id="loading">Loading...</h1>
`;
setTimeout(() => {
    document.body.append(backgroundDiv)
}, 100);

setTimeout(() => {
    backgroundDiv.style.opacity = "0";
    setTimeout(() => {
        backgroundDiv.style.display = "none";
    }, 500);
}, 2500);
let shadow = false;
setTimeout(() => {

    let checkInGame = document.querySelector("#play-text").style.display;
    let FallingStars = [];
    let statusMode = { // For status menu
        cps: 0,
        pps: 0,
        ping: 0,
        players: 0,
    }

    const servers = {
        SFRA: "EU#1 Sand",
        SFRA2: "EU#2",
        SFRA2BIS: "EU#2 Sand",
        SCA: "USA#1 Sand",
        SCA2: "USA#2 Sand",
        SGP: 'AS#1 Sand',
        SGP2: 'AS#2 Sand',
        SGP3BIS: "AS#3 Sand",
        FRA1FFA: "EU Classic",
        CA1FFA: "USA Classic",
        SGP1FFA: "AS Classic",
        FR1EVENT: "EU Event",
        CA1EVENT: "USA Event"
    };

    // Menu for sploop
    let menuHaha = document.createElement("div");
    menuHaha.style = `
width: 260px;
height: 540px;
background-color: #212121;
z-Index: 3;
position: absolute;
border: 5px solid white;
border-radius: 10px;
left: 25%;
top: 50%;
transform: translate(-50%, -50%);
overflow-y: scroll;
overflow-x:hidden
`
    menuHaha.id = "MenuHaha"

    menuHaha.innerHTML = `
<style>
.hat-keybind {
width: 250px;
height: 75px;
}

.keybind-button-HotkeyInput {
position: relative;
top: -30px;
left: 7%;
width: 120px;
height: 40px;
font-size: 17px;
font-weight: bolder;
background: #333333;
color: white;
border: 5px solid white;
border-radius: 10px;
transition: 0.4s;
}

.keybind-button-HotkeyInput:hover {
background: white;
color: black;
cursor: pointer;
border: 5px solid black;
}

.keybind-button-HotkeyInput:active {
transition: 0s;
background: green;
color: black;
cursor: pointer;
border: 5px solid black;
}
</style>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_1.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="bull">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_3.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="crystal">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_4.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="spike">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_6.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="boost">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_8.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="scuba">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_9.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="hood">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_11.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="demolist">null</button>
</div>
<div class="hat-keybind">
<img src="https://sploop.io/img/entity/hat_10.png?v=1923912" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="pumkin">null</button>
</div>
`

    document.body.appendChild(menuHaha);

    let menuHaha2 = document.createElement("div");
    menuHaha2.style = `
width: 230px;
height: 540px;
background-color: #212121;
z-Index: 3;
position: absolute;
border: 5px solid white;
border-radius: 10px;
left: 40%;
top: 50%;
transform: translate(-50%, -50%);
`
    menuHaha2.id = "MenuHaha2"

    menuHaha2.innerHTML = `
<style>
.item-keybind {
width: 250px;
height: 75px;
}

.keybind-button-HotkeyInput {
position: relative;
top: -30px;
left: 7%;
width: 120px;
height: 40px;
font-size: 17px;
font-weight: bolder;
background: #333333;
color: white;
border: 5px solid white;
border-radius: 10px;
transition: 0.4s;
}

.keybind-button-HotkeyInput:hover {
background: white;
color: black;
cursor: pointer;
border: 5px solid black;
}

.keybind-button-HotkeyInput:active {
transition: 0s;
background: green;
color: black;
cursor: pointer;
border: 5px solid black;
}
</style>
<div class="item-keybind">
<img src="https://sploop.io/img/items/hard_spike.png" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="the-spike">null</button>
</div>
<div class="item-keybind">
<img src="https://sploop.io/img/entity/windmill_assembled.png" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="the-windwill">null</button>
</div>
<div class="item-keybind">
<img src="https://sploop.io/img/entity/cookie.png" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="the-cookie">null</button>
</div>
<div class="item-keybind">
<img src="https://sploop.io/img/entity/trap.png" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="the-trap">null</button>
</div>
<div class="item-keybind">
<img src="https://sploop.io/img/entity/platform.png" width="75" height="75">
<button class="keybind-button-HotkeyInput" id="the-platform">null</button>
</div>
`

    document.body.appendChild(menuHaha2);


    let menuHaha3 = document.createElement("div");
    menuHaha3.style = `
width: 230px;
height: 540px;
background-color: #212121;
z-Index: 3;
position: absolute;
border: 5px solid white;
border-radius: 10px;
left: 55%;
top: 50%;
transform: translate(-50%, -50%);
`
    menuHaha3.id = "MenuHaha3"

    menuHaha3.innerHTML = `
<style>
  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    .checkbox-wrapper-13 input[type=checkbox] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      left: 20px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }
    .checkbox-wrapper-13 input[type=checkbox]:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled + label {
      cursor: not-allowed;
    }
    .checkbox-wrapper-13 input[type=checkbox]:hover:not(:checked):not(:disabled) {
      --bc: var(--border-hover);
    }
    .checkbox-wrapper-13 input[type=checkbox]:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      width: 21px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      opacity: var(--o, 0);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --o: 1;
    }
    .checkbox-wrapper-13 input[type=checkbox] + label {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-left: 4px;
    }

    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      border-radius: 7px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 7px;
      top: 4px;
      transform: rotate(var(--r, 20deg));
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --r: 43deg;
    }
  }

  .checkbox-wrapper-13 * {
    box-sizing: inherit;
  }
  .checkbox-wrapper-13 *:before,
  .checkbox-wrapper-13 *:after {
    box-sizing: inherit;
  }

  label {
  color: white;
  position: relative;
  left: 20px;
  text-shadow: 0 0 50px #fff;
}

.input-box {
    width: 40%;
    background: black;
    height: 30px;
    text-align: center;
    color: white;
    position: relative;
    border: none;
    border-radius: 10%;
    left: 30px;
    display: flex;
    text-shadow: 0 0 50px #fff;
}

.input-box-with-text {
    display: flex;
    height: 30px;
    width: auto; /* Genişliği otomatik olarak ayarla */
    flex-direction: row; /* Öğeleri yan yana koy */
    align-items: center; /* Öğeleri dikeyde ortala */
    gap: 10px; /* Öğeler arasına boşluk koy (isteğe bağlı) */
}

</style>
<br>
<br>
<div class="checkbox-wrapper-13">
  <input id="Autoheal" type="checkbox" checked>
  <label for="c1-13">Auto heal</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="killChat" type="checkbox">
  <label for="c1-13">Kill Chat</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="autobreak" type="checkbox">
  <label for="c1-13">Auto Break Trap</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="nightmode" type="checkbox">
  <label for="c1-13">Night Mode</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="AutoPlacer" type="checkbox">
  <label for="c1-13">Auto Place</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="Msync" type="checkbox">
  <label for="c1-13">Musket Sync</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="Ssync" type="checkbox">
  <label for="c1-13">Naginata Sync</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="AutoReplacer" type="checkbox">
  <label for="c1-13">Auto Replacer</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="ASync" type="checkbox">
  <label for="c1-13">Anti sync</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="AimBot" type="checkbox">
  <label for="c1-13">Aimbot</label>
</div><br>
<div class="input-box-with-text">
<p class="input-text">CPS:</p>
<input id="setCPS" min="1" max="150" step="1" type="number" class="input-box" placeholder="Set Cps">
</div><br>
`

    document.body.appendChild(menuHaha3);

    let menuHaha4 = document.createElement("div");
    menuHaha4.style = `
width: 230px;
height: 540px;
background-color: #212121;
z-Index: 3;
position: absolute;
border: 5px solid white;
border-radius: 10px;
left: 70%;
top: 50%;
transform: translate(-50%, -50%);
`
    menuHaha4.id = "MenuHaha4"

    menuHaha4.innerHTML = `
<style>
  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    .checkbox-wrapper-13 input[type=checkbox] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      left: 20px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }
    .checkbox-wrapper-13 input[type=checkbox]:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled + label {
      cursor: not-allowed;
    }
    .checkbox-wrapper-13 input[type=checkbox]:hover:not(:checked):not(:disabled) {
      --bc: var(--border-hover);
    }
    .checkbox-wrapper-13 input[type=checkbox]:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      width: 21px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      opacity: var(--o, 0);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --o: 1;
    }
    .checkbox-wrapper-13 input[type=checkbox] + label {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-left: 4px;
    }

    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      border-radius: 7px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 7px;
      top: 4px;
      transform: rotate(var(--r, 20deg));
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --r: 43deg;
    }
  }

  .checkbox-wrapper-13 * {
    box-sizing: inherit;
  }
  .checkbox-wrapper-13 *:before,
  .checkbox-wrapper-13 *:after {
    box-sizing: inherit;
  }

  label {
  color: white;
  position: relative;
  left: 20px;
  text-shadow: 0 0 50px #fff;
}

.input-box {
    width: 40%;
    background: black;
    height: 30px;
    text-align: center;
    color: white;
    position: relative;
    border: none;
    border-radius: 10%;
    left: 30px;
    display: flex;
    text-shadow: 0 0 50px #fff;
}

.input-box-with-text {
    display: flex;
    height: 30px;
    width: auto; /* Genişliği otomatik olarak ayarla */
    flex-direction: row; /* Öğeleri yan yana koy */
    align-items: center; /* Öğeleri dikeyde ortala */
    gap: 10px; /* Öğeler arasına boşluk koy (isteğe bağlı) */
}

</style>
<br>
<br>
<div class="checkbox-wrapper-13">
  <input id="legitmode" type="checkbox">
  <label for="c1-13">Legit Mode</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="legitautoheal" type="checkbox">
  <label for="c1-13">Legit Auto Heal</label>
</div><br>
<div class="checkbox-wrapper-13">
  <input id="placeassist" type="checkbox">
  <label for="c1-13">Place assist</label>
</div><br>

`

    document.body.appendChild(menuHaha4);



    // StatusMenu


    let statusMenu = document.createElement("div");
    statusMenu.style.position = "fixed";
    statusMenu.style.display = "none";
    statusMenu.style.width = "300px";
    statusMenu.style.height = "auto";
    statusMenu.style.top = "30%";
    statusMenu.style.left = "1%";
    statusMenu.style.border = "10px solid white";
    statusMenu.style.borderRadius = "6px";
    statusMenu.style.backgroundColor = "transition";
    statusMenu.style.backdropFilter = "blur(10px)";
    statusMenu.style.zIndex = "3";
    statusMenu.style.overflow = "hidden";
    statusMenu.id = "modmenu";
    statusMenu.innerHTML = `
    <style>
    p {
        color: white;
        font-weight: bolder;
        font-size: 18px;
        position: relative;
        left: 20px;
    }

    .line {
    width: 300px;
    height: 10px;
    background: white;
    }
    </style>
    <br>
    <p id="showCps">CPS: ${statusMode.cps}</p>
    <p id="showPps">PPS: ${statusMode.pps}</p>
    <p id="showPing">Ping: ${statusMode.ping}</p>
    <br>
    <div class="line"></div>
    <br>
    <p class="arraylist" style="color:red;">Auto Heal</p>
    <p class="arraylist" style="color:red;">Kill Chat</p>
    <p class="arraylist" style="color:red;">Auto Break Trap</p>
    <p class="arraylist" style="color:red;">Night Mode</p>
    <p class="arraylist" style="color:red;">Auto Place</p>
    <p class="arraylist" style="color:red;">Musket Sync</p>
    <p class="arraylist" style="color:red;">Naginata Sync</p>
    <p class="arraylist" style="color:red;">Auto Replacer</p>
    <p class="arraylist" style="color:red;">Anti sync</p>
    <p class="arraylist" style="color:red;">AimBot</p>
    <br>
`;

    // CONNECT THE GAME


    document.body.appendChild(statusMenu);

    let menubutton = document.createElement("div");
    menubutton.innerHTML = `
    <button id="openmenu" style="width:100px; height:100px; font-size: 24px; font-weight: bolder; background-color: #212121; color: white; border: 5px solid white; border-radius: 10px; position: absolute; top: 100px; left: 10px;">
        Open Menu
    </button>
`;

    document.body.appendChild(menubutton);


    // Targethud

    let targethud = document.createElement("div");
    targethud.id = "targethud";
    targethud.style = `
  width: 400px;
  height: 250;
  border: 10px solid white;
  border-radius: 20px;
  background-color: #212121;
  backdrop-filter: blur(10px);
  position: absolute;
  left: 55%;
  top: 550px;
  z-index: 3;
  transition: 0.3s;
  opacity: 0;
`;

    targethud.innerHTML = `
  <style>
    #name {
      text-align: center;
      font-size: 25px;
      color: white;
      font-weight: bolder;
    }
    .hud {
      position: relative;
      left: 10px;
      width: 360px;
      height: 30px;
    }
    progress {
      width: 80%;
      height: 10px;
      border-radius: 10px;
      appearance: none;
    }
    #health::-webkit-progress-bar {
      background-color: #3e3e3e;
      border-radius: 10px;
    }
    #health::-webkit-progress-value {
      background-color: #ff2b2b;
      border-radius: 10px;
      transition: width 0.3s ease-in-out;
    }
    #health::-moz-progress-bar {
      background-color: #ff2b2b;
      border-radius: 10px;
      transition: width 0.3s ease-in-out;
    }

    #distance::-webkit-progress-bar {
      background-color: #3e3e3e;
      border-radius: 10px;
    }
    #distance::-webkit-progress-value {
      background-color: #f4f147;
      border-radius: 10px;
      transition: width 0.3s ease-in-out;
    }
    #distance::-moz-progress-bar {
      background-color: #f4f147;
      border-radius: 10px;
      transition: width 0.3s ease-in-out;
    }

    .progress-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .progress-wrapper span {
      margin-left: 10px;
      font-size: 20px;
      color: white;
    }
  </style>

  <p id="name">Undefined</p>
  <br>
  <div class="progress-wrapper">
    <progress id="health" class="hud" value="50" max="100"></progress>
    <span>❤️</span>
  </div>
  <br>
  <div class="progress-wrapper">
    <progress id="distance" class="hud" value="50" max="300"></progress>
    <span>↔</span>
  </div>
  <br>
  <p id="aimangle">: null</p>
  <p id="nowstatus">: null</p>
`;

    document.body.appendChild(targethud);




    document.body.appendChild(targethud);


    let arrayListSet = (number) => {return document.getElementsByClassName("arraylist")[number]}
    let checked = (id) => {return document.getElementById(id).checked}
    let Atilla = (lengthalphabet) => {
        const alphabet = "ABCDEFGIJKLMNOPRSTUVWXYZabcdefgijklmnoprstuwxyz1234567890"
        let kitoons = ""
        for (let i = 0; i < lengthalphabet; i++) {
            let kitoonsselect = Math.floor(Math.random() * alphabet.length);
            kitoons += alphabet[kitoonsselect]
        }
        return kitoons;
    }

    let Storage = {
        get: function(key) {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : null;
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        delete: function(key) {
            const has = localStorage.hasOwnProperty(key) && key in localStorage;
            localStorage.removeItem(key);
            return has;
        }
    }

    const defaultKeyBinds = {
        hatBerserker: "KeyB",
        hatCrystal: "KeyC",
        hatSpike: "KeyT",
        hatBoost: "KeyM",
        hatScuba: "KeyG",
        hatHood: "KeyU",
        hatPumkin: "KeyY",
        cps: 60,
        hatDemolist: "KeyZ",
        spike: "KeyV",
        trap: "KeyF",
        windwill: "KeyN",
        platform: "KeyH",
        heal: "KeyQ",
        spikeSpinSpeed: 1, // Thanks fizzixww for spinning spikes!
        id: Atilla(256),
    };

    const keyBinds = {
        ...defaultKeyBinds,
        ...Storage.get("Lovey")
    };
    for (const key in keyBinds) {
        if (!defaultKeyBinds.hasOwnProperty(key)) {
            delete keyBinds[key];
        }
    }

    Storage.set("Lovey", keyBinds)

    const keybindElements = document.getElementsByClassName("keybind-button-HotkeyInput");
    const keyBindsArray = [
        keyBinds.hatBerserker,
        keyBinds.hatCrystal,
        keyBinds.hatSpike,
        keyBinds.hatBoost,
        keyBinds.hatScuba,
        keyBinds.hatHood,
        keyBinds.hatDemolist,
        keyBinds.hatPumkin,
        keyBinds.spike,
        keyBinds.windwill,
        keyBinds.heal,
        keyBinds.trap,
        keyBinds.platform
    ];

    keyBindsArray.forEach((keyBind, index) => {
        if (keybindElements[index]) {
            keybindElements[index].textContent = keyBind;
        }
    });

    document.getElementById("setCPS").value = keyBinds.cps


    const keyBindElements = [
        'bull', 'crystal', 'spike', 'boost', 'scuba', 'hood', 'demolist', 'pumkin', 'the-spike',
        'the-trap', 'the-windwill', 'the-cookie', 'the-platform'
    ];

    keyBindElements.forEach((id, index) => {
        document.getElementById(id).addEventListener('click', () => {
            const handleKeydown = (event) => {
                document.getElementById(id).textContent = event.code;
                const keyBindNames = [
                    'hatBerserker', 'hatCrystal', 'hatSpike', 'hatBoost', 'hatScuba',
                    'hatHood', 'hatDemolist', 'spike', 'trap', 'windwill', 'windwill', 'platform'
                ];
                keyBinds[keyBindNames[index]] = event.code;
                Storage.set("Lovey", keyBinds);
                document.removeEventListener('keydown', handleKeydown);
            };

            document.addEventListener('keydown', handleKeydown);
        });
    });


    document.getElementById("setCPS").addEventListener("input", e => {
        keyBinds.cps = document.getElementById("setCPS").value;
        Storage.set("Lovey", keyBinds)
    });

    document.getElementById("openmenu").addEventListener("click", toggleMenu); // Open menu by clicking the button
    document.addEventListener("keydown", (e) => { // Open menu by pressing esc
        if (e.keyCode == 27) {
            toggleMenu();
        }
    });

    function toggleMenu() {
        $("#MenuHaha").fadeToggle(150);
        $("#MenuHaha2").fadeToggle(150);
        $("#MenuHaha3").fadeToggle(150);
        $("#MenuHaha4").fadeToggle(150);
    }

    // Appear Notification
    let notifications = [];
    function notif(mode, title, description, duration) {
        let style = `
            position: fixed;
            top: ${20 + notifications.length * 60}px;
            left: 10px;
            padding: 10px 20px;
            background-color: ${document.getElementById("nightmode").checked ? "transparent" : "#f44336"};
            color: ${document.getElementById("nightmode").checked ? "#94edf9" : "white"};
            border-radius: 5px;
            border: 10px solid ${document.getElementById("nightmode").checked ? "#94edf9" : "white"};
            opacity: 1;
            width: 20%;
            transition: opacity 0.5s ease-in-out;
            z-index: 99999999999999999;

        `;
        let notification = document.createElement('div');
        notification.style = style;
        notification.innerHTML = `<h3>${title}</h3><p style="color: ${document.getElementById("nightmode").checked ? "#94edf9" : "white"};">${description}</p>`;
        document.body.appendChild(notification);
        var notificationsound;
        if (mode == "info") { notificationsound = new Audio('https://cdn.glitch.global/4c998580-5aaf-4a1a-8da3-e0c6b9f241a7/Audio_-_notification3_-_Creator_Store%20(1).mp3') }
        else if (mode == "warning") { notificationsound = new Audio('https://cdn.glitch.global/ca081162-612b-4311-8a7d-7828f21c13e0/confirm.mp3?v=1723982480020') }
        else if (mode == "error") { notificationsound = new Audio('https://cdn.glitch.global/ca081162-612b-4311-8a7d-7828f21c13e0/48643e6a-f6d2-4462-acdc-2b2d2ccb14fa.beep-02.mp3?v=1724795422902') }
        notificationsound.volume = 0.7;
        notificationsound.play();
        setTimeout(function() {
            notification.style.opacity = '0';
            setTimeout(function() {
                notification.remove();
                notifications.shift();
                updateNotificationPositions();
            }, 1000);
        }, duration);

        notifications.push(notification);
        updateNotificationPositions();
    }

    function updateNotificationPositions() {
        notifications.forEach(function(notification, index) {
            notification.style.top = `${20 + index * 135}px`;
        });
    }

    function updateTargetHud(name, health, distance, enemyangle, nowstatus, display) {
        document.getElementById("name").textContent = name;
        document.getElementById("health").value = health;
        document.getElementById("distance").value = distance;
        document.getElementById("aimangle").textContent = "Enemy Aim Angle: " + enemyangle;
        document.getElementById("nowstatus").textContent = "Status: " + nowstatus;
        document.getElementById("targethud").style.opacity = display
    }

    let sploopServers, currentServerUrl
    const getSploopServers = async () => await fetch("https://sploop.io/servers").then(e => e.json()).then(e => (sploopServers = e));

    class GameUtils {
        static getDistance(x1, y1, x2, y2) {
            return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
        }

        static getDist(tmp1, tmp2, type1, type2) {
            let tmpXY1 = {
                x: tmp1.x,
                y: tmp1.y,
            };
            let tmpXY2 = {
                x: tmp2.x,
                y: tmp2.y,
            };
            return Math.sqrt((tmpXY2.x -= tmpXY1.x) * tmpXY2.x + (tmpXY2.y -= tmpXY1.y) * tmpXY2.y);
        }

        static getDirection(x1, y1, x2, y2) {
            return Math.atan2(y1 - y2, x1 - x2);
        }

        static getDirect(tmp1, tmp2) {
            let tmpXY1 = {
                x: tmp1.x,
                y: tmp1.y,
            };
            let tmpXY2 = {
                x: tmp2.x,
                y: tmp2.y,
            };
            return Math.atan2(tmpXY1.y - tmpXY2.y, tmpXY1.x - tmpXY2.x);
        }

        static getAngleDist(a, b) {
            let p = Math.abs(b - a) % (Math.PI * 2);
            return p > Math.PI ? (Math.PI * 2) - p : p;
        }

        static checkItemLocation(gameObjects, x, y, s, sM, indx, ignoreWater, placer) {
            for (let i = 0; i < gameObjects.length; ++i) {
                let blockS = gameObjects[i].blocker
                ? gameObjects[i].blocker
                : gameObjects[i].getScale(sM, gameObjects[i].isItem);
                if (gameObjects[i].active && this.getDistance(x, y, gameObjects[i].x, gameObjects[i].y) < (s + blockS)) return false
            }
            if (!ignoreWater && indx != 18 && y >= (this.mapScale / 2) - (this.riverWidth / 2) && y <= (this.mapScale / 2) + (this.riverWidth / 2)) {
                return false;
            }
            return true;
        }
    }

    var utils = GameUtils;

    const packets = {
        request_received: 17,
        entity_spawned: 32,
        items_upgrade: 2,
        create_clan: 24,
        update_clan: 16,
        entity_chat: 30,
        leave_clan: 27,
        update_age: 8,
        item_hit: 29,
        upgrades: 14,
        change_angle: 13,
        spawned: 35,
        killed: 28,
        update: 20,
        died: 19,
        chat: 7,
        move: 1,
        stopMove: 15
    };

    const hats = {
        bush_gear: 1,
        berserker: 2,
        jungle_gear: 3,
        crystal_gear: 4,
        spike_gear: 5,
        immunity_gear: 6,
        boost_Hat: 7,
        apple_gear: 8,
        scuba_gear: 9,
        hood_gear: 10,
        demolist: 11,
        pumkin: 12,
    };


    var log = x => {
        console.log("Log:", x);
    };
    var error = x => {
        console.error("Error:", x);
    };
    var objects = [];
    var enemies = [];
    var packet = 0;
    var mainWeapon = 0;
    var width;
    var height;
    var mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", client => {
        mouseX = client.clientX;
        mouseY = client.clientY;
    });

    width = window.innerWidth;
    height = window.innerHeight;

    var msgpack5 = msgpack;

    var websocket;
    var reconnectInterval = 0;

    WebSocket.prototype.oldSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (sender) {
        if (!websocket || websocket == "Closed") {
            websocket = this;
            findSocket(this);
            reconnectSocket(this);
        }
        this.oldSend(sender);
    };

    const random = (min, max) => {
        const isInteger = Number.isInteger(min) && Number.isInteger(max);
        if (isInteger) return Math.floor(Math.random() * (max - min + 1) + min);
        return Math.random() * (max - min) + min;
    };

    var findSocket = function (socket) {
        socket.addEventListener("message", function (message) {
            mainPlayer.listener(message);
        });
    };

    var reconnectSocket = socket => {
        socket.addEventListener("close", function() {
            websocket = "Closed";
        });
    }

    function parseMessage(a) {
        const b = typeof a;
        const c = b === "string" ? JSON.parse(a) : new Uint8Array(a);
        c.type = c[0];
        return c;
    }

    let sendChat = (text) => {
        const encodeText = new TextEncoder().encode(text);
        send([7, ...encodeText])
    }

    function stopMove() {
        send(new Uint8Array([6, 0]));
    }

    function move(angle) {
        angle = (65535 * (angle + Math.PI)) / (2 * Math.PI);
        send(new Uint8Array([1, 255 & angle, (angle >> 8) & 255]));
    }

    function calcAngle(a, b) {
        if (a && b) return Math.atan2(a.y - b.y, a.x - b.x);
    }

    function getEl(id) {
        return document.getElementById(id)
    }

    const toRad = (degrees) => {
        degrees = degrees % 360;
        if (degrees < 0) {
            degrees += 360;
        }
        return (degrees * Math.PI) / 180;
    };

    const toDegree = (radians) => {
        return (radians * 180) / Math.PI;
    };

    class Client {
        constructor() {
            this.canInsta = false;
            this.canEquip = true;
            this.doingInsta = false;
            this.position = {};
            this.dir = 0;
            this.oldX = 0;
            this.oldY = 0;
            this.xPos = 0;
            this.yPos = 0;
            this.clan = [];
            this.currentHat = null;
            this.inTrap = false;
            this.kills = 0;
            this.dieCount = 0;
            this.packets = 0;
            this.alive = false;
            this.old_weapon = 0;
            this.new_weapon = 0;
            this.breaking = false;
            this.leftClick = false;
            this.rightClick = false;
            this.step = 0;
            this.trapSid = undefined;
            this.placing = true;
            this.prevHealth = 100;
            this.hitSync = true;
            this.shotSync = true;
            this.antitrap = false;
            this.aimbot = true;
            this.autopushing = 0;
        }
        ally(a) {
            let b = a.typeof === "number" ? a : a.sid;
            if (mainPlayer.clan.length > 0) {
                let a = mainPlayer.clan.length;
                for (let c = 0; c < a; c++) {
                    let a = mainPlayer.clan[c];
                    if (b == a) {
                        return true;
                    }
                }
            }
            return false;
        }
        mine(a) {
            if (this.ally(a) || this.sid == a.sid) {
                return !0;
            }
            return !1;
        }
        update() {
            if (!this.alive) return
            const d = objects.find(a => a && utils.getDist(a, this) < 60 && a.type == 6 && !this.mine(a));
            const f = this.breaking;
            var neardist = enemies ? utils.getDist(enemies, this) - 70 : 0;
            var nearangle = enemies ? utils.getDirect(enemies, this, 0, 0) : 0;
            let inTrapSpike = objects.find(a => a && [2, 7, 17].includes(a.type) && !this.mine(a) && utils.getDist(a, this) < 100);
            let antitrapangle = 0;
            let myTrap, mySpikes;

            /*
THIS IS OLD AUTOHEAL.

            let DmgTaken;
            if(this.health < 100 && document.getElementById("Autoheal").checked) { // Auto heal
                DmgTaken = 100 - this.health;
                if (DmgTaken >= 20 || DmgTaken <= 40) setTimeout(() => {place(2, getAttackDir())}, 110);
                else if (DmgTaken >= 40 || DmgTaken <= 69) {
                    setTimeout(() => {
                        place(2, getAttackDir());
                    }, 77);
                }
                else if (DmgTaken >= 70 || DmgTaken <= 99) {
                    setTimeout(() => {
                        place(2, getAttackDir())
                    }, 100 - DmgTaken);
                }
            } else if (this.health < 40 && document.getElementById("legitmode").checked && document.getElementById("legitautoheal").checked) {
                setTimeout(() => {place(2, getAttackDir())}, Math.floor(Math.random() * (100 - 60)) + 60);
            } else if (this.health == 100) {
                this.healthWarn = false;
            }
            else if(this.health < 100 && !document.getElementById("Autoheal").checked) {
                if (!this.healthWarn) {
                    if (document.getElementById("legitmode").checked) return
                    notif("warning", "Warning", "Autoheal is off", 5000)
                    this.healthWarn = true;
                }
            }

            */

            if (d && document.getElementById("autobreak").checked) { // Auto Break
                let nearInTrap = objects.find(a => a && this.mine(a) && utils.getDist(a, enemies) < 60 && a.type == 6);
                console.log("test");
                this.aimbot = false;
                let breakreloaded = true;
                let spikeAim;
                if(inTrapSpike) {
                    spikeAim = utils.getDirect(inTrapSpike, this, 0, 0);
                }
                const b = utils.getDist(d, this);
                const z = utils.getDirect(d, this, 0, 0);
                this.oldTrap = d;
                this.trapSid = d.id;
                if (neardist < 200 && A_B_T) {
                    place(7, toRad(toDegree(z) - 90))
                    setTimeout(() => { place(7, toRad(toDegree(z) + 90)) }, 150)
                    setTimeout(() => { place(7, toRad(toDegree(z) + 180)) }, 300)
                }
                mainWeapon = 1;
                if(inTrapSpike && A_B_S) {
                    select(A_B_W ? 1 : 0);
                    hit(spikeAim);
                    breakreloaded = false;
                    setTimeout(() => {
                        place(7, spikeAim)
                    }, 200)
                } else {
                    if (breakreloaded) {
                        select(A_B_W ? 1 : 0);
                        hit(z);
                        if (T_A_B) {
                            setTimeout(() => {
                                place(nearInTrap ? 4 : 7, z)
                            }, 1000 / 9)
                        }
                        breakreloaded = false;
                        setTimeout(() => {breakreloaded = true}, 700)
                    }
                }
                if (!this.breaking) {
                    equipHat(hats.demolist)
                    if (inTrapSpike) notif("warning", "Auto Break", "You can die, breaking spike then it will break the trap in " + spikeAim, 2000)
                    else notif("info", "Auto Break", "Breaking a trap in " + z, 2000)
                }
                this.breaking = true;
                this.inTrap = true;
            } else if (f) {
                equipHat(hats.crystal_gear);
                this.oldTrap = null;
                this.inTrap = false;
                antitrapangle = 0;
                this.aimbot = true;
                this.breaking = false;
            }

            if (enemies.health <= 65 && neardist <= 165 && document.getElementById("Ssync").checked) { // Naginata Sync
                if (this.hitSync) {
                    select(0)
                    equipHat(hats.berserker)
                    hit(nearangle)
                    this.hitSync = false;
                    setTimeout(() => {this.hitSync = true}, 700)
                    setTimeout(() => {equipHat(hats.crystal_gear)}, 1500)
                }

            }

            if (document.getElementById("ASync").checked) { // Anti Sync
                if (enemies.health < 65 && neardist <= 165) {
                    equipHat(hats.crystal_gear)
                    place(2, getAttackDir());
                    notif("warning", "Anti sync case", "Anti sync has been blocked by lovey mod", 2000)
                }
            }
            if (D_M_S) {
                if (enemies.health <= 49 && neardist <= 1000 && document.getElementById("Msync").checked) { // Musket sync (Coffee mod gave me the idea)
                    if (this.shotSync) {
                        select(1)
                        hit(nearangle)
                        select(0)
                        this.shotSync = false;
                        setTimeout(() => {this.shotSync = true}, 1500)
                    }
                }
            }
            else if (!D_M_S) {
                if (enemies.health <= 70 && neardist <= 1000 && document.getElementById("Msync").checked) { // Musket sync (Coffee mod gave me the idea)
                    if (this.shotSync) {
                        select(1)
                        hit(nearangle)
                        select(0)
                        this.shotSync = false;
                        setTimeout(() => {this.shotSync = true}, 1500)
                    }
                }
            }

            if (neardist <= 200 && document.getElementById("AutoPlacer").checked && !this.breaking) { // 4 LINE AUTOPLACER IS ABSOLUTELY CRAZY
                let nearInTrap = objects.find(a => a && this.mine(a) && utils.getDist(a, enemies) < 60 && a.type == 6);
                nearInTrap ? place(4, [nearangle + 1.5, nearangle - 1.5][Math.floor(Math.random() * 2)]) : place(7, [nearangle + 0.45, nearangle - 0.45][Math.floor(Math.random() * 2)]);
            }


            if (neardist <= 300 && this.alive) updateTargetHud(enemies.name, enemies.health, neardist.toFixed(0), nearangle.toFixed(3), this.health > enemies.health ? "You winning" : this.health == enemies.health ? "It's a tie" : "You Losing", "0.7")
            else if (neardist >= 300 && this.alive) updateTargetHud(enemies.name, enemies.health, neardist.toFixed(0), nearangle.toFixed(3), this.health > enemies.health ? "You winning" : this.health == enemies.health ? "It's a tie" : "You Losing", "0")



            if (document.getElementById("setCPS").value > 160) notif("Warning", "You can get banned by high cps", 2000) // Warn notifier



            // Legit mode
            if (document.getElementById("legitmode").checked) {
                ["Autoheal", "killChat", "autobreak", "AutoPlacer", "Msync", "Ssync", "AutoReplacer", "ASync"].forEach(mahmodz => document.getElementById(mahmodz).checked = false)
                document.getElementById("modmenu").style.display = "none";
            } else if (!document.getElementById("legitmode").checked) {
                ["legitautoheal", "placeassist"].forEach(mahmodz => document.getElementById(mahmodz).checked = false)
                if (!H_A_L) document.getElementById("modmenu").style.display = "block";

            }

            // Aimbot
            if (document.getElementById("AimBot").checked) {
                if (neardist <= 800 && this.aimbot) {
                    const b = parseAngle(nearangle);
                    send([13, b[0], b[1]]);
                }
            }



        }
        listener(data){
            var neardist = enemies ? utils.getDist(enemies, this) : 0;
            var nearangle = enemies ? utils.getDirect(enemies, this, 0, 0) : 0;
            let rawData = data.data;
            let parsedMessage = parseMessage(rawData);
            if (parsedMessage.type === 35) {
                const a = 100;
                const b = true;
                const d = parsedMessage[1];
                const e = parsedMessage[2];
                const f = parsedMessage[4];
                const g = {
                    alive: b,
                    health: a,
                    id: d,
                    name: e,
                    items: f
                };
                log("Hello");
                Object.assign(this, g);
            }
            if (parsedMessage.type === packets.update_clan || parsedMessage.type === packets.create_clan) {
                this.clan = [...parsedMessage.slice(2, parsedMessage.length)];
            }
            if (parsedMessage.type === packets.leave_clan) {
                this.clan = [];
            }
            if (parsedMessage.type === packets.died) {
                notif("info", "You died", "You are died.. Please respawn", 2000)
                this.alive = false;
                this.dieCount++;
                this.kills = 0;
                document.getElementById("targethud").style.opacity = 0;
                this.age = 0;
                ShowDamage(100)
            }
            if (parsedMessage.type == packets.update_age) {
                const a = Math.max(0, parsedMessage[1] | parsedMessage[2] << 8 | parsedMessage[3] << 16 | parsedMessage[4] << 24);
                this.age = ~~(Math.log(1 + a) ** 2.4 / 13);
            }

            if (parsedMessage.type == packets.spawned) {
                this.alive = true;
            }

            if (parsedMessage.type == packets.killed) {
                updateTargetHud(enemies.name, enemies.health, neardist.toFixed(0), nearangle.toFixed(3), this.health >= enemies.health ? "You winning" : "You Losing", "0")
                this.kills++
                if (!H_K_E) showBorder(6)
                if (document.getElementById("killChat").checked) {
                    let killChat = ["Your English bad - Cku", "Learn how to make Anticheat Cku.", "Cku Quitted Abt ingame staff jokes.", "I'm better than Cku At Coding.", "Uh I use POST On Fetch - Cku", "Your Antiban is fake - Cku", "I have ur script - HitMan", "Noone skid ur trash script - Hitman", "Learn how to code JavaScript, Cku.", "HitMan dies to 200ms player 💀", "Go play doors w ilyax - HitMan", "Atilla was a reckless's dog", "Cku anticheat bypassed by crygen", "Ckumascot more like Travis scott", "nightmare dodged abt ban hackers", "nightmare get a life", "Nightmare dies to basic ahk", "Nightmare have a bad heart", "Nightmare Obeys LapaMavue", "Hackers > Developers at coding."]
                    sendChat(killChat[Math.floor(Math.random() * killChat.length)]);
                }

            }

            if (parsedMessage.type === packets.update) {
                ShowDamage(this.health)
                if (this.health < 100 && statusMode.ping <= 80 && A_H_HP !== "Spam" && document.getElementById("Autoheal").checked) place(2, getAttackDir()) // Normal autoheal (Perfect)
                enemies = null;
                for (let a = 1; a < parsedMessage.length; a += 19) {
                    const b = parsedMessage[a + 8];
                    const d = parsedMessage[a + 0];
                    const e = parsedMessage[a + 1];
                    const f = parsedMessage[a + 2] | parsedMessage[a + 3] << 8;
                    const g = parsedMessage[a + 4] | parsedMessage[a + 5] << 8;
                    const h = parsedMessage[a + 6] | parsedMessage[a + 7] << 8;
                    var i = parsedMessage[a + 9] / 255 * 6.283185307179586 - Math.PI;
                    const j = parsedMessage[a + 10];
                    const k = parsedMessage[a + 11];
                    const l = parsedMessage[a + 12];
                    const m = parsedMessage[a + 13] / 255 * 100;

                    if (b & 2) {
                        if(document.getElementById("AutoReplacer").checked) {
                            var enemyAngle = utils.getDirect(enemies, this, 0, 0);
                            var enemyDist = utils.getDist(enemies, this) - 75;
                            let nearInTrap = objects.find(a => a && this.mine(a) && utils.getDist(a, enemies) < 60 && a.type == 6);
                            var objectAngle = utils.getDirection(this.x, this.y, g, h);
                            if (enemyDist < 300) nearInTrap ? place(document.getElementById("Ssync").checked ? 4 : 7, objectAngle) : place(7, objectAngle)
                        }
                        if(f == this.trapSid){
                            equipHat(hats.crystal_gear);
                            this.oldTrap = null;
                            this.inTrap = false;
                            this.breaking = false;
                        }
                        objects[f] = null;
                    } else {
                        const a = objects[f] || {};
                        const b = {
                            type: d,
                            sid: e,
                            id: f,
                            x: g,
                            y: h,
                            weapon: j,
                            hat: k,
                            health: m,
                            team: l,
                            dir: i
                        };
                        this.xPos = b.x;
                        this.yPos = b.y;
                        Object.assign(a, b);
                        objects[f] = a;
                        if (f === mainPlayer.id) {
                            Object.assign(mainPlayer, a);
                        }
                        const c = !mainPlayer.team || l != mainPlayer.team;
                        if (d === 0 && mainPlayer.id !== f && c) {
                            const b = enemies;
                            const c = Math.hypot(mainPlayer.y - h, mainPlayer.x - g);
                            const d = enemies ? Math.hypot(mainPlayer.y - b.y, mainPlayer.x - b.x) : null;
                            if (b) {
                                if (c < d) {
                                    enemies = a;
                                }
                            } else {
                                enemies = a;
                            }
                        }
                    }
                }
                this.update();
            }
            if (parsedMessage.type === 15) {
                statusMode.ping = parsedMessage[1];
                document.getElementById("showPing").innerHTML = "Ping: " + statusMode.ping
            }
        }
    }
    // High ping autoheal
    setInterval(() => {
        if (document.getElementById("Autoheal").checked) {
            if (A_H_HP == "High Ping" && statusMode.ping >= 81) place(2, getAttackDir())
            else if (A_H_HP == "Spam") place(2, getAttackDir())
            else return;
        }
    }, 200)

    setInterval(() => {
        statusMode.pps = 0;
        document.getElementById("showPps").innerHTML = "PPS: " + statusMode.pps;
    }, 1000)

    var mainPlayer = new Client();

    var send = (function (message) {
        try {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
                if(statusMode.pps >= 500) return
                else {
                    websocket.send(new Uint8Array(message));
                    statusMode.pps++
                    document.getElementById("showPps").innerHTML = "PPS: " + statusMode.pps;
                }
            } else {
            }
        } catch (error) {
            notif("Warning", "WS Error", "Lovey-mod Has failed to connect the WebSocket, the error is: " + error, Infinity)
        }
    });

    function fixTo(n, v) {
        return parseFloat(n.toFixed(v));
    }

    function getAttackDir() {
        let lastDir = Math.atan2(mouseY - (height / 2), mouseX - (width / 2));
        return fixTo(lastDir || 0, 2);
    }

    function parseAngle(a) {
        const b = (a + Math.PI) * 65535 / (Math.PI * 2);
        return [b & 255, b >> 8 & 255];
    }

    function equipHat(id) {
        send([5, id]);
        send([5, id]);
        if (id == hats.berserker) this.currentHat = "berserker"
        else if (id == hats.crystal_gear) this.currentHat = "crystal"
        else if (id == hats.spike_gear) this.currentHat = "spike"
        else if (id == hats.boost_Hat) this.currentHat = "boost"
        else if (id == hats.scuba_gear) this.currentHat = "scuba"
        else if (id == hats.hood_gear) this.currentHat = "hood"
        else if (id == hats.demolist) this.currentHat = "demolist"
    }

    function raw_select(a) {
        if(mainPlayer.weapon != a) {
            return send([2, a]);
        }
    }
    function select(a) {
        if(mainPlayer.weapon != a) {
            raw_select(a);
            send([0, a]);
        }
    }

    function hit(a){
        const b = parseAngle(a);
        send([19, b[0], b[1]]);
        send([18]);
    }

    function place(a, b){
        var tmpS = (60 + a.scale - 8);
        var tmpX = this.x + (tmpS * Math.cos(b));
        var tmpY = this.y + (tmpS * Math.sin(b));
        if(utils.checkItemLocation(tmpX, tmpY, a.scale, 0.4, a.id, false, this)){
            if (document.getElementById("legitmode").checked && document.getElementById("placeassist").checked) {
                select(a);
                setTimeout(() => {
                    hit(b);
                    select(mainWeapon);
                }, Math.round(Math.random() * (120 - 50)) + 50)
            } else if (!document.getElementById("legitmode").checked) {
                select(a);
                hit(b);
                if (this.breaking) select(A_B_W ? 1 : 0)
                else select(mainWeapon);

            }
            document.getElementById("showCps").innerHTML = "CPS: " + statusMode.cps++;
            setTimeout(() => {
                document.getElementById("showCps").innerHTML = "CPS: " + statusMode.cps--;
            }, 1e3)
        } else {
            select(mainWeapon);
        }
    }

    // CONFIG
    let A_B_T = true;
    let A_B_S = true;
    let T_A_B = true;
    let A_B_W = true;
    let A_H_HP = "High Ping";
    let H_A_L = true;
    let H_K_E = true;
    let D_M_S = false;
    let H_D_E = false;
    // COMMANDS
    window.addEventListener("keydown", function(e) {
        if(e.code == "Enter" && window.chat && window.chat.value != '') {
            if(window.chat.value == ".l ABT") {
                if (!A_B_T) {
                    A_B_T =! A_B_T
                    sendChat("Anti Trap Enabled")
                } else {
                    A_B_T =! A_B_T
                    sendChat("Anti Trap Disabled")
                }
            }
            if(window.chat.value == ".l ABS") {
                if (!A_B_S) {
                    A_B_S =! A_B_S
                    sendChat("AutoB Spike Enabled")
                } else {
                    A_B_S =! A_B_S
                    sendChat("AutoB Spike Disabled")
                }
            }
            if(window.chat.value == ".l TAB") {
                if (!T_A_B) {
                    T_A_B =! T_A_B
                    sendChat("P Trap Af AutoB Enabled")
                } else {
                    T_A_B =! T_A_B
                    sendChat("P Trap Af AutoB Disabled")
                }
            }
            if(window.chat.value == ".l ABW") {
                if (!A_B_W) {
                    A_B_W =! A_B_W
                    sendChat("Secondary Weapon for autobreak")
                } else {
                    A_B_W =! A_B_W
                    sendChat("Primary Weapon for autobreak")
                }
            }
            if (window.chat.value == ".l AHHP") {
                if (A_H_HP == "High Ping") {
                    A_H_HP = "Spam";
                    sendChat("Autoheal Set to Spam.");
                    return;
                } else if (A_H_HP == "Spam") {
                    A_H_HP = "High Ping";
                    sendChat("Autoheal Set to High-Ping");
                }
            }
            if (window.chat.value == ".l HAL") {
                if (!H_A_L) {
                    H_A_L =! H_A_L
                    sendChat("Hiding Array list")
                    document.getElementById("modmenu").style.display = "none";
                } else {
                    H_A_L =! H_A_L
                    sendChat("Showing Array List")
                    document.getElementById("modmenu").style.display = "block";
                }
            }
            if (window.chat.value == ".l HKE") {
                if (!H_K_E) {
                    H_K_E =! H_K_E
                    sendChat("Hiding Kill Effect")
                } else {
                    H_K_E =! H_K_E
                    sendChat("Showing Kill Effect")
                }
            }
            if (window.chat.value == ".l DMS") {
                if (!D_M_S) {
                    D_M_S =! D_M_S
                    sendChat("Using Dobule Musket Shoots.")
                } else {
                    D_M_S =! D_M_S
                    sendChat("Using Single Musket Shoots.")
                }
            }
            if (window.chat.value == ".l HDE") {
                if (!H_D_E) {
                    H_D_E =! H_D_E
                    sendChat("Hiding Damage Effect")
                } else {
                    H_D_E =! H_D_E
                    sendChat("Showing Damage Effect")
                }
            }
        }
    })

    var repeater = function (key, action) {
        let _isKeyDown = false;
        let _intervalId = undefined;
        return {
            start(code) {
                if (code === key && document.activeElement.id.toLowerCase() !== 'chatbox') {
                    _isKeyDown = true;
                    if (_intervalId === undefined) {
                        _intervalId = setInterval(() => {
                            action();
                            if (!_isKeyDown) {
                                clearInterval(_intervalId);
                                _intervalId = undefined;
                            }
                        }, (1000 / keyBinds.cps) + 16);
                    }
                }
            },
            stop(code) {
                if (code === key && document.activeElement.id.toLowerCase() !== 'chatbox') {
                    _isKeyDown = false;
                }
            }
        };
    };

    // Macros
    const boostPlacer = repeater(keyBinds.trap, () => place(7, getAttackDir()));
    const spikePlacer = repeater(keyBinds.spike, () => place(4, getAttackDir()));
    const millPlacer = repeater(keyBinds.windwill, () => place(5, getAttackDir()));
    const healer = repeater(keyBinds.heal, () => place(2, getAttackDir()));
    const platformPlacer = repeater(keyBinds.platform, () => place(8, getAttackDir()));
    var messageInterval = false;

    document.addEventListener("keydown", e => { // Macros work
        if (document.getElementById("chat-wrapper").style.display == "block") return;

        spikePlacer.start(e.code);
        boostPlacer.start(e.code);
        millPlacer.start(e.code);
        healer.start(e.code);
        platformPlacer.start(e.code);
        if (e.code == 192) { // ` key
            try {
                //var text = "test";
                //var encodeText = new TextEncoder().encode(text);
                //let message = [7, ...encodeText];
                //send(message);
            } catch (E) {
                console.error("Error", E);
            }
        }
        const keyMap = {
            49: 0,
            50: 1
        };

        if (keyMap.hasOwnProperty(e.keyCode)) {
            mainWeapon = keyMap[e.keyCode];
        }
    });

    document.addEventListener("keyup", e => {
        if (document.getElementById("chat-wrapper").style.display == "block") return;

        spikePlacer.stop(e.code);
        boostPlacer.stop(e.code);
        millPlacer.stop(e.code);
        healer.stop(e.code);
        platformPlacer.stop(e.code);
    });

    document.addEventListener("keydown", e => { // Hat macros
        if (document.getElementById("chat-wrapper").style.display == "block") return;

        if (e.code === keyBinds.hatBerserker) {
            equipHat(hats.berserker);
        }

        if (e.code === keyBinds.hatCrystal) {
            equipHat(hats.crystal_gear);
        }

        if (e.code === keyBinds.hatSpike) {
            equipHat(hats.spike_gear);
        }

        if (e.code === keyBinds.hatBoost) {
            equipHat(hats.boost_Hat);
        }

        if (e.code === keyBinds.hatScuba) {
            equipHat(hats.scuba_gear);
        }

        if (e.code === keyBinds.hatHood) {
            equipHat(hats.hood_gear);
        }

        if (e.code === keyBinds.hatDemolist) {
            equipHat(hats.demolist);
        }

        if (e.code === keyBinds.hatPumkin) {
            equipHat(hats.pumkin);
        }

        if (e.code === "ShiftLeft") {
            equipHat(hats.boost_Hat); // Boost Hat (LeftShift)
        }
    });


    const spikeUrls = new Set([ // Spinning spikes, Credits to Fizzixww
        "https://sploop.io/img/entity/hard_spike.png?v=1923912",
    ]);
    const spikeUpdate = (ctx, img, x, y, width, height, rotation) => {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(rotation);
        ogdraw.call(ctx, img, -width / 2, -height / 2, width, height);
        ctx.restore();
    };
    const ogdraw = CanvasRenderingContext2D.prototype.drawImage;
    CanvasRenderingContext2D.prototype.drawImage = function(img, ...args) {
        if (this.canvas && this.canvas.id === "game-canvas" && img instanceof HTMLImageElement && img.src && spikeUrls.has(img.src)) {
            let x, y, width, height;
            if (args.length === 2) {
                [x, y] = args;
                width = img.width;
                height = img.height;
            } else if (args.length === 4) {
                [x, y, width, height] = args;
            } else if (args.length === 8) {
                [,,,, x, y, width, height] = args;
            } else {
                return ogdraw.apply(this, [img, ...args]);
            }
            this.globalAlpha = 0;
            ogdraw.apply(this, [img, ...args]);
            this.globalAlpha = 1;
            const rotation = (performance.now() / 1000 * keyBinds.spikeSpinSpeed) % (2 * Math.PI);
            spikeUpdate(this, img, x, y, width, height, rotation);
        } else {
            return ogdraw.apply(this, [img, ...args]);
        }};
    if (shadow) {
        const { fillText } = CanvasRenderingContext2D.prototype; // Render Game Shadows
        CanvasRenderingContext2D.prototype.fillText = function (name, text, x, y) {
            const canvas = document.getElementById("game-canvas");
            const ctx = canvas.getContext("2d");
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 2;
            ctx.shadowColor = "#181818";
            fillText.call(this, ...arguments);
        };
    }

    const night = document.createElement("div"); // Render Night mode
    const moon = document.createElement("div"); // Render Moon mode

    night.innerHTML = `<div id="nightEl" style="transition: 0.3s; display: block; opacity: 0; position: absolute;z-index: 2;width: 100%;height: 100%;background: rgba(0, 0, 44, 0.7);pointer-events: none;"></div>`;
    moon.innerHTML = `<img id="moonEl" src="https://cdn.glitch.global/ca081162-612b-4311-8a7d-7828f21c13e0/%E2%80%94Pngtree%E2%80%94white%20moon%20in%20the%20night_5054146.png?v=1725300100810" width="300" height="300" style="pointer-events: none;z-index: 5; position: absolute; top: 1%; left: 43.5%; opacity: 0;">`;

    document.body.appendChild(night);
    document.body.appendChild(moon);

    let snows = ["❅", "❆", "❃", "❇", "❈", "❉", "❊", "❋"];

    const style = document.createElement('style');
    style.innerHTML = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: #111;
        min-height: 100vh;
        overflow: hidden;
    }

    .star {
        position: absolute;
        z-index: 3;
        top: -20px;
        color: #75b1d4; /* COLOR OF IT */
        animation: animate 5s linear forwards;
        opacity: 0;
    }

    .winter {
        position: absolute;
        z-index: 3;
        top: -20px;
        color: white; /* COLOR OF IT */
        animation: animate 5s linear forwards;
        opacity: 0;
    }

    .winter::before {
        content: var(--snow-icon);
        font-family: sans-serif; /* Sadece Unicode karakterler kullandığınız için FontAwesome gerekmez */
        text-shadow: 0 0 20px #3a9bd2, 0 0 80px #3a9bd2;
    }

    .star::before {
        content: "⭐";
        font-family: FontAwesome;
        text-shadow: 0 0 20px #3a9bd2, 0 0 80px #3a9bd2, 0 0 100px #3a9bd2;
    }

    @keyframes animate {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }

        80% {
            opacity: 1;
        }

        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @media screen and (max-width: 600px) {
        .star {
            font-size: 8px;
        }
        .winter {
            font-size: 8px;
        }
    }
`;

    document.head.appendChild(style);

    function stars() {
        let e = document.createElement("div");
        e.setAttribute("class", "winter"); // should be star in ends of winter
        document.body.appendChild(e);
        e.style.left = Math.random() * innerWidth + "px";

        let randomSnow = snows[Math.floor(Math.random() * snows.length)];
        e.style.setProperty('--snow-icon', `'${randomSnow}'`);

        let size = Math.random() * 12;
        let duration = Math.random() * 3;

        e.style.fontSize = Math.floor(Math.random() * (60 - 25 + 1)) + 25 + "px";
        e.style.animationDuration = 2 + duration + "s";

        setTimeout(function () {
            document.body.removeChild(e);
        }, 5000);
    }

    // Create Stars
    setInterval(() => {
        // if (!document.getElementById("nightmode").checked) return
        stars();
    }, 150)


    // PINK BORDER
    const pinkborder = document.createElement("div");
    pinkborder.innerHTML = `<div id="pinkyborder" style="transition: 0.5s; display: block; opacity: 0; position: absolute;z-index: 2;width: 100%;height: 100%;background: radial-gradient(transparent 40%, #e2a5d6);pointer-events: none; z-index: 3;"></div>`;
    document.body.appendChild(pinkborder);
    function showBorder(second) {
        if (H_K_E) return
        document.getElementById("pinkyborder").style.opacity = 1;
        setTimeout(() => { document.getElementById("pinkyborder").style.opacity = 0; }, second * 1000)
    }

    // HEALTH BORDER
    const healthborder = document.createElement("div");
    healthborder.innerHTML = `
  <div id="damagecolor" style="transition: background 0.3s ease; display: block; position: absolute; z-index: 2; width: 100%; height: 100%; background: radial-gradient(transparent 100%, red); pointer-events: none; z-index: 3;"></div>
`;
    document.body.appendChild(healthborder);

    function ShowDamage(value) {
        if (H_D_E) return
        const damageColor = document.getElementById("damagecolor");
        damageColor.style.background = `radial-gradient(transparent ${value}%, red)`;
    }





    // Check everything
    setInterval(function () {

        // Array list
        const featureList = [
            "Autoheal", "killChat", "autobreak", "nightmode", "AutoPlacer",
            "Msync", "Ssync", "AutoReplacer", "ASync", "AimBot"
        ];

        featureList.forEach((feature, index) => {
            if (feature) {
                if (document.getElementById("nightmode").checked) {
                    document.getElementsByClassName("arraylist")[index].style.color = document.getElementById(feature).checked ? "#94edf9" : "transparent"
                } else {
                    document.getElementsByClassName("arraylist")[index].style.color = document.getElementById(feature).checked ? "lime" : "red";
                }
            }
        });

        document.getElementsByClassName("line")[0].style.background = document.getElementById("nightmode").checked ? "#94edf9" : "white"
        document.getElementById("modmenu").style.borderColor = document.getElementById("nightmode").checked ? "#94edf9" : "white"
        document.getElementById("showPing").style.color = document.getElementById("nightmode").checked ? "#94edf9" : "white";
        document.getElementById("showPps").style.color = document.getElementById("nightmode").checked ? "#94edf9" : "white";
        document.getElementById("showCps").style.color = document.getElementById("nightmode").checked ? "#94edf9" : "white";


        ctx.fillStyle = document.getElementById("nightmode").checked ? "black" : "#788f57";



        if (document.getElementById("nightmode").checked) { // Night mode check
            document.getElementById("nightEl").style.opacity = "1";
            document.getElementById("moonEl").style.opacity = "1";
        } else {
            document.getElementById("nightEl").style.opacity = "0";
            document.getElementById("moonEl").style.opacity = "0";
        }

    }, 200);
    setTimeout(() => {
        notif("info", "Hello", "Welcome to Lovey Mod", 2000)
    }, 5000);

    const CkuAntiCheat = {
        local: undefined
    };
    const canvas = CkuAntiCheat;
    window.addEventListener("DOMContentLoaded", e => {
        canvas.local = document.getElementById("game-canvas").getContext("2d");
    });

    // Script from my own legit mod

    let animegirlwallpaper = ["https://cdn.glitch.global/deac95e8-3f6c-400f-b266-9f943bb3148e/sad-girl-anime-girl-3840x2160-10021.jpg?v=1722538576479"];
    let wow = Math.floor(Math.random() * animegirlwallpaper.length);

    let homepage = document.querySelector("#homepage");
    homepage.style.backgroundImage = `url(${animegirlwallpaper[wow]})`;
    homepage.style.backgroundSize = "2200px";
    homepage.style.backgroundRepeat = "no-repeat";
    homepage.style.backgroundPosition = "center";
    homepage.style.height = "100%";
    homepage.style.width = "100%";
    homepage.style.transition = "0.1s";


    homepage.addEventListener("mousemove", (e) => {
        let rect = homepage.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width * 100;
        let y = (e.clientY - rect.top) / rect.height * 100;
        homepage.style.backgroundPosition = `${x}% ${y}%`;
    });


    document.querySelector("#game-middle-main").style = `
    background-color: rgba(33, 33, 33, 0.1);
    box-shadow: none;
    width: 39.1%;
    position: absolute;
    border: 5px solid #212121;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 20px;
`;
    document.querySelector("#game-content").style.backgroundColor = "transparent";
    let hahacss = document.createElement("style");

    hahacss.innerHTML = `
#nav {
opacity: 0;
transition: 0.3s;
}

#nav:hover {
opacity: 1;
}

#play {
background: transparent;
border: none;
box-shadow: none;
backdrop-filter: blur(10px);
transition: 0.3s;
}

#play:hover {
border: none;
box-shadow: none;
background-color: #212121;
}

#play-text {
text-align: center;
text-shadow: none;
color: white;
left: 50%;
transform: translate(-50%, 0);
font-weight: bolder;
}

.dark-blue-button {
background: transparent;
border: none;
box-shadow: none;
backdrop-filter: blur(10px);
transition: 0.3s;
text-shadow: none;
font-size: 20px;
transition: 0.3s;
border-radius: 10px;
}

.dark-blue-button:hover {
background: #212121;
box-shadow: none;
}

.dark-blue-button-3-active {
border: 5px solid lime;
border-radius: 10px;
}

#server-select {
backdrop-filter: blur(10px);
background: transparent;
box-shadow: none;
border: none;
text-shadow: none;
font-size: 18px;
transition: 0.3s;
}

#server-select:hover {
background: #212121;
box-shadow: none;
text-shadow: none;
}

#nickname {
background: transparent;
text-shadow: none;
border: none;
box-shadow: none;
transition: 0.3s;
backdrop-filter: blur(10px);
}

#nickname:hover {
background: #212121;
text-shadow: none;
border: none;
box-shadow: none;
}

#chat {
    margin: 0;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    outline: none;
    border-radius: 7px;
    border: 3.5px solid white;
    padding: 10px;
    font-size: 20px;
    width: 250px;
    height: 50px;
    color: white;
    backdrop-filter: blur(10px);
    background-color: transparent;
    box-shadow: none;
    transition: 0.6s;
    animation: bounce 700ms 1 ease;
    opacity: 0.9.5;
}

#chat:hover {
opacity: 1;
transform: scale(1.2);
background: #212121;
}

#hat-menu {
    margin: 0;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 15px;
    border: 5px solid white;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    padding: 25px;
    box-shadow: none;
    transition: opacity 300ms;
    height: 400px;
    width: 500px;
    display: none;
    opacity: 1;
    background: transparent;
    backdrop-filter: blur(10px);
    transition: 0.3s;
}

#hat_menu_content {
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    pointer-events: all;
    background: transparent;
    border-radius: 10px;
    margin: 20px 0 30px 0;
    border: 5px solid white;
    box-shadow: none;
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
    transition: 0.3s;
    padding: 8px 0 0 0;
}

#hat_menu_content:hover {

}

.hat_action_button {
    pointer-events: all;
    margin: 0;
    font-weight: bolder;
    font-weight: 900;
    box-sizing: border-box;
    user-select: none;
    text-shadow: none;
    background-color: transparent;
    box-shadow: none;
    margin-left: auto;
    outline: none;
    border: 4px solid white;
    padding: 7px;
    font-size: 18px;
    cursor: url(img/ui/cursor-pointer.png) 6 0, pointer;
    margin-top: auto;
    margin-bottom: auto;
    color: #fff;
    border-radius: 10px;
    backgdrop-filter: blur(10px);
    transition: 0.3s;
}

.hat_action_button:hover {
    background-color: lime;
    transform: scale(1.2);
    box-shadow: none;
}

#clan-menu {
    margin: 0;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 360px;
    position: absolute;
    border-radius: 15px;
    border: 5px solid white;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    padding: 25px;
    box-shadow: none;
    transition: 0,3s;
    display: block;
    opacity: 1;
    background: transparent;
    backdrop-filter: blur(10px);
}

#clan-menu:hover {
background: #212121;
box-shadow: none;
}

.clan_action_button {
    margin: 0;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    background-color: transparent;
    box-shadow: none;
    margin-left: auto;
    outline: none;
    border: 4px solid white;
    border-color: white;
    padding: 7px;
    font-size: 18px;
    cursor: url(img/ui/cursor-pointer.png) 6 0, pointer;
    margin-top: auto;
    margin-bottom: auto;
    color: #fff;
    border-radius: 10px;
    transition: 0.3s;
}

.clan_action_button:hover {
box-shadow: none;
transform: scale(1.2);
background-color: lime;
border: 4px solid white;
border-color: white;
}

#create-clan-button {
    margin: 0;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border-radius: 10px;
    border: 4px solid white;
    color: white;
    padding: 16px 30px;
    cursor: url(img/ui/cursor-pointer.png) 6 0, pointer;
    transition: 0.3s;
}

#create-clan-button:hover {
background-color: lime;
box-shadow: none;
transform: scale(1.2);
border: 4px solid white;
}

#clan-menu-clan-name-input {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
    font-weight: bolder;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    outline: none;
    background-color: transparent;
    box-shadow: none;
    border: 4px solid white;
    font-size: 17px;
    padding-top: 15px;
    padding-bottom: 15px;
    min-width: 58%;
    padding-left: 5px;
    border-radius: 10px;
    color: white;
    transition: 0.3s;
}

#clan-menu-clan-name-input:hover {
background-color: #212121;
box-shadow: none;
text-shadow: none;
transform: scale(1.2);
}

#pop-settings {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    position: absolute;
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 5px solid white;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    padding: 25px;
    box-shadow: none;
    transition: 0.3s;
    opacity: 1;
    animation: bounce 400ms 1 ease;
    width: 580px;
    height: 330px;
    overflow-y: scroll;
    display: flex;
}

#pop-login {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    box-sizing: border-box;
    user-select: none;
    cursor: url(img/ui/cursor-default.png) 2 0, default;
    position: absolute;
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 5px solid white;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    padding: 25px;
    box-shadow: none;
    transition: opacity 300ms;
    opacity: 1;
    animation: bounce 400ms 1 ease;
    width: 460px;
    display: flex;
}
`

    setTimeout(() => {

        document.head.appendChild(hahacss);

    }, 1000);
    // REMOVE USELESS THINGS & CHANGE SOME TEXT

    setTimeout(() => {
        // REMOVE OR DO NONE ON DISPLAY

        ["#da-left"]
        const removeel = [
            "#da-left", "#logo", "#lostworld-io_300x250_2", "#da-right",
            "#lostworld-io_970x250", "#game-bottom-content", "#alsoTryImg",
            "#cross-promo > a.biscuit_hover.biscuit_position", "#policy",
            "#left-content", "#discord > img", "#play > div.background-moving.background-img-play",
            "#hat-menu > div.pop-top.select"
        ];

        removeel.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.remove();
        });

        document.querySelector("#main-content").style.backgroundColor = "transparent";
        document.querySelector("#game-right-content-main").style.opacity = 0;
        document.querySelector("#game-left-content-main").style.opacity = 0;

        const hideel = [
            "#hat_menu_content > div:nth-child(8)",
            "#hat_menu_content > div:nth-child(1)"
        ];

        hideel.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.style.display = "none";
        });


        // CHANGE THE TEXT
        document.querySelector("#signup-button").textContent = "REGISTER";
    }, 500);

    setTimeout(() => {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(element => document.getElementsByClassName("pricing hat_price_tag")[element].remove())
    }, 6000);

    document.querySelector("#pop-settings > div.pop-settings-content > div:nth-child(1) > div.control-group > label > div").click()
    document.querySelector("#pop-settings > div.pop-settings-content > div:nth-child(5) > div.control-group > label > div").click()

}, 300);
