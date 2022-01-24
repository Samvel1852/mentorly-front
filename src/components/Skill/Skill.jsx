import PropTypes from 'prop-types'

import styles from './Skill.module.less';

export default function Skill({ name, id, handleDeleteSkill, withDelete }) {
  return (
    <div className={styles.skill}>
      <span>{name}</span>
      {withDelete &&
      <button onClick={(e) => handleDeleteSkill({ id, e })} className={styles.delete}>
        x
      </button>
      }
    </div>
  );
}

Skill.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  handleDeleteSkill: PropTypes.func,
  withDelete: PropTypes.bool,
}