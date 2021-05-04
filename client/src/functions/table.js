// take an array of items and sort in to sub array of four items into an array
// for four td elements per tr in table element
export function rowArray(array) {
  let resultArray = [];
  let tempArray = [];
  for (let i = 1; i <= array.length; i++) {
    if (i === array.length) {
      tempArray.push(array[i - 1]);
      resultArray.push(tempArray);
      tempArray = [];
    } else if (i % 4 === 0) {
      tempArray.push(array[i - 1]);
      resultArray.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(array[i - 1]);
    }
  }
  return resultArray;
}
// map array of pre-sorted array into table rows
export function mapRow(array, folder, theme) {
  const troopTable = array.map((troop) => {
    if (troop.length === 4) {
      return (
        <tr key={troop[0].name}>
          {/* troop 1 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[0].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[0].name}
                <div className="sub header">{troop[0].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 2 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[1].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[1].name}
                <div className="sub header">{troop[1].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 3 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[2].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[2].name}
                <div className="sub header">{troop[2].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 4 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[3].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[3].name}
                <div className="sub header">{troop[3].level}</div>
              </div>
            </h4>
          </td>
        </tr>
      );
    } else if (troop.length === 3) {
      return (
        <tr key={troop[0].name}>
          {/* troop 1 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[0].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[0].name}
                <div className="sub header">{troop[0].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 2 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[1].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[1].name}
                <div className="sub header">{troop[1].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 3 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[2].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[2].name}
                <div className="sub header">{troop[2].level}</div>
              </div>
            </h4>
          </td>
        </tr>
      );
    } else if (troop.length === 2) {
      return (
        <tr key={troop[0].name}>
          {/* troop 1 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[0].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[0].name}
                <div className="sub header">{troop[0].level}</div>
              </div>
            </h4>
          </td>
          {/* troop 2 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[1].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[1].name}
                <div className="sub header">{troop[1].level}</div>
              </div>
            </h4>
          </td>
        </tr>
      );
    } else if (troop.length === 1) {
      return (
        <tr key={troop[0].name}>
          {/* troop 1 */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="troop"
                src={`/static/images/coc/${folder}/${troop[0].name.replace(
                  " ",
                  ""
                )}.png`}
                className="ui avatar image"
              />
              <div className="content">
                {troop[0].name}
                <div className="sub header">{troop[0].level}</div>
              </div>
            </h4>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  });
  return troopTable;
}
