export interface NearestCellsCoords {
	x: number
	y: number
}

export interface CellData {
	x: number
	y: number
	nearestCellsCoords: NearestCellsCoords[]
	distance: number
	prevCell: string
	start: boolean
	end: boolean
}

export interface ObjCellsData {
	[key: string]: CellData
}

export interface ObjWalls {
	[key: string]: boolean
}

export interface AnimateAlgos {
	algoType: 'dijkstra'
	cellName: string
}

export interface ISetCellsData {
	cellsData: ObjCellsData
	startCell: string
	endCell: string
}
