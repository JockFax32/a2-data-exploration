$(function () {
    d3.csv('data/prep_data.csv', function (err, data) {
        var margin = {
            left: 70,
            bottom: 100,
            top: 50,
            right: 50,
        };


        var height = 600 - margin.bottom - margin.top;
        var width = 1000 - margin.left - margin.right;
        // measure = xxx; // variable to visualize

        // Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
        var svg = d3.select('#vis')
            .append('svg')
            .attr('height', 600)
            .attr('width', 1000);
        
/* ****** Create G elements and Axis ****** */ 
        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('height', height)
            .attr('width', width);

        var xAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .attr('class', 'axis');

        var yAxisLabel = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');


    })
})

