/* eslint-disable react/prop-types */
import './Skill.less';

export default function Skill({ name, id, handleDeleteSkill }) {
  return (
    <div className='skill'>
      <span>{name}</span>
      <button type='button' onClick={(e) => handleDeleteSkill({ id, e })} className='delete'>
        x
      </button>
    </div>
  );
}
