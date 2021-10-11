import { Chart, registerables } from 'chart.js'
import { chart1 } from './chart1'
import * as _ from 'lodash'
import zoomPlugin from 'chartjs-plugin-zoom'
import { chart3 } from './chart3'
Chart.register(...registerables, zoomPlugin)

var ctx = document.getElementById('myChart').getContext('2d')
var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [...chart1[0].label],
		datasets: [
			{
				label: '# of Votes',
				data: [...chart1[0].price],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
	options: {
		plugins: {
			zoom: {
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					mode: 'xy',
				},
			},
		},
	},
})

// const orderedChart3 = _.orderBy(chart3[0].subtype, 'number', 'desc')
// console.log(orderedChart3)
const orderedMainTypePieNumber = _.orderBy(chart3, 'number', 'desc').map((item) => item.number)

const orderedMainTypePieLabel = _.orderBy(chart3, 'number', 'desc').map((item) => item.typeName)

var ctx2 = document.getElementById('mainTypePie').getContext('2d')
var mainTypePie = new Chart(ctx2, {
	type: 'pie',
	data: {
		labels: orderedMainTypePieLabel,
		datasets: [
			{
				label: '# of Votes',
				data: orderedMainTypePieNumber,
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
	options: {
		onClick: (evt) => {
			let a = mainTypePie.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true)
			subtypePieRender(a[0].index)
		},
	},
})
let subTypePie = null
function subtypePieRender(index) {
	const orderedSubTypePieNumber = _.orderBy(chart3[index].subtype, 'number', 'desc').map((item) => item.number)

	const orderedSubTypePieLabel = _.orderBy(chart3[index].subtype, 'number', 'desc').map((item) => item.name)

	var ctx3 = document.getElementById('subTypePie').getContext('2d')
	if (subTypePie !== null) {
		subTypePie.destroy()
	}
	subTypePie = new Chart(ctx3, {
		type: 'pie',
		data: {
			labels: orderedSubTypePieLabel,
			datasets: [
				{
					label: '# of Votes',
					data: orderedSubTypePieNumber,
					backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
					borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
					borderWidth: 1,
				},
			],
		},
	})
}
