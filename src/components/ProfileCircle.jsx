// src/components/ProfileCircle.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '../utils/utils';

const ProfileCircle = ({ name, size }) => {
  const initials = getInitials(name);

  return (
    <div
      className={`flex justify-center items-center rounded-full bg-[#493DF5] text-white`}
      style={{
        width: size,
        height: size,
        fontSize: `${parseInt(size) / 2}px`,
        lineHeight: `24px`,
      }}
    >
      {initials}
    </div>
  );
};

ProfileCircle.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

ProfileCircle.defaultProps = {
  size: '40px',
};

export default ProfileCircle;