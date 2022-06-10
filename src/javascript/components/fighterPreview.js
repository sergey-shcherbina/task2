import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  const positionImgClassName = position === 'right' ? 'fighter-preview-right___img' : 'fighter-preview-left___img';
  const fighterImgElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionImgClassName}`,
  });
  
  if (fighter !== undefined) {
    fighterElement.append(fighter.name);
    const imgElement = createFighterImage(fighter);
    fighterImgElement.append(imgElement);
    fighterElement.append(fighterImgElement, `health - ${fighter.health} attack - ${fighter.attack} defence - ${fighter.defense}`)
  }

  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

