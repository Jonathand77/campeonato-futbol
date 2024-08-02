import React from 'react';
import GroupForm from './GroupForm';
import TeamForm from './TeamForm';
import MatchForm from './MatchForm';
import GroupTable from './GroupTable';
import ClassifiedTeams from './ClassifiedTeams';

const GroupSection = ({ groups, groupNames, addGroup, addTeam, addMatch, classifiedTeams }) => {
  return (
    <div className="section group-section">
      <GroupForm onAddGroup={addGroup} />
      {groupNames.length > 0 && <TeamForm groupNames={groupNames} onAddTeam={addTeam} />}
      <MatchForm onAddMatch={addMatch} />
      {groups.map((group) => (
        <GroupTable key={group.name} group={group} />
      ))}
      <ClassifiedTeams classifiedTeams={classifiedTeams} />
    </div>
  );
};

export default GroupSection;
