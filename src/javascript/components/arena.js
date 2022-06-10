import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';

import { fight, getDamage, getHitPower, getBlockPower } from './fight';
import { controls } from '../../constants/controls';

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);
  
  console.log(getBlockPower({...selectedFighters[0], defense: 0}))
  console.log(getBlockPower(selectedFighters[0]))

 
  let c;
  let a = [];
  let start = Date.now();
  const func = event => {
    if (a.length >= 2 || (Date.now() - start) > 2000) {
      if (a[0] === undefined || a[0] === 'block1' && a[1] === undefined || a[0] === 'block2' && a[1] === undefined ||
      a[0] === 'block1' && a[1] === 'block1' || a[0] === 'block1' && a[1] === 'block2' || a[0] === 'block2' && a[1] === 'block1' 
      || a[0] === 'block2' && a[1] === 'block2')  {
        console.log(getDamage({atack: 0}, {defense: 0}))
        // return 0
      }
      if (a[0] === 'hit1' && a[1] === undefined || a[0] === 'hit1' && a[1] === 'block1' || a[0] === 'block1' && a[1] === 'hit1') {
        console.log(getDamage(selectedFighters[0], {defense: 0}))
      }
      if (a[0] === 'hit2' && a[1] === undefined || a[0] === 'hit2' && a[1] === 'block2' || a[0] === 'block2' && a[1] === 'hit2') {
        console.log(getDamage(selectedFighters[1], {defense: 0}))
      }
      if (a[0] === 'hit1' && a[1] === 'hit1') {
        console.log(getDamage(selectedFighters[0], {defense: 0}) + getDamage(selectedFighters[0], {defense: 0}))
      }
      if (a[0] === 'hit1' && a[1] === 'hit2' || a[0] === 'hit2' && a[1] === 'hit1') {
        console.log(getDamage(selectedFighters[0], {defense: 0}))
        console.log(getDamage(selectedFighters[1], {defense: 0}))
      }
      if (a[0] === 'hit1' && a[1] === 'block2') {
        console.log(getDamage(selectedFighters[0], selectedFighters[1]))
      }
      if (a[0] === 'hit2' && a[1] === 'hit2') {
        console.log(getDamage(selectedFighters[1], {defense: 0}) + getDamage(selectedFighters[1], {defense: 0}))
      
      }
      if (a[0] === 'hit2' && a[1] === 'block1') {
        console.log(getDamage(selectedFighters[1], selectedFighters[0]))
      }
      if (a[0] === 'block1' && a[1] === 'hit2') {
        console.log(getDamage(selectedFighters[1], selectedFighters[0]))
      }
      if (a[0] === 'block2' && a[1] === 'hit1') {
        console.log(getDamage(selectedFighters[0], selectedFighters[1]))
      }
      a = []
    }
   
    if (event.code === controls.PlayerOneAttack) {
      a.push('hit1')
      start = Date.now()
    }
    if (event.code === controls.PlayerOneBlock) {
      a.push('block1')

      start = Date.now()
    }
    if (event.code === controls.PlayerTwoAttack) {
      a.push('hit2')
      start = Date.now()
    }
    if (event.code === controls.PlayerTwoBlock) {
      a.push('block2')
      start = Date.now()
    }
    document.removeEventListener('keydown', func)
  }
    document.addEventListener('keyup', func)
    document.addEventListener('keyup', func)
    
  
  // todo:
  // - start the fight
  // - when fight is finished show winner
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
