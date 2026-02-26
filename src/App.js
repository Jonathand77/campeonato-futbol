import logo from './assets/img/LogoTorneoFC.png';
import './App.css';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaTrophy, FaLayerGroup, FaProjectDiagram, FaExclamationTriangle } from 'react-icons/fa';
import {
  GroupTable,
  MatchForm,
  GroupForm,
  TeamForm,
  ClassifiedTeams,
  KnockoutStage,
  Semifinal,
  Winner,
  NavBar,
  SectionCard,
} from './components';
import {
  STORAGE_KEY,
  createTeam,
  updateTeamsFromMatch,
  getClassifiedTeams,
  buildKnockoutMatches,
  buildSemifinalMatches,
  getWinnerFromSemifinals,
} from './utils/tournament';

const getInitialTournamentState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return {
        groups: [],
        matches: [],
        knockoutMatches: [],
        semifinalMatches: [],
        winner: null,
      };
    }

    const parsedState = JSON.parse(savedState);
    return {
      groups: parsedState?.groups || [],
      matches: parsedState?.matches || [],
      knockoutMatches: parsedState?.knockoutMatches || [],
      semifinalMatches: parsedState?.semifinalMatches || [],
      winner: parsedState?.winner || null,
    };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return {
      groups: [],
      matches: [],
      knockoutMatches: [],
      semifinalMatches: [],
      winner: null,
    };
  }
};

