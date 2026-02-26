export const STORAGE_KEY = 'tournament-state';

export const createTeam = (name, index) => ({
  id: `${name}-${index + 1}-${Date.now()}`,
  name: name.trim(),
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  points: 0,
  goalDifference: 0,
});

export const sortTeams = (teams = []) =>
  [...teams].sort((left, right) => {
    if (right.points === left.points) {
      return right.goalDifference - left.goalDifference;
    }
    return right.points - left.points;
  });

export const updateTeamsFromMatch = (teams, match) =>
  teams.map((team) => {
    const nextTeam = { ...team };

    if (nextTeam.name === match.team1) {
      nextTeam.played += 1;
      nextTeam.goalDifference += match.score1 - match.score2;
      if (match.score1 > match.score2) {
        nextTeam.won += 1;
        nextTeam.points += 3;
      } else if (match.score1 === match.score2) {
        nextTeam.drawn += 1;
        nextTeam.points += 1;
      } else {
        nextTeam.lost += 1;
      }
    }

    if (nextTeam.name === match.team2) {
      nextTeam.played += 1;
      nextTeam.goalDifference += match.score2 - match.score1;
      if (match.score2 > match.score1) {
        nextTeam.won += 1;
        nextTeam.points += 3;
      } else if (match.score1 === match.score2) {
        nextTeam.drawn += 1;
        nextTeam.points += 1;
      } else {
        nextTeam.lost += 1;
      }
    }

    return nextTeam;
  });

export const getClassifiedTeams = (groups = []) =>
  groups.reduce((accumulator, group) => {
    accumulator[group.name] = sortTeams(group.teams).slice(0, 2);
    return accumulator;
  }, {});

export const buildKnockoutMatches = (classifiedTeams) => {
  const matches = [];
  const groupKeys = Object.keys(classifiedTeams);

  for (let index = 0; index < groupKeys.length; index += 2) {
    const currentGroup = groupKeys[index];
    const nextGroup = groupKeys[index + 1];

    if (!nextGroup) {
      continue;
    }

    matches.push({
      team1: classifiedTeams[currentGroup]?.[0] || null,
      team2: classifiedTeams[nextGroup]?.[1] || null,
      result: null,
    });

    matches.push({
      team1: classifiedTeams[nextGroup]?.[0] || null,
      team2: classifiedTeams[currentGroup]?.[1] || null,
      result: null,
    });
  }

  return matches;
};

export const getWinnersFromMatches = (matches = []) =>
  matches
    .map((match) => {
      if (!match?.result || !match.team1 || !match.team2) {
        return null;
      }

      if (match.result.team1 > match.result.team2) {
        return match.team1;
      }

      if (match.result.team2 > match.result.team1) {
        return match.team2;
      }

      return null;
    })
    .filter(Boolean);

export const buildSemifinalMatches = (knockoutMatches = []) => {
  const winners = getWinnersFromMatches(knockoutMatches);
  const semifinals = [];

  for (let index = 0; index < winners.length; index += 2) {
    if (winners[index + 1]) {
      semifinals.push({
        team1: winners[index],
        team2: winners[index + 1],
        result: null,
      });
    }
  }

  return semifinals;
};

export const getWinnerFromSemifinals = (semifinalMatches = []) => {
  const winners = getWinnersFromMatches(semifinalMatches);
  return winners[0] || null;
};

export const parseScore = (value) => {
  const score = Number.parseInt(value, 10);
  return Number.isNaN(score) ? null : score;
};
