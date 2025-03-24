import logo from './assets/img/LogoTorneoFC24.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupTable from './components/GroupTable';
import MatchForm from './components/MatchForm';
import GroupForm from './components/GroupForm';
import TeamForm from './components/TeamForm';
import ClassifiedTeams from './components/ClassifiedTeams';
import KnockoutStage from './components/KnockoutStage';
import Semifinal from './components/SemiFinal';
import Winner from './components/Winner';
import NavBar from './components/NavBar';

function App() {
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [match, setMatch] = useState([]);
  const [knockoutMatches, setKnockoutMatches] = useState([]);
  const [semifinalMatches, setSemifinalMatches] = useState([]);
  const [winner, setWinner] = useState(null);

  // Recuperar datos desde sessionStorage
  useEffect(() => {
    const savedGroups = sessionStorage.getItem('groups');
    const savedTeams = sessionStorage.getItem('teams');
    const savedMatch = sessionStorage.getItem('match');
    const savedKnockoutMatches = sessionStorage.getItem('knockoutMatches');
    const savedSemifinalMatches = sessionStorage.getItem('semifinalMatches');
    const savedWinner = sessionStorage.getItem('winner');
    
    if (savedGroups) setGroups(JSON.parse(savedGroups));
    if (savedTeams) setTeams(JSON.parse(savedTeams));
    if (savedMatch) setMatch(JSON.parse(savedMatch));
    if (savedKnockoutMatches) setKnockoutMatches(JSON.parse(savedKnockoutMatches));
    if (savedSemifinalMatches) setSemifinalMatches(JSON.parse(savedSemifinalMatches));
    if (savedWinner) setWinner(JSON.parse(savedWinner));
  }, []);

  // Guardar datos en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('groups', JSON.stringify(groups));
    sessionStorage.setItem('teams', JSON.stringify(teams));
    sessionStorage.setItem('match', JSON.stringify(match));
    sessionStorage.setItem('knockoutMatches', JSON.stringify(knockoutMatches));
    sessionStorage.setItem('semifinalMatches', JSON.stringify(semifinalMatches));
    sessionStorage.setItem('winner', JSON.stringify(winner));
  }, [groups, teams, match, knockoutMatches, semifinalMatches, winner]);

  const addGroup = (groupName) => {
    setGroups([...groups, { name: groupName, teams: [] }]);
  };

  const addTeam = (groupName, teamName) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === groupName
          ? {
              ...group,
              teams: [
                ...group.teams,
                {
                  id: group.teams.length + 1,
                  name: teamName,
                  played: 0,
                  won: 0,
                  drawn: 0,
                  lost: 0,
                  points: 0,
                  goalDifference: 0,
                },
              ],
            }
          : group
      )
    );
  };

  const updateTeams = (group, match) => {
    const updatedTeams = group.teams.map((team) => {
      if (team.name === match.team1) {
        team.played += 1;
        team.goalDifference += match.score1 - match.score2;
        if (match.score1 > match.score2) {
          team.won += 1;
          team.points += 3;
        } else if (match.score1 === match.score2) {
          team.drawn += 1;
          team.points += 1;
        } else {
          team.lost += 1;
        }
      } else if (team.name === match.team2) {
        team.played += 1;
        team.goalDifference += match.score2 - match.score1;
        if (match.score2 > match.score1) {
          team.won += 1;
          team.points += 3;
        } else if (match.score1 === match.score2) {
          team.drawn += 1;
          team.points += 1;
        } else {
          team.lost += 1;
        }
      }
      return team;
    });

    return updatedTeams;
  };

  const addMatch = (match) => {
    setGroups((prevGroups) => {
      return prevGroups.map((group) => {
        if (group.teams.some((team) => team.name === match.team1 || team.name === match.team2)) {
          const updatedTeams = updateTeams(group, match);
          return { ...group, teams: updatedTeams };
        }
        return group;
      });
    });
  };

  const groupNames = groups.map((group) => group.name);

  const classifiedTeams = groups.reduce((acc, group) => {
    const sortedTeams = group.teams.sort((a, b) => {
      if (b.points === a.points) {
        return b.goalDifference - a.goalDifference;
      }
      return b.points - a.points;
    });
    acc[group.name] = sortedTeams.slice(0, 2);
    return acc;
  }, {});

  const createKnockoutMatches = () => {
    const matches = [];
    const groupKeys = Object.keys(classifiedTeams);
    for (let i = 0; i < groupKeys.length; i += 2) {
      if (groupKeys[i + 1]) {
        matches.push({
          team1: classifiedTeams[groupKeys[i]][0] || {},
          team2: classifiedTeams[groupKeys[i + 1]][1] || {},
        });
        matches.push({
          team1: classifiedTeams[groupKeys[i + 1]][0] || {},
          team2: classifiedTeams[groupKeys[i]][1] || {},
        });
      }
    }
    setKnockoutMatches(matches);
  };

  const addKnockoutResult = (matchIndex, result) => {
    setKnockoutMatches((prevMatches) =>
      prevMatches.map((match, index) => {
        if (index === matchIndex) {
          if (match && match.team1 && match.team2) {
            return {
              ...match,
              result,
            };
          } else {
            console.error("Match or teams are undefined:", match);
            return match;
          }
        } else {
          return match;
        }
      })
    );
  
    // Determinar los ganadores y crear los partidos de semifinales
    const updatedMatches = [...knockoutMatches];
    updatedMatches[matchIndex].result = result;
  
    const winners = updatedMatches.map((match) => {
      if (match.result && match.team1 && match.team2) {
        if (match.result.team1 > match.result.team2) {
          return match.team1;
        } else {
          return match.team2;
        }
      } else {
        console.error("Result or teams are undefined:", match);
        return null;
      }
    }).filter(winner => winner !== null);

    const semifinals = [];
    for (let i = 0; i < winners.length; i += 2) {
      if (winners[i + 1]) {
        semifinals.push({
          team1: winners[i],
          team2: winners[i + 1],
        });
      }
    }
    setSemifinalMatches(semifinals);
  };

  const addSemifinalResult = (matchIndex, result) => {
    setSemifinalMatches((prevMatches) =>
      prevMatches.map((match, index) =>
        index === matchIndex
          ? {
              ...match,
              result,
            }
          : match
      )
    );

    const updatedMatches = [...semifinalMatches];
    updatedMatches[matchIndex].result = result;

    const winners = updatedMatches.map((match) => {
      if (match.result.team1 > match.result.team2) {
        return match.team1;
      } else {
        return match.team2;
      }
    });

    setWinner(winners[0]);
  };

  return (
    <Router>
      <NavBar />
      <div className="container">
        <h1>Torneo de Fútbol FC 25</h1>
        <Routes>
          <Route path="/" element={
            <>
              <GroupForm onAddGroup={addGroup} />
              {groupNames.length > 0 && <TeamForm groupNames={groupNames} onAddTeam={addTeam} />}
              <MatchForm onAddMatch={addMatch} />
              {groups.map((group) => (
                <GroupTable key={group.name} group={group} />
              ))}
              <ClassifiedTeams classifiedTeams={classifiedTeams} />
              <button onClick={createKnockoutMatches}>Generar Eliminatorias</button>
              <KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />
              <Semifinal semifinalMatches={semifinalMatches} onAddResult={addSemifinalResult} />
            </>
          } />
          <Route path="/KnockoutStage" element={<KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />} />
          <Route path="/semifinal" element={<Semifinal semifinalMatches={semifinalMatches} onAddResult={addSemifinalResult} />} />
          <Route path="/winner" element={winner && <Winner winner={winner} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;