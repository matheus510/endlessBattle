<template>
  <div id="app">
    <battle-interface :selectedPlayer="player" :providedMonsterArray="monsterArray"></battle-interface>
  </div>
</template>

<script>
import { EventBus } from './main.js'
import BattleInterface from './battle/components/BattleInterface.vue'
import BattleLog from './battle/components/BattleLog.vue'

  export default {
    data() {
      return {
        matchInProgress: false,
        player: {
            name: 'John',
            health: 100,
            attack: 13,
            hp: 100
        },
        monsterArray: [
            {
                name: 'Troll',
                health: 100,
                attack: 7,
                hp: 100
            },
            {
                name: 'Golem',
                health: 150,
                attack: 13,
                hp: 250
            },
            {
                name: 'Dark Elf',
                health: 180,
                attack: 20,
                hp: 280
            },
            {
                name: 'Skeleton King',
                health: 250,
                attack: 25,
                hp: 250
            }
        ],
        logs: []
    }
    },
    computed: {
        playerHP: function () {
            let fullHP = this.player.health
            let percentageHP = (this.player.hp * 100) / this.player.health
            if (percentageHP <= 0) {
                this.player.hp = 0
                return '0%'
            } else {
                return `${percentageHP}%`
            }
        },
        monsterHP: function () {
            let fullHP = this.monster.health
            let percentageHP = (this.monster.hp * 100) / this.monster.health
            if (percentageHP <= 0) {
                this.monster.hp = 0
                return '0%'
            } else {
                return `${percentageHP}%`
            }
        },
    },
    components: {
      BattleInterface,
      BattleLog
    }
  }
</script>

<style>
.text-center {
    text-align: center;
}

.healthbar {
    width: 80%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 500ms;
}

.controls, .log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
}

.turn {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
}

.log ul {
    list-style: none;
    font-weight: bold;
    text-transform: uppercase;
}

.log ul li {
    margin: 5px;
}

.log ul .player-turn {
    color: blue;
    background-color: #e4e8ff;
}

.log ul .monster-turn {
    color: red;
    background-color: #ffc0c1;
}

button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
}

#start-game {
    background-color: #aaffb0;
}

#start-game:hover {
    background-color: #76ff7e;
}

#attack {
    background-color: #ff7367;
}

#attack:hover {
    background-color: #ff3f43;
}

#special-attack {
    background-color: #ffaf4f;
}

#special-attack:hover {
    background-color: #ff9a2b;
}

#heal {
    background-color: #aaffb0;
}

#heal:hover {
    background-color: #76ff7e;
}

#give-up {
    background-color: #ffffff;
}

#give-up:hover {
    background-color: #c7c7c7;
}
</style>
