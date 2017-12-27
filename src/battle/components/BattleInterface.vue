<template>
  <div>
    <section class="row">
        <div class="small-6 columns">
            <h1 class="text-center">{{ player.name }}</h1>
            <div class="healthbar">
                <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width: playerHP}">
                    {{ player.hp }}
                </div>
            </div>
        </div>
        <div class="small-6 columns">
            <h1 class="text-center">{{ monster.name }}</h1>
            <div class="healthbar">
                <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width: monsterHP}">
                    {{ monster.hp }}
                </div>
            </div>
        </div>
    </section>
    <section class="row controls" v-if="!matchInProgress">
        <div class="small-12 columns">
            <button id="start-game" @click="startMatch">START NEW GAME</button>
        </div>
    </section>
    <section class="row controls" v-else>
        <div class="small-12 columns">
            <button id="attack" @click="playerAttack">ATTACK</button>
            <button id="special-attack" @click="playerSpecialAttack">SPECIAL ATTACK</button>
            <button id="heal" @click="playerHeal">HEAL</button>
            <button id="give-up" @click="playerRun">GIVE UP</button>
        </div>
    </section>
  </div>
</template>

<script>
import { eventBus } from '../../main.js'
import battleHelpers from '../../battle/battleHelpers'

const battleIsOn = battleHelpers.battleIsOn
const calculateDamage = battleHelpers.calculateDamage

export default {
    data() {
        return {
            player: this.selectedPlayer,
            monster: this.actualMonster,
            monsterArray: this.providedMonsterArray,
            matchInProgress: false
        }
    },
    props: {
        'selectedPlayer': {
            type: Object,
            default: {
                name: 'John Doe',
                attack: 10,
                totalHealth: 100,
                hp: 100
            }            
        },
        'actualMonster': {
            type: Object,
            default: () => {
                return {
                    name: 'Troll',
                    attack: 7,
                    totalHealth: 80,
                    hp: 100
                }
            }
        },
        'providedMonsterArray': {
            type: Array,
            required: true
        }
    },
    methods: {
        monsterAttack() {
            if (battleIsOn(this.matchInProgress, this.player.hp)) {
                let monsterDamage = calculateDamage(1, this.monster.attack)
                this.player.hp -= monsterDamage

                let logMessage = `${this.monster.name} caused ${monsterDamage} points of damage to ${this.player.name}`
                this.logEmitted({message: logMessage, from: 'monster'})
                
                //check if player is dead
                if (this.player.hp <= 0) {
                    alert('You are dead...')
                    this.matchInProgress = false
                }
            }
        },
        playerAttack() {
            if (this.matchInProgress === true && this.monster.hp > 0) {
                let playerDamage = calculateDamage(1, this.player.attack)
                this.monster.hp -= playerDamage

                let logMessage = `${this.player.name} caused ${playerDamage} points of damage to ${this.monster.name}`
                this.logEmitted({message: logMessage, from: 'player'})
                if (this.monster.hp <= 0) {
                    alert('YOU BEAT THIS MONSTER')
                    this.matchInProgress = false
                }
                this.monsterAttack()
            }
        },
        playerSpecialAttack() {
            if (this.matchInProgress === true && this.monster.hp > 0) {
                let playerDamage = calculateDamage(10, (this.player.attack * 1.5))
                this.monster.hp -= playerDamage
    
                let logMessage = `${this.player.name} caused ${playerDamage} points of damage to ${this.monster.name} with an SPECIAL ATTACK! AAAAAAARGH`
                this.logEmitted({message: logMessage, from: 'player'})
                if (this.monster.hp <= 0) {
                    alert('YOU BEAT THIS MONSTER')
                    this.matchInProgress = false
                }                
                this.monsterAttack()
            }
        },
        playerHeal() {
            if (this.matchInProgress === true) {
                let playerHeal = Math.floor(Math.random() * (this.player.attack * 0.5)) + 1
                this.player.hp += playerHeal
    
                let logMessage = `${this.player.name} healed ${playerHeal} health points!`
                this.logEmitted({message: logMessage, from: 'player'})
                this.monsterAttack()
            }
        },
        playerRun() {
            this.matchInProgress = false
        },
        startMatch() {
            this.matchInProgress = true
            this.monster = this.monsterArray[Math.floor(Math.random()*this.monsterArray.length)]
            this.player.hp = this.player.health
            this.monster.hp = this.monster.health
            this.logs = []
        },
        logEmitted(logObj) {
            eventBus.$emit('newLog', logObj)
        }
    },
    computed: {
        playerHP() {
            let percentageHP = (this.player.hp * 100) / this.player.health

            if (percentageHP <= 0) {
                this.player.hp = 0

                return '0%'
            } else {

                return `${percentageHP}%`
            }
        },
        monsterHP() {
            let percentageHP = (this.monster.hp * 100) / this.monster.health

            if (percentageHP <= 0) {
                this.monster.hp = 0

                return '0%'
            } else {
                
                return `${percentageHP}%`
            }
        },        
    }

}
</script>

<style>

</style>
