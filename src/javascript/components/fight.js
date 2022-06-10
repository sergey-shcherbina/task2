import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  if (damage > 0) {
    return damage
  } else {
    return 0
  }

  // return damage
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1);
  // return hit power
}


export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1);
  // return block power
}

