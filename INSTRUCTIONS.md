# Technical challenge

## How to take this test

There is no right or wrong way to do this, we are more interested in the code you write, the development process you use rather than marking your work! Set yourself a time limit and see how get on.

## Data

The project contains a data set describing the location and metadata of boat ramps in Australia's Gold Coast. The data set can be found under `./data/boat_ramps.geojson`.

It is a standard [GeoJSON](http://geojson.org/) file, with each feature consisting of a `geometry` and `properties`, such as owner, material that the ramp is made of, etc.

## The challenge

Your goal is to build a React and Redux-based UI to explore this data. The interface should have the following features:

1. A map to be able to visualise all the boat ramps.
2. A data visualisation of your choice that displays the number or ramps per construction material.
3. A data visualisation of your choice that displays the number of ramps per size category (values of `area` in 3 different ranges: `[0, 50)`, `[50, 200)`, and `[200, 526)`).
4. Zooming in the map should filter the visualised data to include only those ramps which are currently visible in the viewport.
5. Clicking on a data point on a visualisation, should filter the ramps on the map to reflect the selected data.

## Technology choices

The use of React and Redux is required. You can choose to use [create-react-app](https://github.com/facebook/create-react-app) with or without TypeScript. If you prefer you can even bootstrap something on your own with webpack, or any other bundler for that matter.

Apart from that, you are completely free to choose libraries, frameworks and tools to best assist you in this challenge. The choice of the method of serving the data to the UI is up to you, but it should use a RESTful API approach.

## Once complete

When you've finished writing your code, please put it somewhere we can clone it, for example, as a public repo in GitHub (or a private one and add us as a collabrator) and any instructions needed to run it.

### Good luck!
