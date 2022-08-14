import { Options } from '../types/options'

const selectOptions: Options[] = [
	{
		name: 'Dijkstra`s algorithm',
		value: 'dijkstra',
	},
	{
		name: 'A*(A Star) algorithm',
		value: 'astar',
	},
	{
		name: 'Greedy Best First Algorithm',
		value: 'greedy',
	},
]

export default selectOptions
