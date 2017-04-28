$(function () {
    d3.csv('data/prep_data.csv', function (err, data) {
        var margin = {
            left: 70,
            bottom: 100,
            top: 50,
            right: 50,
        };

        // console.log(data)
        var height = 600 - margin.bottom - margin.top;
        var width = 1000 - margin.left - margin.right;
        
        // set default variables
        region = 'North America'
        year = '2011'
        measure = 'research';
        color = 'blue'
        
        // Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
        var svg = d3.select('#vis')
            .append('svg')
            .attr('height', 600)
            .attr('width', 1000);
        
        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('height', height)
            .attr('width', width);


        /* ****** Axis ****** */ 
        var xAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .attr('class', 'axis');

        var yAxisLabel = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');


        var xAxisText = svg.append('text')
            .attr('transform', 'translate(' + (margin.left + width / 2.5) + ',' + (height + margin.top + 40) + ')')
            .attr('class', 'title');

        var yAxisText = svg.append('text')
            .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height / 2) + ') rotate(-90)')
            .attr('class', 'title'); 
        
         /* ****** Filter Data based on Input ****** */ 
        var filterData = function () {
            currentData = data.filter(function (d) {
                    return d.region == region & d.year == year 
                })
            // console.log(currentData)
        }

        // var color = function(rank) {
        //     rank = parseInt(rank)
        //     var color
        //     rank <= 100 ? color = 'red' : color = 'blue'
        //     return color
        // }

        /* ****** Create custom Scales ****** */
        var setScales = function(data) {
            var xMax = d3.max(data, function(d) {
                return +d.total_score
            })

            var xMin = d3.min(data, function(d) {
                return +d.total_score
            }) / 1.08
        
            xScale = d3.scaleLinear()
                .range([0, width])
                .domain([xMin, xMax])
            
            var yMax = d3.max(data, function(d){
                return +d[measure]
            }) * 1.05

            yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, yMax])
        }

        /* ****** Set Axes ****** */
        var setAxes = function() {
            var xAxis = d3.axisBottom()
                .scale(xScale); 
            
            var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickFormat(d3.format('.2s'));
            
            xAxisLabel.transition().duration(1500).call(xAxis);
            yAxisLabel.transition().duration(1500).call(yAxis);

            xAxisText.text('Total Score of the University')
            yAxisText.transition().duration(1500).text('Percent Score of ' + measure)
        } 

        /* ****** Tooltip ****** */
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return d.university_name + "</br></br>" + 'World Rank: ' + d.world_rank;
            })
        svg.call(tip);

        /* ****** Create Graph from user selection ****** */
        var draw = function(data) {
            setScales(data)
            setAxes()


           var circles = g.selectAll('circle').data(data)

            circles.enter()
                .append('circle')
                .attr('r', 10)
                // .attr('fill', function(d) {return color(+d.world_rank)})
                .attr('fill', 'blue')
                .style('opacity', .3)
                .attr('cx', function(d) {return xScale(+d.total_score)})
                .attr('cy', function(d) {return yScale(d[measure])})
                .attr('class', 'circle')
                // .merge(circles)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .merge(circles)
                .transition()
                .duration(1500)
                .delay(function(d) {return d * 15})
            
            circles.exit().remove()
        }
        

        $("input").on('change', function() {
        // Get values based on user inputs    
            var val = $(this).val();            
            var isMeasure = $(this).hasClass('measure');
            var isRegion = $(this).hasClass('region')
            if (isMeasure) measure = val;
            else if (isRegion) region = val;
            else year = val;
            
            console.log('Year: ' +  year + '\tMeasure: ' + measure + "\tRegion: " + region)
            filterData()
            draw(currentData)
        });
        filterData();
        draw(currentData)

        
        $(".my_circle").tooltip({
            'container': 'body',
            'placement': 'top'
        });
    })
})

