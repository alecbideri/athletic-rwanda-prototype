import athlete from './athlete.json'
import coach from './coach.json'
import federations from './federations.json'
import matches from './matches.json'
import medical from './medical.json'
import ministry from './ministry.json'
import registry from './registry.json'

export const prototypeData = { athlete, coach, federations, matches, medical, ministry, registry }

export type PrototypeData = typeof prototypeData
