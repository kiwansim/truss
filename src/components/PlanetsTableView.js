import React, { Fragment } from "react";
import { cloneDeep } from 'lodash';
import Table from 'react-bootstrap/Table'
import "../styles/PlanetsTableView.css";

const PlanetsTableView = ({ planets }) => {
  const tableHeaderTitles = [ 'Name', 'Climate', '# Residents', 'Terrains', 'Surface area covered by water', 'Population'];

  const cleanPlanetsData = cloneDeep(planets).map(planet => ({
    name: planet.name === 'unknown' ? '?' : planet.name,
    climate: planet.climate === 'unknown' ? '?' : planet.climate,
    residents: planet.residents,
    terrain: planet.terrain === 'unknown' ? '?' : planet.terrain,
    surface_water: planet.surface_water === 'unknown' 
                      ? '?' 
                      : Number.isInteger(parseFloat(planet.surface_water))
                        ? parseFloat(planet.surface_water)
                        : Math.round(parseFloat(planet.surface_water)),
    population: planet.population === 'unknown' 
                  ? '?'
                  : planet.population.replace(/(?!^)(?=(\d{3})+(?=$))/gm, ' '), 
  }));

  // Underlying logic is string.localecompare
  const sortedPlanets = cloneDeep(cleanPlanetsData).sort(function (a, b) {
    return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
  });

  return (
    <div className='tableWrapper'>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {tableHeaderTitles.map(title => {
              return (
                <th key={title}>{title}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedPlanets.map((entry) => {
            return (
              <Fragment key={entry.name}>
                <tr>
                  <td className='planetName' onClick={() => window.open(entry.url)}>{entry.name}</td>
                  <td>{entry.climate}</td>
                  <td>{entry.residents.length}</td>
                  <td>{entry.terrain}</td>
                  <td>{entry.surface_water}</td>
                  <td>{entry.population.replace(/(?!^)(?=(\d{3})+(?=$))/gm, ' ')}</td>
                </tr> 
              </Fragment>
            )
          })}
        </tbody>
      </Table>
    </div>
  );  
};

export default PlanetsTableView;