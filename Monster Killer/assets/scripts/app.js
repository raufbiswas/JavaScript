const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

function getMaxLifeValues() {
    const parsedValue = parseInt(prompt("Maximum life for you and the monster: "));
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: 'Invalid user input, not a number!'};
    }
    return parsedValue
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry;
    if (ev === "PLAYER_ATTACK" || ev === "PLAYER_STRONG_ATTACK") {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev == "MONSTER_ATTACK" || ev === "PLAYER_HEAL") {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev === "GAME_OVER") {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
};


function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        "MONSTER_ATTACK",
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    )
    
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!')
        
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Won!");
        writeToLog(
            "MONSTER_ATTACK",
            "PLAYER WON",
            currentMonsterHealth,
            currentPlayerHealth
        )
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!")
        writeToLog(
            "MONSTER_ATTACK",
            "MONSTER WON",
            currentMonsterHealth,
            currentPlayerHealth
        )
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("You have a draw!")
        writeToLog(
            "MONSTER_ATTACK",
            "A DRAW",
            currentMonsterHealth,
            currentPlayerHealth
        )
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;

    if (mode === "ATTACK") {
        maxDamage = ATTACK_VALUE;
        logEvent = "PLAYER_ATTACK";
    } else if (mode === "STRONG_ATTACK") {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = "PLAYER_STRONG_ATTACK";
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();
}

function attackHandler() {
    attackMonster("ATTACK");
}

function strongAttackHandler() {
    attackMonster("STRONG_ATTACK")
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        "PLAYER_HEAL",
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();

}

function printLogHandler() {
    for (let i = 0; i < 3; i++) {
        console.log("-------------")
    }
    let i = 0
    for (const logEntry of battleLog) {
        console.log(i);
        for (const key in logEntry) {
            console.log(`${key} ==> ${logEntry[key]}`);
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);