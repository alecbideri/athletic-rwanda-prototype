import athlete from './athlete.json'
import coach from './coach.json'
import federations from './federations.json'
import matches from './matches.json'
import registry from './registry.json'

export const prototypeData = { athlete, coach, federations, matches, registry }

export type PrototypeData = typeof prototypeData
