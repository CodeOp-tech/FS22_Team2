import React from "react";
//import dummylocations from "./dummylocations";

function MarkerTable(props) {
  // const [state, setState] = [];
  // const url = "FS22_Team2/client/src/components/dummylocations.js";
  // fetch(url)
  //   .then((response = response.json()))
  //   .then((dummylocations) => {
  //     this.setState({
  //       stadiums: dummylocations,
  //       allStadiums: dummylocations,
  //     });
  //   });
  return (
    <table className="MarkerTable table">
      <thead>
        <tr>
          <th>Input Address</th>
          <th>Formatted Address (from OpenCage)</th>
          <th>Latitude/Longitude</th>
          {/* <h1>{this.props.stadium.name}</h1> */}
        </tr>
      </thead>
      <tbody>
        {props.places.map((p) => (
          <tr key={p.input_address}>
            <td>{p.input_address}</td>
            <td>{p.formatted_address}</td>
            <td>{p.latLng.join("/")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarkerTable;
