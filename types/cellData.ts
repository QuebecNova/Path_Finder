export interface NearestCellsCoords {
	x: number
	y: number
}

export interface CellData {
	x: number
	y: number
	nearestCellsCoords: NearestCellsCoords[]
}

export interface ObjCellsData {
	[key: string]: CellData
}

export interface ObjWalls {
	[key: string]: boolean
}
