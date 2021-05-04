export function sortAttacks(clan, opponent) {
  const allData = [...clan.members, ...opponent.members];
  const clanHasAttacked = clan.members.filter((item) => {
    if (item.hasOwnProperty("attacks")) {
      return item;
    }
    return null;
  });
  const opponentHasAttacked = opponent.members.filter((item) => {
    if (item.hasOwnProperty("attacks")) {
      return item;
    }
    return null;
  });
  const clanAttacks = attacksObj(clanHasAttacked, allData, "blue");
  const opponentAttacks = attacksObj(opponentHasAttacked, allData, "red");
  const allOpponentAttacks = baseLevelArray(opponentAttacks);
  const allClanAttacks = baseLevelArray(clanAttacks);

  return { clan: allClanAttacks, opponent: allOpponentAttacks };
}
function attacksObj(attacked, combinedData, color) {
  const attacks = attacked.map((item) => {
    if (item.attacks.length === 1) {
      const opponent = findOpponent(item.attacks[0].defenderTag, combinedData);
      return [
        {
          name: item.name,
          tag: item.tag,
          mapPosition: item.mapPosition,
          townhallLevel: item.townhallLevel,
          attack: item.attacks[0],
          defender: opponent,
          team: color,
        },
      ];
    } else {
      const opponentOne = findOpponent(
        item.attacks[0].defenderTag,
        combinedData
      );
      const opponentTwo = findOpponent(
        item.attacks[1].defenderTag,
        combinedData
      );
      return [
        {
          name: item.name,
          tag: item.tag,
          mapPosition: item.mapPosition,
          townhallLevel: item.townhallLevel,
          attack: item.attacks[0],
          defender: opponentOne,
          team: color,
        },
        {
          name: item.name,
          tag: item.tag,
          mapPosition: item.mapPosition,
          townhallLevel: item.townhallLevel,
          attack: item.attacks[1],
          defender: opponentTwo,
          team: color,
        },
      ];
    }
  });
  return attacks;
}

function findOpponent(tag, clan) {
  const details = clan.find((detail) => detail.tag === tag);
  return details;
}
function baseLevelArray(arr) {
  let returnArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > 1) {
      returnArray.push(arr[i][0], arr[i][1]);
    } else {
      returnArray.push(arr[i][0]);
    }
  }
  return returnArray;
}
