export interface NearestCellsCoords {
	x: number
	y: number
}

export interface CellData {
	x: number
	y: number
	nearestCellsCoords: NearestCellsCoords[]
	isWall: boolean
}

export interface ObjCellsData {
	[key: string]: CellData
}
