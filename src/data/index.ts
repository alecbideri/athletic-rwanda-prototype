import athlete from './athlete.json'
import federations from './federations.json'
import matches from './matches.json'
import registry from './registry.json'

export const prototypeData = { athlete, federations, matches, registry }

export type PrototypeData = typeof prototypeData
