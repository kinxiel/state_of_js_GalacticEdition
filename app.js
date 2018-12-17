const x = d3.scale.linear().range([0, 400]),
  r = d3.scale
    .linear()
    .domain([4, 40])
    .range([4 * 0.5, 50 * 0.5])
    .clamp(true),
  t = d3.scale.linear().range([0, 1]);

const padding = 65;

// Define the div for the tooltip
var div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

// Detect the appropriate vendor prefix.
const prefix =
  '-webkit-transform' in document.body.style
    ? '-webkit-'
    : '-moz-transform' in document.body.style
    ? '-moz-'
    : '';

d3.csv('data/data.csv', type, function(error, planets) {
  let systems = d3
    .nest()
    .key(d => d.id)
    .entries(planets);

  systems.forEach(s => {
    s.values.forEach(p => {
      p.system = s;
    });
    s.radius =
      d3.max(s.values, p => x(p.semimajor_axis) + r(p.planet_radius)) + padding;
  });

  let system = d3
    .select('body')
    .selectAll('system')
    .data(systems)
    .enter()
    .append('a')
    .attr('class', 'system')
    .style('width', d => d.radius * 2 + 'px')
    .style('height', d => d.radius * 2 + 'px');

  system
    .append('svg')
    .attr('class', 'orbit')
    .attr('width', d => d.radius * 2)
    .attr('height', d => d.radius * 2)
    .append('g')
    .attr('transform', d => 'translate(' + d.radius + ',' + d.radius + ')')
    .selectAll('circle')
    .data(d => d.values)
    .enter()
    .append('circle')
    .attr('r', d => x(d.semimajor_axis));

  // system
  //   .selectAll('labels')
  //   .data(d => d.values)
  //   .enter()
  //   .append('svg')
  //   .attr('class', 'planet-text')
  //   .append('text')

  //   .style(prefix + 'animation-duration', d => t(d.period) + 's')
  //   .style(
  //     prefix + 'transform-origin',
  //     d => d.system.radius + 'px ' + d.system.radius + 'px'
  //   )
  //   .attr('x', 1)
  //   .attr('y', 50)
  //   .text(d => d.year);

  system
    .selectAll('planet')
    .data(function(d) {
      return d.values;
    })
    .enter()
    .append('svg')
    .attr('class', 'planet-year')
    .attr('width', function(d) {
      return d.system.radius * 2;
    })
    .attr('height', function(d) {
      return d.system.radius * 2;
    })
    .style(prefix + 'animation-duration', function(d) {
      return t(d.period) + 's';
    })
    .style(prefix + 'transform-origin', function(d) {
      return d.system.radius + 'px ' + d.system.radius + 'px';
    })
    .append('text')
    .attr('transform', function(d) {
      return 'translate(' + d.system.radius + ',' + d.system.radius + ')';
    })
    .attr('x', -16)
    .attr('y', function(d) {
      return x(d.yearY);
    })
    .text(d => d.year);

  system
    .selectAll('planet')
    .data(d => d.values)
    .enter()
    .append('svg')
    .attr('class', 'planet')
    .attr('width', d => d.system.radius * 2)
    .attr('height', d => d.system.radius * 2)
    .style(prefix + 'animation-duration', d => t(d.period) + 's')
    .style(
      prefix + 'transform-origin',
      d => d.system.radius + 'px ' + d.system.radius + 'px'
    )
    .append('circle')
    .attr('transform', function(d) {
      return 'translate(' + d.system.radius + ',' + d.system.radius + ')';
    })
    .attr('cx', function(d) {
      return x(d.semimajor_axis);
    })
    .attr('r', function(d) {
      return r(d.planet_radius);
    })
    .attr('fill', d => d.color);

  system
    .selectAll('planet')
    .data(function(d) {
      return d.values;
    })
    .enter()
    .append('svg')
    .attr('class', 'planet')
    .attr('width', function(d) {
      return d.system.radius * 2;
    })
    .attr('height', function(d) {
      return d.system.radius * 2;
    })
    .style(prefix + 'animation-duration', function(d) {
      return t(d.period) + 's';
    })
    .style(prefix + 'transform-origin', function(d) {
      return d.system.radius + 'px ' + d.system.radius + 'px';
    })
    .append('text')
    .attr('transform', function(d) {
      return 'translate(' + d.system.radius + ',' + d.system.radius + ')';
    })
    .attr('class', 'planet-text')
    .attr('x', function(d) {
      return x(d.label);
    })
    .attr('y', 5)
    .text(d => d.tech);
});

function type(d) {
  d.period = +d.period;
  d.planet_radius = +d.planet_radius;
  d.semimajor_axis = +d.semimajor_axis;
  d.stellar_radius = +d.stellar_radius;
  return d;
}

// Inspired by Mike Bostock's and Jonathan Corum's Kepler's Tally.
