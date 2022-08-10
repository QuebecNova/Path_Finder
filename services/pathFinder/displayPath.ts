import { ObjCellsData } from '../../types/pathTypes'

export default function displayPath(
	curCellsData: ObjCellsData,
	endCell: string
) {
	const path: string[] = [curCellsData[endCell].prevCell]
	let end = false
	return function createPath(prev: string) {
		if (curCellsData[prev].start || end) {
			end = true
			path.pop()
			path.forEach((cell) => {
				document.getElementById(cell)?.classList.add('cellPath')
			})
			return
		}
		if (!curCellsData[prev].start) {
			const prevCell = curCellsData[prev].prevCell
			path.push(prevCell)
			createPath(prevCell)
		}
	}
}
