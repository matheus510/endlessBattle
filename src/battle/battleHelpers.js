export default {
    battleIsOn(battleStatus, enemyHp) {
        return (battleStatus === true && enemyHp > 0) ? true : false
    },
    calculateDamage(min, baseAttack) {
        return Math.floor(Math.random() * (baseAttack)) + min
    }
}