function App() {
  const initialTournamentState = useMemo(() => getInitialTournamentState(), []);
  const [groups, setGroups] = useState(initialTournamentState.groups);
  const [matches, setMatches] = useState(initialTournamentState.matches);
  const [knockoutMatches, setKnockoutMatches] = useState(initialTournamentState.knockoutMatches);
  const [semifinalMatches, setSemifinalMatches] = useState(initialTournamentState.semifinalMatches);
  const [winner, setWinner] = useState(initialTournamentState.winner);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ groups, matches, knockoutMatches, semifinalMatches, winner })
    );
  }, [groups, matches, knockoutMatches, semifinalMatches, winner]);

  const resetTournament = useCallback(() => {
    setGroups([]);
    setMatches([]);
    setKnockoutMatches([]);
    setSemifinalMatches([]);
    setWinner(null);
    setIsResetModalOpen(false);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const addGroup = useCallback((groupName) => {
    const normalizedName = groupName.trim().toUpperCase();
    if (!normalizedName) {
      return;
    }

    setGroups((previousGroups) => {
      const alreadyExists = previousGroups.some((group) => group.name === normalizedName);
      if (alreadyExists) {
        return previousGroups;
      }
      return [...previousGroups, { name: normalizedName, teams: [] }];
    });
  }, []);

  const addTeam = useCallback((groupName, teamName) => {
    const normalizedTeamName = teamName.trim();
    if (!groupName || !normalizedTeamName) {
      return;
    }

    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === groupName
          ? {
              ...group,
              teams: group.teams.some((team) => team.name.toLowerCase() === normalizedTeamName.toLowerCase())
                ? group.teams
                : [...group.teams, createTeam(normalizedTeamName, group.teams.length)],
            }
          : group
      )
    );
  }, []);

  const addMatch = useCallback((match) => {
    setMatches((previousMatches) => [...previousMatches, match]);

    setGroups((previousGroups) =>
      previousGroups.map((group) => {
        const hasBothTeams = group.teams.some((team) => team.name === match.team1)
          && group.teams.some((team) => team.name === match.team2);

        if (!hasBothTeams) {
          return group;
        }

        return {
          ...group,
          teams: updateTeamsFromMatch(group.teams, match),
        };
      })
    );
  }, []);

  const groupNames = useMemo(() => groups.map((group) => group.name), [groups]);

  const classifiedTeams = useMemo(() => getClassifiedTeams(groups), [groups]);

  const createKnockoutPhase = useCallback(() => {
    setKnockoutMatches(buildKnockoutMatches(classifiedTeams));
    setSemifinalMatches([]);
    setWinner(null);
  }, [classifiedTeams]);

  const addKnockoutResult = useCallback((matchIndex, result) => {
    setKnockoutMatches((previousMatches) => {
      const updatedMatches = previousMatches.map((match, index) =>
        index === matchIndex ? { ...match, result } : match
      );

      setSemifinalMatches(buildSemifinalMatches(updatedMatches));
      return updatedMatches;
    });
  }, []);

  const addSemifinalResult = useCallback((matchIndex, result) => {
    setSemifinalMatches((previousMatches) => {
      const updatedMatches = previousMatches.map((match, index) =>
        index === matchIndex ? { ...match, result } : match
      );

      setWinner(getWinnerFromSemifinals(updatedMatches));
      return updatedMatches;
    });
  }, []);

  const canGenerateKnockout = useMemo(
    () => Object.values(classifiedTeams).some((teamsByGroup) => teamsByGroup.length === 2),
    [classifiedTeams]
  );

  return (
    <Router>
      <NavBar />
      <main className="container">
        <section className="hero-banner">
          <img src={logo} alt="Logo del torneo" className="hero-banner__logo" />
          <div className="hero-banner__content">
            <h1>Torneo de Fútbol FC 26</h1>
            <p>Gestiona grupos, cruces y campeón con una experiencia profesional.</p>
            <div className="hero-banner__actions">
              <button type="button" className="btn btn--danger" onClick={() => setIsResetModalOpen(true)}>
                Reiniciar torneo
              </button>
            </div>
            <div className="hero-banner__stats">
              <span><FaLayerGroup /> {groups.length} grupos</span>
              <span><FaProjectDiagram /> {knockoutMatches.length} cruces</span>
              <span><FaTrophy /> {winner ? winner.name : 'Sin campeón'}</span>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={
            <>
              <SectionCard title="Configuración" icon={<FaLayerGroup />} description="Crea grupos y registra equipos de forma ordenada.">
                <GroupForm onAddGroup={addGroup} />
                {groupNames.length > 0 && <TeamForm groupNames={groupNames} onAddTeam={addTeam} />}
              </SectionCard>

              <SectionCard title="Partidos de grupos" icon={<FaProjectDiagram />} description="Carga resultados para actualizar automáticamente la tabla.">
                <MatchForm onAddMatch={addMatch} groups={groups} />
                {groups.map((group) => (
                  <GroupTable key={group.name} group={group} />
                ))}
              </SectionCard>

              <SectionCard
                title="Clasificados"
                icon={<FaTrophy />}
                description="Se calculan por puntos y diferencia de gol."
                actions={(
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={createKnockoutPhase}
                    disabled={!canGenerateKnockout}
                  >
                    Generar eliminatorias
                  </button>
                )}
              >
                <ClassifiedTeams classifiedTeams={classifiedTeams} />
              </SectionCard>

              <KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />
              <Semifinal semifinalMatches={semifinalMatches} onAddResult={addSemifinalResult} />
            </>
          } />
          <Route path="/knockout" element={<KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />} />
          <Route path="/semifinal" element={<Semifinal semifinalMatches={semifinalMatches} onAddResult={addSemifinalResult} />} />
          <Route path="/winner" element={winner && <Winner winner={winner} />} />
        </Routes>

        {isResetModalOpen && (
          <div className="modal-overlay" role="presentation" onClick={() => setIsResetModalOpen(false)}>
            <div
              className="modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="reset-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="reset-modal-title"><FaExclamationTriangle /> Reiniciar torneo</h2>
              <p>Esta acción eliminará todos los datos guardados del torneo. ¿Deseas continuar?</p>
              <div className="modal-actions">
                <button type="button" className="btn btn--ghost" onClick={() => setIsResetModalOpen(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn--danger" onClick={resetTournament}>
                  Sí, reiniciar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Router>
  );
}

export default App;