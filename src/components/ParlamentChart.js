import React from 'react'

import * as Highcharts from 'highcharts';
import ItemSeriesModule from 'highcharts/modules/item-series';
import HighchartsReact from 'highcharts-react-official'

ItemSeriesModule(Highcharts);

const options = {

    chart: {
        type: 'item'
    },

    title: {
        text: 'Распределение'
    },

    subtitle: {
        text: 'ТЕСТ'
    },

    legend: {
        labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
    },

    series: [{
        name: 'Representatives',
        keys: ['name', 'y', 'color', 'label'],
        data: [
            ['TEST', 15, '#BE3075', 'TEST'],
            ['TEST', 25, '#EB001F', 'TEST'],
            ['TEST', 30, '#64A12D', 'TEST'],
            ['TEST', 12, '#FFED00', 'TEST'],
            ['TEST', 7, '#000000', 'TEST'],
            ['TEST', 20, '#008AC5', 'TEST'],
            ['TEST', 35, '#009EE0', 'TEST']
        ],
        dataLabels: {
            enabled: true,
            format: '{point.label}'
        },

        // Circular options
        center: ['50%', '88%'],
        size: '170%',
        startAngle: -100,
        endAngle: 100
    }]
}

const ParlamentChart = () => <HighchartsReact
  highcharts={Highcharts}
  constructorType={'chart'}
  options={options}
/>

export default ParlamentChart