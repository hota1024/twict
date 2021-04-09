import { Point } from './Point'

/**
 * BoudingBox type.
 */
export type BoudingBox = {
  type: 'Polygon'
  coordinates: Point[][]
}
